import types from '../types/authTypes';
import postTypes from '../types/postTypes';

const initialState = {
  isLoggedIn: false,
  isTokenRefreshing: false,
  remember: false,
  user: null,
  userProfile: null,
  favouritePosts: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case types.SET_TOKEN_REFRESHING:
      return {
        ...state,
        isTokenRefreshing: action.payload.isTokenRefreshing,
      };
    case types.REFRESH_TOKEN:
      return {
        ...state,
        user: {
          ...state.user,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          accessTokenExpirationDate: action.payload.accessTokenExpirationDate,
        },
      };
    case types.REMEMBER_USER:
      return {
        ...state,
        remember: action.payload.remember,
      };
    case types.SAVE_LOGGED_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload.userProfile,
      };
    case postTypes.FETCH_FAVOURITE_POSTS:
      return {
        ...state,
        favouritePosts: action.payload.favouritePosts,
      };
    case types.CLEAR_ALL:
      return initialState;
    case types.LOG_OUT_USER:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
