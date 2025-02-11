import { createSlice } from "@reduxjs/toolkit";

const subFolderSlice = createSlice({
  name: "currentCourse",
  initialState: {
    course: {},
    user: {}
  },
  reducers: {
    storeCourse: (state, action) => {
      state.course = action.payload;
    },
    storeUser: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const { storeCourse, storeUser } = subFolderSlice.actions;

export default subFolderSlice.reducer;
