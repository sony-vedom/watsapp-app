import { createSlice } from "@reduxjs/toolkit"

export const auth = createSlice({
  name: "auth",
  initialState: {
    idInstance: "",
    apiTokenInstance: "",
  },
  reducers: {
    setAuthData: (state, action) => {
      const { idInstance, apiTokenInstance } = action.payload
      state.idInstance = idInstance
      state.apiTokenInstance = apiTokenInstance
    },
  },
})

export const { setAuthData } = auth.actions

export default auth.reducer
