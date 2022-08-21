import { getProfileAxios, updateProfileAxios } from "../../services/users";
import { getUser, editUser } from "./actionString";

export const getProfileRedux = (token) => {
  return {
    type: getUser,
    payload: getProfileAxios(token),
  };
};

export const updateProfileAction = (body, token) => {
  return {
    type: editUser,
    payload: updateProfileAxios(body, token),
  };
};
