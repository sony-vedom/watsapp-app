import { call, put, select, takeEvery } from "redux-saga/effects"

import api from "@/api"

import { setAuthData } from "@redux/reducers/auth"
import { setFormDisabled, setStatusInstance } from "@redux/reducers/instance"

export function* authRequest() {
  const state = yield select((state) => state.auth)
  try {
    yield put(setFormDisabled(true))
    const res = yield call(api.authApi.auth, state.idInstance, state.apiTokenInstance)
    yield put(setStatusInstance(res.data.stateInstance))
  } catch (e) {
    yield put(setStatusInstance("error"))
  } finally {
    yield put(setFormDisabled(false))
  }
}

export function* watcherAuthenticationRequest() {
  yield takeEvery(setAuthData().type, authRequest)
}
