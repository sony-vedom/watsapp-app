import * as Yup from "yup"

export default Yup.object({
  message: Yup.string().matches(/\S/gim, "Только пробелы").required("Поле обязательно для заполнения"),
})
