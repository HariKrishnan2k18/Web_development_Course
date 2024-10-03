import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import subFolderReducer from "./SubFolderSlice/index";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    subFolderData: subFolderReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;
