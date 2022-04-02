import { showNotification } from './notificationActions';
import userService from '../../services/userService';
import adminTypes from '../types/adminTypes';

export const getUserAccounts = (page, size) => (dispatch) => {
  return userService
    .getAllUserAccounts(page, size)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: adminTypes.FETCH_USER_ACCOUNTS,
            payload: {
              accounts: data.userAccounts,
            },
          });
          return data;
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
        dispatch(showNotification('success', 'Zaaktualizowano konto'));
      } else if (response.status === 404) {
        dispatch(showNotification('warning', 'Nie znaleziono użytkownika'));
      } else if (response.status === 400) {
        return response.json().then((data) => {
          const messageJson = JSON.stringify(data);
          const formatMessage = messageJson.substring(
            messageJson.indexOf(':') + 2,
            messageJson.lastIndexOf('"')
          );
          dispatch(showNotification('warning', formatMessage));
        });
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
        dispatch(showNotification('success', 'Usunięto konto użytkownika'));
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

export const getUserReports = () => (dispatch) => {
  return userService
    .getUserReports()
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: adminTypes.FETCH_REPORTS,
            payload: {
              reports: data,
            },
          });
          return data;
        });
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const manageUserReport = (reportId, confirmation) => (dispatch) => {
  return userService
    .decideAboutUserReport(reportId, confirmation)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserReports());
        if (confirmation) {
          dispatch(showNotification('success', 'Zaakceptowano zgłoszenie'));
        } else {
          dispatch(showNotification('success', 'Odrzucono zgłoszenie'));
        }
      } else if (response.status === 404) {
        dispatch(showNotification('warning', 'Nie znaleziono zgłoszenia'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
