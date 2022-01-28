import authTypes from '../types/authTypes';
import authService from '../../services/authService';
import { showNotification } from './notificationActions';
import { getUserProfile } from './userProfileActions';
import { getFriendInvitations, getUserFriends } from './friendAction';
import { getAllUsersInformation } from './userActivityActions';

export const register = (accountData) => (dispatch) => {
  return authService
    .register(accountData)
    .then((response) => {
      if (response.status === 201) {
        dispatch({ type: authTypes.REGISTER_SUCCESS });
        dispatch(showNotification('success', 'Utworzono konto'));
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
        dispatch(showNotification('warning', 'Niepoprawne dane'));
      } else {
        dispatch({ type: authTypes.REGISTER_FAIL });
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
      return response;
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
          dispatch({
            type: authTypes.LOGIN_SUCCESS,
            payload: { ...data },
          });
          const currentDate = new Date();
          const tokenExpirationDate = new Date(
            currentDate.setMilliseconds(
              currentDate.getMilliseconds() + data.accessTokenExpiresIn
            )
          );
          dispatch({
            type: authTypes.SAVE_EXPIRATION_DATE_TOKEN,
            payload: tokenExpirationDate,
          });
          dispatch({ type: authTypes.REMEMBER_USER, payload: remember });
          dispatch(getUserProfile(data.userId, true));
          dispatch(getUserFriends(data.userId, true));
          dispatch(getFriendInvitations(data.userId, true));
          dispatch(getAllUsersInformation());
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

export const updateToken = (accessToken, refreshToken) => ({
  type: authTypes.UPDATE_TOKEN,
  payload: {
    accessToken,
    refreshToken,
  },
});

export const logoutUser = () => ({
  type: 'CLEAR_ALL',
});
