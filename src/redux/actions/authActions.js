import authTypes from '../types/authTypes';
import authService from '../../services/authService';
import { showNotification } from './notificationActions';

export const register = (accountData) => (dispatch) => {
  return authService
    .register(accountData)
    .then((response) => {
      if (response.status === 201) {
        dispatch({ type: authTypes.REGISTER_SUCCESS });
        dispatch(showNotification('success', 'Utworzono konto'));
        return response;
      } else if (response.status === 403) {
        dispatch({ type: authTypes.REGISTER_FAIL });
        dispatch(
          showNotification(
            'warning',
            'Nazwa użytkownika lub adres email jest już używany'
          )
        );
      } else if (response.status === 400) {
        dispatch({ type: authTypes.REGISTER_FAIL });
        dispatch(showNotification('warning', 'Błędny format danych'));
      } else {
        dispatch({ type: authTypes.REGISTER_FAIL });
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      dispatch({ type: authTypes.REGISTER_FAIL });
      console.log(error);
    });
};

export const authenticate = (login, password, remember) => (dispatch) => {
  return authService
    .authenticate(login, password)
    .then((response) => {
      if (response.status === 200) {
        dispatch(showNotification('success', 'Pomyślnie zalogowano'));
        return response.json().then((data) => {
          dispatch(saveAuthenticatedUser(data));
          const currentDate = new Date();
          const tokenExpirationDate = new Date(
            currentDate.setMilliseconds(
              currentDate.getMilliseconds() + data.accessTokenExpiresIn
            )
          );
          dispatch(saveExpirationDateToken(tokenExpirationDate));
          dispatch(rememberUser(remember));
          return data;
        });
      } else if (response.status === 401) {
        dispatch({ type: authTypes.LOGIN_FAIL });
        dispatch(showNotification('error', 'Niepoprawny login lub hasło'));
      } else if (response.status === 403) {
        dispatch({ type: authTypes.LOGIN_FAIL });
        dispatch(showNotification('error', 'Konto jest zablokowane'));
      } else if (response.status === 409) {
        dispatch({ type: authTypes.LOGIN_FAIL });
        dispatch(showNotification('error', 'Nie aktywowano konta'));
      } else {
        dispatch({ type: authTypes.LOGIN_FAIL });
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      dispatch({ type: authTypes.LOGIN_FAIL });
      console.log(error);
    });
};

export const saveAuthenticatedUser = (user) => ({
  type: authTypes.LOGIN_SUCCESS,
  payload: { ...user },
});

export const saveExpirationDateToken = (expirationDate) => ({
  type: authTypes.SAVE_EXPIRATION_DATE_TOKEN,
  expirationDate,
});

export const updateToken = (accessToken, refreshToken) => ({
  type: authTypes.UPDATE_TOKEN,
  payload: {
    accessToken,
    refreshToken,
  },
});

export const rememberUser = (remember) => ({
  type: authTypes.REMEMBER_USER,
  remember,
});

export const logoutUser = () => ({
  type: authTypes.LOGOUT_USER,
});
