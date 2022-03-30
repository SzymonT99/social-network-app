import { showNotification } from './notificationActions';
import userService from '../../services/userService';
import adminTypes from '../types/adminTypes';

export const getUserAccounts = () => (dispatch) => {
  return userService
    .getAllUserAccounts()
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: adminTypes.FETCH_USER_ACCOUNTS,
            payload: {
              accounts: data,
            },
          });
        });
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const manageUserAccount = (userId, userAccount) => (dispatch) => {
  return userService
    .manageUserAccountByAdmin(userId, userAccount)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: adminTypes.MANAGE_USER_ACCOUNT,
          payload: {
            userId: userId,
            updatedAccount: userAccount,
          },
        });
      } else if (response.status === 404) {
        dispatch(showNotification('warning', 'Nie znaleziono użytkownika'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteUserAccountByAdmin = (userId) => (dispatch) => {
  return userService
    .deleteUserByAdmin(userId)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: adminTypes.DELETE_USER_ACCOUNT,
          payload: {
            userId: userId,
          },
        });
      } else if (response.status === 404) {
        dispatch(showNotification('warning', 'Nie znaleziono użytkownika'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
