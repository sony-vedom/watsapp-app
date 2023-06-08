import { eventChannel } from "redux-saga"
import { actionChannel, call, put, take } from "redux-saga/effects"

import api from "@/api"

import { setIsUpdateNotification } from "@redux/reducers/notifications"

import { managerNotifications } from "@redux/sagas/manegerNotifications"

export const createEventProvider = () => {
  const subscribers = {}
  const triggeredEvent = (event, payload) => {
    ;(subscribers[event] || []).map((el) => el(payload))
  }

  const newMessageApi = new api.MessageApi()

  ;(async function myFoo() {
    const res = await newMessageApi.receiveNotification()
    if (res) {
      if (res.data !== null) {
        await newMessageApi.deleteNotification(res.data.receiptId)
      }
      await triggeredEvent("getNotification", { payload: res })
      await myFoo()
    }
  })()

  return {
    subscribe: (event, handler) => {
      if (!subscribers[event]) {
        subscribers[event] = []
      }
      subscribers[event].push(handler)
    },
    unsubscribe: (event, handler) => {
      subscribers[event] = subscribers[event].filter((sub) => sub !== handler)
    },
  }
}

const createEventProviderChannel = (eventProvider) => {
  return eventChannel((emit) => {
    const getNotificationHandler = (event) => {
      emit(event.payload)
    }
    eventProvider.subscribe("getNotification", getNotificationHandler)

    return () => eventProvider.unsubscribe("getNotification", getNotificationHandler)
  })
}

export function* eventChannelSaga() {
  const requestChannel = yield actionChannel(setIsUpdateNotification().type)
  const { payload } = yield take(requestChannel)
  if (payload) {
    yield call(api.authApi.setSettings)
    const eventProvider = yield call(createEventProvider)
    const eventProviderChannel = yield call(createEventProviderChannel, eventProvider)
    try {
      while (true) {
        const payload = yield take(eventProviderChannel)
        if (payload.data) yield call(managerNotifications, payload.data)
      }
    } catch (e) {
      console.log(`Error: ${e}`)
    } finally {
      yield put(setIsUpdateNotification().type, false)
    }
  }
}
