import {
  PENDING,
  FULLFILLED,
  REJECTED,
  getUser,
} from "../actionCreator/actionString";

const initialState = {
  userData: null,
  isLoading: false,
  err: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case getUser + PENDING:
      return { ...state, isLoading: true };
    case getUser + FULLFILLED:
      return { ...state, userData: action.payload.data.data, isLoading: false };
    case getUser + REJECTED:
      return { ...state, err: action.payload, isLoading: false };
    default:
      return state;
  }
};

export default usersReducer;
