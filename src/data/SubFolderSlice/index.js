import { createSlice } from "@reduxjs/toolkit";

const subFolderSlice = createSlice({
  name: "subFolderData",
  initialState: {
    loading: false,
    data: [],
    error: ""
  },
  reducers: {
    fetchDataRequest: (state, action) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      console.log("data slice", action.payload);
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    }
  }
});

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure
} = subFolderSlice.actions;

export default subFolderSlice.reducer;
