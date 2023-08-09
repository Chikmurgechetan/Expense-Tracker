import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("idToken");

const initialAuthState = {
  isLogin: !!initialToken,
  idToken: initialToken,

};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    setlogin(state, action) {
      state.isLogin = true;
      state.idToken = action.payload;
      localStorage.setItem("idToken", action.payload);
    },

    logOut(state) {
      state.isLogin = false;
      state.idToken = null;
      localStorage.removeItem("idToken");
    },

  
  },
});

export const authActions = authSlice.actions;
const authoReducer = authSlice.reducer;
export default authoReducer;
