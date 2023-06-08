import { createSlice } from "@reduxjs/toolkit"

export const active = createSlice({
  name: "active",
  initialState: {
    number: null,
    message: {
      outgoing: "",
    },
  },
  reducers: {
    setActiveNumber: (state, action) => {
      state.number = `${action.payload}`
    },
    setOutgoingMessage: (state, action) => {
      state.message.outgoing = action.payload
    },
  },
})

export const { setActiveNumber, setOutgoingMessage } = active.actions

export default active.reducer
