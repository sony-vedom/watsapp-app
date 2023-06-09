import * as Yup from "yup"

export default Yup.object({
  number: Yup.string().matches(/^(^\+)$|^(^\+)(\d{1,15})$/, "Введите корректный международный номер (Только цифры)"),
})
