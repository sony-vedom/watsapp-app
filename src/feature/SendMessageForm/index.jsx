import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

import clsx from "clsx"
import { Form, Formik } from "formik"

import { setOutgoingMessage } from "@redux/reducers/active"

import { ReactComponent as SendIcon } from "@assets/icon/sendButton.svg"
import TextareaField from "@components/TextareaField"

import styles from "./style.module.scss"

const SendMessageForm = ({ setHeightForm }) => {
  const dispatch = useDispatch()
  const onKeyUp = (formik) => (e) => {
    if (e.shiftKey && (e.code === "Enter" || e.code === "Shift")) {
      formik.setFieldValue("message", `${formik.getFieldProps("message").value}`)
    } else if (e.key === "Enter") {
      e.preventDefault()
      formik.submitForm()
    }
  }
  const ref = useRef()
  // useEffect(() => {
  //   console.log(ref.current.offsetHeight)
  //   setHeightForm(ref.current.clientHeight)
  // }, [ref.current?.offsetHeight])

  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={(value, { resetForm }) => {
        dispatch(setOutgoingMessage(value.message.trim()))
        resetForm()
      }}
    >
      {(formik) => (
        <Form
          onChange={(e) => {
            e.target.value === "" ? setHeightForm(100) : setHeightForm(e.target.offsetHeight)
          }}
          ref={ref}
          className={styles.SendMessageForm}
          onKeyUp={onKeyUp(formik)}
          onKeyDown={(e) => {
            if (e.shiftKey && (e.code === "Enter" || e.code === "Shift")) {
              formik.setFieldValue("message", `${formik.getFieldProps("message").value}`)
            } else if (e.key === "Enter") e.preventDefault()
          }}
        >
          <TextareaField name='message' formik={formik} dispatch={dispatch} />
          <button
            className={clsx(styles.Btn, {
              [styles["Btn_none"]]: !(formik.isValid && formik.dirty),
            })}
            type='submit'
            disabled={!(formik.isValid && formik.dirty)}
          >
            <SendIcon />
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default SendMessageForm
