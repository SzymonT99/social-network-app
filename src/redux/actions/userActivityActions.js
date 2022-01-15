import activityTypes from '../types/userActivityTypes';
import activityService from '../../services/activityService';
import { showNotification } from './notificationActions';

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
        });
      } else if (response.status === 401) {
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
