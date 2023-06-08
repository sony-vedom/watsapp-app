import axiosInstance from "@api/inctances/axiosInstance"
import greenApiInstance from "@api/inctances/greenApiInstance"

export const authApi = {
  auth: (idInstance, apiTokenInstance) =>
    axiosInstance.get(`waInstance${idInstance}/getStateInstance/${apiTokenInstance}`).then((response) => {
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      if (response.status === 200) {
        greenApiInstance.setInstance(idInstance, apiTokenInstance)
      }
      return response
    }),
  setSettings: () => {
    const { idInstance, apiTokenInstance } = greenApiInstance.getInstance()
    axiosInstance
      .post(`waInstance${idInstance}/setSettings/${apiTokenInstance}`, {
        webhookUrl: "",
        markIncomingMessagesReadedOnReply: "yes",
        outgoingWebhook: "yes",
        incomingWebhook: "yes",
        stateWebhook: "yes",
      })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.statusText)
        }
        return res
      })
  },
}
