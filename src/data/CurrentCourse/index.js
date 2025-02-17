import { createSlice } from "@reduxjs/toolkit";

const subFolderSlice = createSlice({
  name: "currentCourse",
  initialState: {
    course: {},
    user: {},
    loadingUser: false,
    errorUser: "",
  },
  reducers: {
    loadUser: (state, action) => {
      state.loadingUser = true
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
    }
  }
});

export const { storeCourse, storeUser, errorUser, loadUser } = subFolderSlice.actions;

export default subFolderSlice.reducer;
