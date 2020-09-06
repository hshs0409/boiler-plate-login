import axios from "axios";
import { LOGIN_USER, SIGNUP_USER, CHANGE_PROFILE, AUTH_USER } from "./types";

export const loginUser = (dataToSubmit) => {
  const request = axios
    .post("/api/users/signIn", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const signUpUser = (dataToSubmit) => {
  const request = axios
    .post("/api/users/signUp", dataToSubmit)
    .then((response) => response.data);

  return {
    type: SIGNUP_USER,
    payload: request,
  };
};

export const changeProfile = (dataToSubmit) => {
  const request = axios
    .post("/api/users/profile", dataToSubmit)
    .then((response) => response.data);

  return {
    type: CHANGE_PROFILE,
    payload: request,
  };
};

export const auth = () => {
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
};
