import { createSlice } from "@reduxjs/toolkit";

const initialState = { expeneseList: [] };

const expenxeSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {
    setExpeneList(state, action) {
      state.expeneseList = action.payload;
    },
  },
});

export const expenxeAction = expenxeSlice.actions;

const expenseReducer = expenxeSlice.reducer;

export default expenseReducer;
