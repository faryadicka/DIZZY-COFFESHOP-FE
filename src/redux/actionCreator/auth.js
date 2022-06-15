import { loginAuthService } from "../../services/login"
import { getProfile } from "../../services/profile"
import { authLogin, getUser } from "./actionString"

export const authActionRedux = (body) => {
  return {
    type: authLogin,
    payload: loginAuthService(body)
  }
}

export const getProfileRedux = (token) => {
  return {
    type: getUser,
    payload: getProfile(token)
  }
}