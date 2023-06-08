import { createContext } from "react"

const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance()

export const context = createContext({ phoneUtil })
