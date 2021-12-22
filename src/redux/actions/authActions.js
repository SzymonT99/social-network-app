import types from '../types/authTypes';

export const saveAccessToken = (accessToken) => ({
  type: types.SAVE_ACCESS_TOKEN,
  accessToken,
});

export const saveExpirationDateToken = (expirationDate) => ({
  type: types.SAVE_EXPIRATION_DATE_TOKEN,
  expirationDate,
});

export const saveRefreshToken = (refreshToken) => ({
  type: types.SAVE_REFRESH_TOKEN,
  refreshToken,
});

export const saveUserId = (userId) => ({
  type: types.SAVE_USER_ID,
  userId,
});

export const logoutUser = () => ({
  type: types.LOGOUT_USER,
});
