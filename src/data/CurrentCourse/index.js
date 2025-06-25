import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: {},
  user: {},
  loadingUser: false,
  loadingRegister: true,
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
    loadUserRegister: (state, action) => {
      state.loadingRegister = true;
    },
    storeCourse: (state, action) => {
      state.course = action.payload;
    },
    storeUser: (state, action) => {
      state.loadingUser = false;
      state.loadingRegister = false;
      state.user = action.payload;
    },
    errorUser: (state, action) => {
      state.loadingUser = false;
      state.loadingRegister = false;
      state.errorUser = "API Failure";
    },
  },
});

export const {
  storeCourse,
  storeUser,
  errorUser,
  loadUser,
  resetUser,
  loadUserRegister,
} = subFolderSlice.actions;

export default subFolderSlice.reducer;
