import authTypes from '../types/authTypes';
import authService from '../../services/authService';
import { showNotification } from './notificationActions';
import { getUserProfile } from './userProfileActions';
import { getUserFriends } from './friendAction';
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
      } else if (response.status === 423) {
        dispatch({ type: authTypes.LOGIN_FAIL });
        dispatch(showNotification('error', 'Konto jest zarchiwizowane'));
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

export const updateToken = (accessToken, expirationTime, refreshToken) => ({
  type: authTypes.UPDATE_TOKEN,
  payload: {
    accessToken,
    expirationTime,
    refreshToken,
  },
});

export const logoutUser = () => (dispatch) => {
  dispatch({ type: authTypes.LOG_OUT_USER });
  return authService
    .logout()
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: 'CLEAR_ALL' });
        dispatch(showNotification('success', 'Wylogowano'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Niepoprawne dane'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editUserEmail =
  (oldEmail, newEmail, password) => (dispatch, getState) => {
    return authService
      .editUserEmail(getState().auth.user.userId, oldEmail, newEmail, password)
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => {
            dispatch(
              updateToken(
                data.accessToken,
                data.accessTokenExpiresIn,
                data.refreshToken
              )
            );
            dispatch(getUserProfile(getState().auth.user.userId, true));
            dispatch(showNotification('success', 'Zmieniono adres email'));
            return response.status;
          });
        } else if (response.status === 401) {
          dispatch(showNotification('error', 'Błędne hasło'));
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Niezgodny adres email'));
        } else if (response.status === 400) {
          dispatch(showNotification('warning', 'Błędny format danych'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
        return response.status;
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const editUsername =
  (oldUsername, newUsername, password) => (dispatch, getState) => {
    return authService
      .editUsername(
        getState().auth.user.userId,
        oldUsername,
        newUsername,
        password
      )
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => {
            dispatch(
              updateToken(
                data.accessToken,
                data.accessTokenExpiresIn,
                data.refreshToken
              )
            );
            dispatch(getUserProfile(getState().auth.user.userId, true));
            dispatch(
              showNotification('success', 'Zmieniono nazwe użytkownika')
            );
            return response.status;
          });
        } else if (response.status === 401) {
          dispatch(showNotification('error', 'Błędne hasło'));
        } else if (response.status === 403) {
          dispatch(
            showNotification(
              'warning',
              'Niepoprawna aktualna nazwa użytkownika'
            )
          );
        } else if (response.status === 400) {
          dispatch(showNotification('warning', 'Błędny format danych'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
        return response.status;
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const editPhoneNumber =
  (oldPhoneNumber, newPhoneNumber, password) => (dispatch, getState) => {
    return authService
      .editPhoneNumber(
        getState().auth.user.userId,
        oldPhoneNumber,
        newPhoneNumber,
        password
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch(getUserProfile(getState().auth.user.userId, true));
          dispatch(showNotification('success', 'Zmieniono numer telefonu'));
        } else if (response.status === 401) {
          dispatch(showNotification('error', 'Błędne hasło'));
        } else if (response.status === 403) {
          dispatch(
            showNotification('warning', 'Niepoprawny aktualny numer telefonu')
          );
        } else if (response.status === 400) {
          dispatch(showNotification('warning', 'Błędny format danych'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
        return response.status;
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const changePassword =
  (oldPassword, newPassword, repeatedNewPassword) => (dispatch, getState) => {
    return authService
      .changePassword(
        getState().auth.user.userId,
        oldPassword,
        newPassword,
        repeatedNewPassword
      )
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => {
            dispatch(
              updateToken(
                data.accessToken,
                data.accessTokenExpiresIn,
                data.refreshToken
              )
            );
            dispatch(showNotification('success', 'Zmieniono hasło'));
            return response.status;
          });
        } else if (response.status === 401) {
          dispatch(showNotification('error', 'Błędne hasło'));
        } else if (response.status === 400) {
          dispatch(
            showNotification(
              'warning',
              'Ponownie wprowadzone hasło jest błędne'
            )
          );
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
        return response.status;
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const deleteUserAccount = (login, password) => (dispatch) => {
  return authService
    .deleteUserAccount(login, password)
    .then((response) => {
      if (response.status === 200) {
        window.location.href = '/auth/login';
        dispatch(logoutUser());
        dispatch(showNotification('success', 'Konto zostało usunięte'));
      } else if (response.status === 401) {
        dispatch(showNotification('error', 'Błędne hasło'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
      return response.status;
    })
    .catch((error) => {
      console.log(error);
    });
};
