import { call, put, takeLatest } from "redux-saga/effects";
import { fetchDataSuccess, fetchDataFailure, fetchDataRequest } from "./index";
import { fetchApiData } from "./api";

function* fetchDataSaga({ payload }) {
  try {
    const data = yield call(fetchApiData, { payload });
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export function* watchFetchDataSaga() {
  yield takeLatest(fetchDataRequest.type, fetchDataSaga);
}
