import { loginAuthService } from "../../services/login"

export const authActionRedux = (body) => {
  return {
    type: "AUTH_LOGIN",
    payload: loginAuthService(body)
  }
}