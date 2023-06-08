import { createSlice } from "@reduxjs/toolkit"

export const chat = createSlice({
  name: "chat",
  initialState: {
    chatData: {},
    noAccountError: {
      isNoAccountError: false,
      chatIdAccountError: "",
    },
  },
  reducers: {
    setNumber: (state, action) => {
      state.chatData[`${parseInt(action.payload)}@c.us`] = { outgoing: [], incoming: [] }
    },
    addOutgoingMessage: (state, action) => {
      const { number, timestamp, text, id } = action.payload
      state.chatData[number].outgoing.push({ type: "outgoing", timestamp, text, id })
    },
    addIncomingMessage: (state, action) => {
      const { number, timestamp, text, id } = action.payload
      state.chatData[number].incoming.push({ type: "incoming", timestamp, text, id })
    },
    setStatusMessage: (state, action) => {
      const { number, id, status } = action.payload
      state.chatData[number].outgoing.forEach((el) => {
        if (el.id === id) {
          el.status = status
        }
      })
    },
    setNoAccountError: (state, action) => {
      state.noAccountError.isNoAccountError = action.payload.isNoAccountError
      state.noAccountError.chatIdAccountError = action.payload.chatIdAccountError
    },
    handleNoAccountError: (state) => {
      const copyChatData = [...state.chatData]
      delete copyChatData[state.noAccountError.chatIdAccountError]
      return {
        ...state,
        chatData: copyChatData,
        isNoAccountError: false,
      }
    },
  },
})

export const {
  setNumber,
  addOutgoingMessage,
  addIncomingMessage,
  setStatusMessage,
  setNoAccountError,
  handleNoAccountError,
} = chat.actions

export default chat.reducer
