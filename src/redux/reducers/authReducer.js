import types from '../types/authTypes';

const initialState = {
  isLoggedIn: false,
  remember: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case types.SAVE_EXPIRATION_DATE_TOKEN:
      return {
        ...state,
        user: { ...state.user, expirationDate: action.expirationDate },
      };
    case types.UPDATE_TOKEN:
      return {
        ...state,
        user: {
          ...state.user,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        },
      };
    case types.REMEMBER_USER:
      return {
        ...state,
        remember: action.remember,
      };
    case types.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
