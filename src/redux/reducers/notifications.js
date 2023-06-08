import { createSlice } from "@reduxjs/toolkit"

export const notifications = createSlice({
  name: "notifications",
  initialState: {
    isUpdateNotification: false,
  },
  reducers: {
    setIsUpdateNotification: (state, action) => {
      state.isUpdateNotification = action.payload
    },
  },
})

export const { setIsUpdateNotification } = notifications.actions

export default notifications.reducer
