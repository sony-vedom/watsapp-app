import { call, put, select } from "redux-saga/effects"

import { addIncomingMessage, setNoAccountError, setStatusMessage } from "@redux/reducers/chat"
import { setStatusInstance } from "@redux/reducers/instance"

export function* outgoingMessageStatusProcess(data) {
  yield put(
    setStatusMessage({
      number: data.body.chatId,
      id: data.body.idMessage,
      status: data.body.status,
    }),
  )
  if (data.body.status === "noAccount") {
    yield put(
      setNoAccountError({
        isNoAccountError: true,
        chatIdAccountError: data.body.chatId,
      }),
    )
  }
}

export function* incomingMessageReceived(data) {
  yield put(
    addIncomingMessage({
      number: data.body.senderData.chatId,
      timestamp: data.body.timestamp,
      id: data.body.idMessage,
      text: data.body.messageData.textMessageData.textMessage,
    }),
  )
}

export function* stateInstanceChanged(data) {
  yield put(setStatusInstance(data.body.stateInstance))
}

export function* managerNotifications(data) {
  const chatData = yield select((state) => state.chat.chatData)
  const active = yield select((state) => state.active)
  if (Object.keys(chatData).length !== 0) {
    switch (data.body.typeWebhook) {
      case "outgoingMessageStatus": {
        yield call(outgoingMessageStatusProcess, data)
        break
      }
      case "incomingMessageReceived": {
        if (data.body.messageData.typeMessage === "textMessage") {
          yield call(incomingMessageReceived, data)
        }
        break
      }
      default: {
        break
      }
    }
  }

  if (data.body.typeWebhook === "stateInstanceChanged") {
    yield call(stateInstanceChanged, data, active)
  }
}
