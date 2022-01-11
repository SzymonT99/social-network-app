import activityTypes from '../types/activityBoardTypes';
import activityService from '../../services/activityService';
import { showNotification } from './notificationActions';
import { push } from 'react-router-redux';

export const getActivityBoard = () => (dispatch) => {
  return activityService
    .getActivityBoard()
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          console.log(data);
          dispatch({
            type: activityTypes.FETCH_SUCCESS,
            payload: {
              userActivity: data,
            },
          });
        });
      } else if (response.status === 401) {
        dispatch(push('/auth/login'));
        dispatch(showNotification('error', 'Niepoprawny login lub hasło'));
      } else {
        dispatch({ type: activityTypes.FETCH_FAILURE });
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      dispatch({ type: activityTypes.FETCH_FAILURE });
      console.log(error);
    });
};
