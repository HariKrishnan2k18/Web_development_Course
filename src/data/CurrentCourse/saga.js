import { call, put, takeLatest } from "redux-saga/effects";
import { loadUser, storeUser, errorUser, loadUserRegister } from "./index";
import { getRegisterData, getUserData } from "./api";
import toast from "react-hot-toast";

function* fetchDataSaga({ payload }) {
  try {
    const data = yield call(getUserData, { payload });
    yield put(storeUser(data));
    toast.success("Successfully LoggedIn !!");
  } catch (error) {
    yield put(errorUser(error.message));
  }
}

function* fetchRegisterData({ payload }) {
  try {
    const data = yield call(getRegisterData, { payload });
    if (data.message?.user) {
      yield put(storeUser(data.message));
      toast.success("Successfully Registered !!");
    } else {
      yield put(errorUser(data.message));
    }
  } catch (error) {
    yield put(errorUser(error.message));
  }
}

export function* watchFetchUserSaga() {
  yield takeLatest(loadUser.type, fetchDataSaga);
  yield takeLatest(loadUserRegister.type, fetchRegisterData);
}
