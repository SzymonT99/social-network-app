import postTypes from '../types/postTypes';
import postService from '../../services/postService';
import { showNotification } from './notificationActions';
import { logoutUser } from './authActions';

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
              boardItem: addedPost,
            },
          });
        });
      } else if (response.status === 401) {
        window.location.href = '/auth/login';
        dispatch(logoutUser());
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
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

export const editPost = (postId, postFormData) => (dispatch) => {
  console.log('postId');
  console.log(postId);
  console.log(postFormData);
  return postService
    .editPost(postId, postFormData)
    .then((response) => {
      if (response.status === 200) {
        dispatch(showNotification('success', 'Edytowano post'));
        return response.json().then((data) => {
          dispatch({
            type: postTypes.EDIT_POST,
            payload: {
              postId: data.postId,
              updatedPost: data,
            },
          });
        });
      } else if (response.status === 401) {
        window.location.href = '/auth/login';
        dispatch(logoutUser());
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
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

export const deletePost = (postId) => (dispatch) => {
  return postService
    .deletePost(postId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(showNotification('success', 'Usunięto post'));
        dispatch({
          type: postTypes.DELETE_POST,
          payload: {
            postId: postId,
          },
        });
      } else if (response.status === 401) {
        window.location.href = '/auth/login';
        dispatch(logoutUser());
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
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
        dispatch({
          type: postTypes.LIKE_POST,
          payload: { postId: postId, liked: liked },
        });
        dispatch(showNotification('success', 'Polubiono post'));
      } else if (response.status === 401) {
        dispatch(logoutUser());
        window.location.href = '/auth/login';
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
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
        dispatch(showNotification('success', 'Usunięto polubienie postu'));
      } else if (response.status === 401) {
        dispatch(logoutUser());
        window.location.href = '/auth/login';
        dispatch(showNotification('warning', 'Nieautoryzowany dostęp'));
      } else if (response.status === 409) {
        dispatch(
          showNotification('warning', 'Użytkownik nie lubił tego postu')
        );
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
        dispatch(showNotification('success', 'Dodano komentarz'));
        return response.json().then((data) => {
          dispatch({
            type: postTypes.COMMENT_POST,
            payload: { postId: postId, comment: data },
          });
        });
      } else if (response.status === 401) {
        dispatch(logoutUser());
        window.location.href = '/auth/login';
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
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

export const editPostComment = (postId, commentId, comment) => (dispatch) => {
  return postService
    .editPostComment(commentId, comment)
    .then((response) => {
      if (response.status === 200) {
        dispatch(showNotification('success', 'Komentarz został zmieniony'));
        dispatch({
          type: postTypes.EDIT_POST_COMMENT,
          payload: { postId: postId, commentId: commentId, comment: comment },
        });
      } else if (response.status === 401) {
        dispatch(logoutUser());
        window.location.href = '/auth/login';
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
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

export const deletePostComment = (postId, commentId) => (dispatch) => {
  return postService
    .deletePostComment(commentId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(showNotification('success', 'Komentarz został usunięty'));
        dispatch({
          type: postTypes.DELETE_POST_COMMENT,
          payload: { postId: postId, commentId: commentId },
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

export const likePostComment = (postId, commentId) => (dispatch, getState) => {
  return postService
    .likePostComment(commentId)
    .then((response) => {
      if (response.status === 201) {
        const likedUser = {
          userId: getState().auth.user.userId,
          activityStatus: 'ONLINE',
          email: getState().profile.userProfile.email,
          firstName: getState().profile.userProfile.firstName,
          lastName: getState().profile.userProfile.lastName,
          profilePhoto: getState().profile.userProfile.profilePhoto,
        };
        dispatch({
          type: postTypes.LIKE_POST_COMMENT,
          payload: {
            postId: postId,
            commentId: commentId,
            likedUser: likedUser,
          },
        });
        dispatch(showNotification('success', 'Polubiono komentarz'));
      } else if (response.status === 401) {
        dispatch(logoutUser());
        window.location.href = '/auth/login';
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
      } else if (response.status === 409) {
        dispatch(
          showNotification('warning', 'Użytkownik już polubił ten komentarz')
        );
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const dislikePostComment =
  (postId, commentId) => (dispatch, getState) => {
    return postService
      .dislikePostComment(commentId)
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            showNotification('success', 'Usunięto polubienie komentarza')
          );
          dispatch({
            type: postTypes.DISLIKE_POST_COMMENT,
            payload: {
              postId: postId,
              commentId: commentId,
              userId: getState().auth.user.userId,
            },
          });
        } else if (response.status === 401) {
          dispatch(logoutUser());
          window.location.href = '/auth/login';
          dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
        } else if (response.status === 409) {
          dispatch(
            showNotification('warning', 'Użytkownik nie lubił tego komentarza')
          );
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const manageAccess = (postId, isPublic) => (dispatch) => {
  return postService
    .managePostAccess(postId, isPublic)
    .then((response) => {
      if (response.status === 200) {
        if (isPublic) {
          dispatch(
            showNotification('success', 'Zmieniono na publiczny dostęp')
          );
        } else {
          dispatch(showNotification('success', 'Zmieniono na prywatny dostęp'));
        }
        dispatch({
          type: postTypes.POST_ACCESS,
          payload: {
            postId: postId,
            isPublic: isPublic,
          },
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

export const managePostCommentsAccess = (postId, isBlocked) => (dispatch) => {
  return postService
    .managePostCommentsAccess(postId, isBlocked)
    .then((response) => {
      if (response.status === 200) {
        if (isBlocked) {
          dispatch(
            showNotification('success', 'Zablokowano możliwość komentowania')
          );
        } else {
          dispatch(
            showNotification('success', 'Odblokowano możliwość komentowania')
          );
        }
        dispatch({
          type: postTypes.POST_COMMENTS_ACCESS,
          payload: {
            postId: postId,
            isCommentingBlocked: isBlocked,
          },
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

export const sharePost = (basePostId, outerPost) => (dispatch, getState) => {
  return postService
    .sharePost(basePostId, outerPost)
    .then((response) => {
      if (response.status === 201) {
        dispatch(showNotification('success', 'Udostępniono post'));
        return response.json().then((data) => {
          const sharedPost = {
            activityDate: new Date(),
            activityType: 'SHARE_POST',
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
          const sharingInfo = {
            sharingText: outerPost.text,
            authorOfSharing: sharedPost.activityAuthor,
            date: sharedPost.activityAuthor,
            isPublic: outerPost.isPublic,
          };
          dispatch({
            type: postTypes.SHARE_POST,
            payload: {
              boardItem: sharedPost,
            },
          });
          dispatch({
            type: postTypes.UPDATE_SHARED_POST,
            payload: {
              basePostId: basePostId,
              sharingInfo: sharingInfo,
            },
          });
        });
      } else if (response.status === 401) {
        dispatch(logoutUser());
        window.location.href = '/auth/login';
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
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
