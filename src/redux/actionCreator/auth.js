import { loginAuthService } from "../../services/login";
import { getProfile } from "../../services/profile";
import { authLogin, getUser, authLogout } from "./actionString";

export const loginAction = (body) => {
  return {
    type: authLogin,
    payload: loginAuthService(body),
  };
};

export const getProfileRedux = (token) => {
  return {
    type: getUser,
    payload: getProfile(token),
  };
};

export const logOutAuthRedux = () => {
  return {
    type: authLogout,
  };
};
