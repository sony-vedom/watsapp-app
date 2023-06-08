import { configureStore } from "@reduxjs/toolkit"

import createSagaMiddleware from "redux-saga"

import active from "@redux/reducers/active"
import auth from "@redux/reducers/auth"
import chat from "@redux/reducers/chat"
import errorServerMessage from "@redux/reducers/errorServerMessage"
import instance from "@redux/reducers/instance"
import notifications from "@redux/reducers/notifications"

import rootSaga from "@redux/sagas/rootSaga"

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    auth,
    instance,
    errorServerMessage,
    chat,
    active,
    notifications,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export default store
