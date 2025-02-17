import { call, put, takeLatest } from "redux-saga/effects";
import { loadUser, storeUser, errorUser } from "./index";
import { getUserData } from "./api";

function* fetchDataSaga({ payload }) {
  try {
    const data = yield call(getUserData, { payload });
    yield put(storeUser(data));
  } catch (error) {
    yield put(errorUser(error.message));
  }
}

export function* watchFetchUserSaga() {
  yield takeLatest(loadUser.type, fetchDataSaga);
}
