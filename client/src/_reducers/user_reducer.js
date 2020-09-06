import {
  LOGIN_USER,
  SIGNUP_USER,
  CHANGE_PROFILE,
  AUTH_USER,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case SIGNUP_USER:
      return { ...state, signUpSuccess: action.payload };

    case CHANGE_PROFILE:
      return { ...state, changeSuccess: action.payload };

    case AUTH_USER:
      return { ...state, userData: action.payload };

    default:
      return state;
  }
}
