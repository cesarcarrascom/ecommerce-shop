import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = null;
    },
    logoutFailure: (state) => {
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginFailure,
  loginSuccess,
  logoutSuccess,
  logoutFailure,
} = UserSlice.actions;
export default UserSlice.reducer;
