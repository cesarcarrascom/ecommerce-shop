import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
  logoutFailure,
} from "./UserRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data.user));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch) => {
  try {
    await publicRequest.get("/auth/logout");
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure());
  }
};
