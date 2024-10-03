import { createSlice } from "@reduxjs/toolkit";

const subFolderSlice = createSlice({
  name: "currentCourse",
  initialState: {
    course: {}
  },
  reducers: {
    storeCourse: (state, action) => {
      state.course = action.payload;
    }
  }
});

export const { storeCourse } = subFolderSlice.actions;

export default subFolderSlice.reducer;
