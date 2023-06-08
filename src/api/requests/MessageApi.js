import axiosInstance from "@api/inctances/axiosInstance"
import greenApiInstance from "@api/inctances/greenApiInstance"

export class MessageApi {
  constructor() {
    const { idInstance, apiTokenInstance } = greenApiInstance.getInstance()
    this.idInstance = idInstance
    this.apiTokenInstance = apiTokenInstance
  }
  sendMessage = (message, chatId) =>
    axiosInstance
      .post(`waInstance${this.idInstance}/sendMessage/${this.apiTokenInstance}`, {
        message,
        chatId,
      })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.statusText)
        }
        return res
      })
      .catch((e) => {
        throw new Error("error")
      })

  receiveNotification = () =>
    axiosInstance
      .get(`waInstance${this.idInstance}/receiveNotification/${this.apiTokenInstance}`)
      .then((res) => {
        return res
      })
      .catch((e) => {
        console.log(e)
        return null
      })

  deleteNotification = (receiptId) =>
    axiosInstance
      .delete(`waInstance${this.idInstance}/deleteNotification/${this.apiTokenInstance}/${receiptId}`)
      .then((res) => {
        return res
      })
}
