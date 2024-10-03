import { all } from "redux-saga/effects";
import { watchFetchDataSaga } from "./SubFolderSlice/saga";

export default function* rootSaga() {
  yield all([
    watchFetchDataSaga() // Add more watchers here if needed
  ]);
}
