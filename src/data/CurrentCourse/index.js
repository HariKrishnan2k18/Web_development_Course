import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: {},
  user: {},
  loadingUser: false,
  errorUser: "",
};

const subFolderSlice = createSlice({
  name: "currentCourse",
  initialState,
  reducers: {
    resetUser: () => initialState,
    loadUser: (state, action) => {
      state.loadingUser = true;
    },
    storeCourse: (state, action) => {
      state.course = action.payload;
    },
    storeUser: (state, action) => {
      state.loadingUser = false;
      state.user = action.payload;
    },
    errorUser: (state, action) => {
      state.loadingUser = false;
      state.errorUser = "API Failure";
    },
  },
});

export const { storeCourse, storeUser, errorUser, loadUser, resetUser } =
  subFolderSlice.actions;

export default subFolderSlice.reducer;
