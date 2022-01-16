import userProfileTypes from '../types/userProfileTypes';
import userProfileService from '../../services/userService';
import { showNotification } from './notificationActions';
import { logoutUser } from './authActions';

export const getUserProfile = (userId) => (dispatch) => {
  return userProfileService
    .getUserProfile(userId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: userProfileTypes.FETCH_USER_PROFILE,
            payload: data,
          });
        });
      } else if (response.status === 401) {
        dispatch(logoutUser());
        window.location.href = '/auth/login';
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
