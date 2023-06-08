import { useEffect, useState } from "react"

export const useAddNumberFormSettings = (touched, value, error, setDisabled, setValue) => {
  const [isRunEffect, setRunEffect] = useState(false)
  useEffect(() => {
    if (isRunEffect) {
      if (value === "") {
        setValue("+")
      }

      if (touched && error) setDisabled(!(error && touched))

      value === "+" ? setDisabled(true) : setDisabled(false)
    }
  }, [isRunEffect, touched, error, value, setDisabled])

  return {
    run: (isRunEffect) => setRunEffect(isRunEffect),
  }
}
