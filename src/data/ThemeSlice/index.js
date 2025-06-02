import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    themeDark: false,
  },
  reducers: {
    setTheme: (state) => {
      state.themeDark = !state.themeDark;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
