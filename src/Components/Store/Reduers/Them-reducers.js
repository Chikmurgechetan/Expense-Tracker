import { createSlice } from "@reduxjs/toolkit";

const initialState = { darkThem: false };

const themSlice = createSlice({
  name: "them",
  initialState: initialState,
  reducers: {
    toggleThem(state) {
      state.darkThem = !state.darkThem;
    },
  },
});

export const themAction = themSlice.actions;

const themReducer = themSlice.reducer;

export default themReducer;
