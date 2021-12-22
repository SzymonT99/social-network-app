import types from "../types/authTypes";

const initialState = {
  accessToken: "",
  refreshToken: "",
  userId: 0,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case types.SAVE_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.refreshToken,
      };
    case types.SAVE_REFRESH_TOKEN:
      return {
        ...state,
        userId: action.userId,
      };
    default:
      return state;
  }
};

export default authReducer;
