import * as Yup from "yup"

export default Yup.object({
  number: Yup.string().matches(/^(^\+)$|^(^\+)(\d{7,15})$/, "Введите корректный международный номер (Только цифры)"),
})
