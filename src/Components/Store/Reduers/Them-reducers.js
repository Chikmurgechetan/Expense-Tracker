import { createSlice } from "@reduxjs/toolkit";

const initialState = { themeDark:window.matchMedia('(prefers-color-scheme: dark)').matches};
const themSlice = createSlice({
  name: "them",
  initialState: initialState,
  reducers: {
    toggleThem(state) {
      console.log("Toggling theme");
      state.themeDark = !state.themeDark;
    },
  },
});

export const themeAction = themSlice.actions;

const themReducer = themSlice.reducer;

export default themReducer;
