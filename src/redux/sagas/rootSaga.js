import { all } from "redux-saga/effects"

import { watcherAuthenticationRequest } from "@redux/sagas/authRequest"
import { eventChannelSaga } from "@redux/sagas/channelNotifications"
import { watcherSendMessage } from "@redux/sagas/sendMessage"

export default function* rootSaga() {
  yield all([watcherAuthenticationRequest(), watcherSendMessage(), eventChannelSaga()])
}
