import postTypes from '../types/postTypes';
import postService from '../../services/postService';
import { push } from 'react-router-redux';
import { showNotification } from './notificationActions';
import { getActivityBoard } from './activityBoardActions';

export const createPost = (postFormData) => (dispatch) => {
  return postService
    .createPost(postFormData)
    .then((response) => {
      if (response.status === 201) {
        dispatch({ type: postTypes.CREATE_POST });
        dispatch(getActivityBoard());
        dispatch(showNotification('success', 'Dodano post'));
      } else if (response.status === 401) {
        dispatch(push('/auth/login'));
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

export const likePost = (postId) => (dispatch) => {
  return postService
    .likePost(postId)
    .then((response) => {
      if (response.status === 201) {
        dispatch({ type: postTypes.LIKE_POST });
        dispatch(getActivityBoard());
        dispatch(showNotification('success', 'Polubiono post'));
      } else if (response.status === 401) {
        dispatch(push('/auth/login'));
        dispatch(showNotification('warning', 'Nieautoryzowany dostęp'));
      } else if (response.status === 409) {
        dispatch(
          showNotification('warning', 'Użytkownik już polubił ten post')
        );
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

export const dislikePost = (postId) => (dispatch) => {
  return postService
    .dislikePost(postId)
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: postTypes.DISLIKE_POST });
        dispatch(getActivityBoard());
        dispatch(showNotification('success', 'Usunięto polubienie'));
      } else if (response.status === 401) {
        dispatch(push('/auth/login'));
        dispatch(showNotification('warning', 'Nieautoryzowany dostęp'));
      } else if (response.status === 409) {
        dispatch(
          showNotification('warning', 'Użytkownik nie lubił tego postu')
        );
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
