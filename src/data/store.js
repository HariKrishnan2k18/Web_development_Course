import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import subFolderReducer from "./SubFolderSlice/index";
import themeReducer from "./ThemeSlice";
import currentCourseReducer from "./CurrentCourse";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    subFolderData: subFolderReducer,
    currentCourse: currentCourseReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
