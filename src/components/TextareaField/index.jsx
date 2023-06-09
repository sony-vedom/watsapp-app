import { useEffect } from "react"
import { useState } from "react"

import { useField } from "formik"

import styles from "./style.module.scss"

const TextareaField = ({ name }) => {
  const [height, setHeight] = useState("" | 0)

  const [field] = useField(name)

  useEffect(() => {
    if (field.value === "") setHeight(0)
  }, [field.value])

  return (
    <textarea
      {...field}
      name={name}
      onInput={async (e) => {
        await setHeight(0)
        const scrollHeight = e.nativeEvent.target.scrollHeight
        if (scrollHeight > 90) {
          await setHeight(90)
        } else if (scrollHeight < 90 && scrollHeight < 60) {
          await setHeight(60)
        } else {
          await setHeight(scrollHeight)
        }
      }}
      style={{ height: `${height}px` }}
      placeholder={"Введите сообщение"}
      className={styles.Textarea}
    />
  )
}

export default TextareaField
