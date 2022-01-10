import postTypes from '../types/postTypes';
import postService from '../../services/postService';

import { showNotification } from './notificationActions';

export const createPost = (postFormData) => (dispatch) => {
  console.log(postFormData);
  return postService
    .createPost(postFormData)
    .then((response) => {
      if (response.status === 201) {
        dispatch({ type: postTypes.CREATE_POST });
        dispatch(showNotification('success', 'Dodano post'));
      } else if (response.status === 401) {
        dispatch(showNotification('warning', 'Nieautoryzowany dostęp'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Błędny format danych'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
