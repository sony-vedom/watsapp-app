import * as Yup from "yup"

export default Yup.object({
  idInstance: Yup.string()
    .matches(/^\S*$/, "Не используйте пробелы")
    .matches(/^\d*$/, "Некорректная форма")
    .required("Поле обязательно для заполнения"),
  apiTokenInstance: Yup.string()
    .matches(/^\S*$/, "Не используйте пробелы")
    .matches(/^[\dA-Za-z]*$/, "Некорректная форма")
    .required("Поле обязательно для заполнения"),
})
