import { createSlice } from "@reduxjs/toolkit"

export const instance = createSlice({
  name: "instance",
  initialState: {
    statusInstance: null,
    formDisabled: false,
  },
  reducers: {
    setStatusInstance: (state, action) => {
      state.statusInstance = action.payload
    },
    setFormDisabled: (state, action) => {
      state.formDisabled = action.payload
    },
  },
})

export const { setStatusInstance, setFormDisabled } = instance.actions

export default instance.reducer
