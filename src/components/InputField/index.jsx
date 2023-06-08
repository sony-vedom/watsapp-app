import { useCallback, useEffect } from "react"

import clsx from "clsx"
import { ErrorMessage, useField } from "formik"

import { useAddNumberFormSettings } from "@components/InputField/hooks/useAddNumberFormSettings"

import styles from "./style.module.scss"

const InputField = ({ label, isShowModal, setDisabled, ...props }) => {
  const [field, { error, touched }, { setValue }] = useField(props.name)
  const formSettings = useAddNumberFormSettings(
    touched,
    field.value,
    error,
    setDisabled,
    useCallback(() => {
      setValue("+")
    }, []),
  )
  useEffect(() => {
    formSettings.run(isShowModal)
  }, [isShowModal])
  return (
    <div className={styles.Field}>
      {label && <label htmlFor={props.name}>{label}</label>}
      <input
        className={clsx(styles["Field-Input"], {
          [styles["Field-Input_error"]]: error && touched,
        })}
        {...field}
        name={props.name}
        type={props.type}
      />
      <ErrorMessage className={styles["Field-Error"]} component='span' name={props.name} />
    </div>
  )
}

export default InputField
