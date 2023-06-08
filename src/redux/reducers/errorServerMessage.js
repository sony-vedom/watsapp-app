import { createSlice } from "@reduxjs/toolkit"

export const errorServerMessage = createSlice({
  name: "errorServerMessage",
  initialState: {
    stateInstanceError: {
      notAuthorized: "Ваш аккаунт не авторизован. Пройдите авторизацию в личном кабинете",
      blocked: "Ваш аккаунт забанен",
      sleepMode: "Ваш аккаунт в спящем режиме. Включите телефон",
      starting: "Ваш аккаунт в процессе запуска. Подождите",
      error: "Неправильный idInstance или apiTokenInstance. Попробуйте ещё раз",
    },
  },
  reducers: {},
})

export default errorServerMessage.reducer
