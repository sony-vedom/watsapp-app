import { useContext } from "react"
import { useDispatch } from "react-redux"

import { Form, Formik } from "formik"

import { context } from "@/context"

import { setNumber } from "@redux/reducers/chat"

import InputField from "@components/InputField"

import validationSchema from "./services/validationShema"

const AddNumberForm = ({ setShowModal, isShowModal, setDisabled }) => {
  const { phoneUtil } = useContext(context)
  const dispatch = useDispatch()
  const handlerError = (setSubmitting, setFieldError) => {
    setSubmitting(false)
    setFieldError("number", "Такого номера не может существовать")
    setDisabled(true)
  }
  return (
    <Formik
      initialValues={{ number: "+" }}
      validateOnBlur={false}
      onSubmit={({ number }, { setSubmitting, setFieldError }) => {
        try {
          if (phoneUtil.isPossibleNumber(phoneUtil.parse(number, "ru"))) {
            setSubmitting(true)
            dispatch(setNumber(number))
            setShowModal(false)
          } else {
            handlerError(setSubmitting, setFieldError)
          }
        } catch (e) {
          handlerError(setSubmitting, setFieldError)
        }
      }}
      validationSchema={validationSchema}
    >
      <Form id='add-number'>
        <InputField isShowModal={isShowModal} setDisabled={setDisabled} name='number' type='text' />
      </Form>
    </Formik>
  )
}

export default AddNumberForm
