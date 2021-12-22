import types from '../types/authTypes';

const initialState = {
  accessToken: '',
  expirationDate: '',
  refreshToken: '',
  userId: 0,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case types.SAVE_EXPIRATION_DATE_TOKEN:
      return {
        ...state,
        expirationDate: action.expirationDate,
      };
    case types.SAVE_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.refreshToken,
      };
    case types.SAVE_USER_ID:
      return {
        ...state,
        userId: action.userId,
      };
    case types.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
