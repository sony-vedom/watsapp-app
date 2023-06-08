import { call, put, select, takeEvery } from "redux-saga/effects"

import api from "@/api"

import { setOutgoingMessage } from "@redux/reducers/active"
import { addOutgoingMessage } from "@redux/reducers/chat"

export function* sendMessage() {
  const active = yield select((state) => state.active)
  const MessageApi = new api.MessageApi()
  try {
    const res = yield call(MessageApi.sendMessage, active.message.outgoing, active.number)
    if (res) {
      yield put(
        addOutgoingMessage({
          number: active.number,
          timestamp: Date.now() / 1000,
          id: res.data.idMessage,
          text: active.message.outgoing,
          status: "sent",
        }),
      )
    }
  } catch (e) {
    console.log("Error: ограничения аккаунта")
  }
}

export function* watcherSendMessage() {
  yield takeEvery(setOutgoingMessage().type, sendMessage)
}
