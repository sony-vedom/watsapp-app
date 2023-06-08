import { useEffect, useState } from "react"

import { Form, Formik, useFormikContext } from "formik"

import { setAuthData } from "@redux/reducers/auth"
import { setStatusInstance } from "@redux/reducers/instance"

import Btn from "@components/Btn"
import FormError from "@components/FormError"
import InputField from "@components/InputField"

import validationSchema from "./services/validationSchema"
import styles from "./style.module.scss"

const LoginForm = ({ dispatch, stateInstance, formDisabled, errorMessage }) => {
  const [wasSubmit, setWasSubmit] = useState(false)
  const onSubmit = (values) => {
    dispatch(setAuthData({ idInstance: values.idInstance, apiTokenInstance: values.apiTokenInstance }))
    setWasSubmit(true)
  }
  return (
    <Formik
      initialValues={{ idInstance: "", apiTokenInstance: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form className={styles.AuthForm}>
          <FormReset stateInstance={stateInstance} wasSubmit={wasSubmit} setWasSubmit={setWasSubmit} />
          <FormObserver dispatch={dispatch} />
          <InputField name='idInstance' type='text' label='IdInstance'></InputField>
          <InputField name='apiTokenInstance' type='text' label='ApiTokenInstance'></InputField>
          {stateInstance !== "authorized" && <FormError message={errorMessage[stateInstance]} />}
          <Btn
            variant={"primary"}
            className={"AuthForm"}
            disabled={!(formik.isValid && formik.dirty) || stateInstance || formDisabled}
          >
            Войти
          </Btn>
        </Form>
      )}
    </Formik>
  )
}

const FormObserver = ({ dispatch }) => {
  const { values } = useFormikContext()
  useEffect(() => {
    dispatch(setStatusInstance(null))
  }, [values, dispatch])

  return null
}

const FormReset = ({ stateInstance, wasSubmit, setWasSubmit }) => {
  const { resetForm } = useFormikContext()
  useEffect(() => {
    setTimeout(() => {
      if (stateInstance && wasSubmit !== "authorized") resetForm()
      setWasSubmit(false)
    }, 1000)
  }, [resetForm, stateInstance])
  return null
}

export default LoginForm
