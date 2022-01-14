import postTypes from '../types/postTypes';
import postService from '../../services/postService';
import { push } from 'react-router-redux';
import { showNotification } from './notificationActions';
import { getActivityBoard } from './userActivityActions';

export const createPost = (postFormData) => (dispatch, getState) => {
  return postService
    .createPost(postFormData)
    .then((response) => {
      if (response.status === 201) {
        dispatch(showNotification('success', 'Dodano post'));
        return response.json().then((data) => {
          const addedPost = {
            activityDate: new Date(),
            activityType: 'CREATE_POST',
            activityAuthor: {
              userId: getState().auth.user.userId,
              activityStatus: 'ONLINE',
              email: getState().profile.userProfile.email,
              firstName: getState().profile.userProfile.firstName,
              lastName: getState().profile.userProfile.lastName,
              profilePhoto: getState().profile.userProfile.profilePhoto,
            },
            activity: data,
          };
          dispatch({
            type: postTypes.CREATE_POST,
            payload: {
              activity: addedPost,
            },
          });
        });
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

export const likePost = (postId) => (dispatch, getState) => {
  return postService
    .likePost(postId)
    .then((response) => {
      if (response.status === 201) {
        const liked = {
          likedUser: {
            userId: getState().auth.user.userId,
            activityStatus: 'ONLINE',
            email: getState().profile.userProfile.email,
            firstName: getState().profile.userProfile.firstName,
            lastName: getState().profile.userProfile.lastName,
            profilePhoto: getState().profile.userProfile.profilePhoto,
          },
          date: new Date(),
        };
        console.log(liked);
        dispatch({
          type: postTypes.LIKE_POST,
          payload: { postId: postId, liked: liked },
        });
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

export const dislikePost = (postId) => (dispatch, getState) => {
  return postService
    .dislikePost(postId)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: postTypes.DISLIKE_POST,
          payload: { postId: postId, userId: getState().auth.user.userId },
        });
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

export const commentPost = (postId, comment) => (dispatch) => {
  return postService
    .commentPost(postId, comment)
    .then((response) => {
      if (response.status === 201) {
        dispatch({ type: postTypes.COMMENT_POST });
        dispatch(getActivityBoard());
        dispatch(showNotification('success', 'Dodano komentarz'));
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
