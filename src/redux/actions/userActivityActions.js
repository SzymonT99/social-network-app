import activityTypes from '../types/userActivityTypes';
import activityService from '../../services/activityService';
import { showNotification } from './notificationActions';
import { logoutUser } from './authActions';

export const getActivityBoard = () => (dispatch) => {
  return activityService
    .getActivityBoard()
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: activityTypes.FETCH_BOARD_SUCCESS,
            payload: {
              board: data,
            },
          });
          dispatch(setLoading(false));
        });
      } else if (response.status === 401) {
        dispatch(logoutUser());
        window.location.href = '/auth/login';
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
      } else {
        dispatch({ type: activityTypes.FETCH_BOARD_FAILURE });
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      dispatch({ type: activityTypes.FETCH_BOARD_FAILURE });
      console.log(error);
    });
};

export const setLoading = (isLoading) => ({
  type: activityTypes.SET_LOADING,
  payload: {
    isLoading: isLoading,
  },
});
