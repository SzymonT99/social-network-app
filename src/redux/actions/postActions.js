import postTypes from '../types/postTypes';
import postService from '../../services/postService';
import { showNotification } from './notificationActions';
import { logoutUser } from './authActions';
import { getUserActivity } from './userProfileActions';

export const createPost = (postFormData) => (dispatch, getState) => {
  return postService
    .createPost(postFormData)
    .then((response) => {
      if (response.status === 201) {
        return response.json().then((data) => {
          const addedPost = {
            activityDate: new Date(),
            activityType: 'CREATE_POST',
            activityAuthor: {
              userId: getState().auth.user.userId,
              activityStatus: 'ONLINE',
              email: getState().auth.userProfile.email,
              firstName: getState().auth.userProfile.firstName,
              lastName: getState().auth.userProfile.lastName,
              profilePhoto: getState().auth.userProfile.profilePhoto,
            },
            activity: data,
          };
          dispatch({
            type: postTypes.CREATE_POST,
            payload: {
              boardItem: addedPost,
            },
          });
          dispatch(getUserActivity(getState().auth.user.userId));
          dispatch(showNotification('success', 'Dodano post'));
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

export const editPost = (postId, postFormData) => (dispatch, getState) => {
  return postService
    .editPost(postId, postFormData)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: postTypes.EDIT_POST,
            payload: {
              postId: data.postId,
              updatedPost: data,
            },
          });
          dispatch(getUserActivity(getState().auth.user.userId));
          dispatch(showNotification('success', 'Edytowano post'));
        });
      } else if (response.status === 401) {
        window.location.href = '/auth/login';
        dispatch(logoutUser());
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Zabroniona akcja'));
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

export const deletePost = (postId) => (dispatch, getState) => {
  return postService
    .deletePost(postId)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: postTypes.DELETE_POST,
          payload: {
            postId: postId,
          },
        });
        dispatch(getUserActivity(getState().auth.user.userId));
        dispatch(showNotification('success', 'Usunięto post'));
      } else if (response.status === 401) {
        window.location.href = '/auth/login';
        dispatch(logoutUser());
        dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Zabroniona akcja'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const likePost =
  (postId, postAuthorId, isSharing = false) =>
  (dispatch, getState) => {
    return postService
      .likePost(postId)
      .then((response) => {
        if (response.status === 201) {
          const liked = {
            likedUser: {
              userId: getState().auth.user.userId,
              activityStatus: 'ONLINE',
              email: getState().auth.userProfile.email,
              firstName: getState().auth.userProfile.firstName,
              lastName: getState().auth.userProfile.lastName,
              profilePhoto: getState().auth.userProfile.profilePhoto,
            },
            date: new Date(),
          };
          if (!isSharing) {
            dispatch({
              type: postTypes.LIKE_POST,
              payload: { postId: postId, liked: liked },
            });
          } else {
            dispatch({
              type: postTypes.LIKE_SHARED_POST,
              payload: { postId: postId, liked: liked },
            });
          }
          if (postAuthorId === getState().auth.user.userId) {
            dispatch(getUserActivity(getState().auth.user.userId));
          } else {
            dispatch(getUserActivity(postAuthorId));
          }
          dispatch(showNotification('success', 'Polubiono post'));
        } else if (response.status === 401) {
          dispatch(logoutUser());
          window.location.href = '/auth/login';
          dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
        } else if (response.status === 409) {
          dispatch(
            showNotification('warning', 'Użytkownik już polubił ten post')
          );
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const dislikePost =
  (postId, postAuthorId, isSharing = false) =>
  (dispatch, getState) => {
    return postService
      .dislikePost(postId)
      .then((response) => {
        if (response.status === 200) {
          if (!isSharing) {
            dispatch({
              type: postTypes.DISLIKE_POST,
              payload: {
                postId: postId,
                userId: getState().auth.user.userId,
              },
            });
          } else {
            dispatch({
              type: postTypes.DISLIKE_SHARED_POST,
              payload: {
                postId: postId,
                userId: getState().auth.user.userId,
              },
            });
          }
          if (postAuthorId === getState().auth.user.userId) {
            dispatch(getUserActivity(getState().auth.user.userId));
          } else {
            dispatch(getUserActivity(postAuthorId));
          }
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

export const commentPost =
  (postId, comment, postAuthorId, isSharing = false) =>
  (dispatch, getState) => {
    return postService
      .commentPost(postId, comment)
      .then((response) => {
        if (response.status === 201) {
          return response.json().then((data) => {
            if (!isSharing) {
              dispatch({
                type: postTypes.COMMENT_POST,
                payload: { postId: postId, comment: data },
              });
            } else {
              dispatch({
                type: postTypes.COMMENT_SHARED_POST,
                payload: { postId: postId, comment: data },
              });
            }
            if (postAuthorId === getState().auth.user.userId) {
              dispatch(getUserActivity(getState().auth.user.userId));
            } else {
              dispatch(getUserActivity(postAuthorId));
            }
            dispatch(showNotification('success', 'Dodano komentarz'));
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

export const editPostComment =
  (postId, commentId, comment, postAuthorId, isSharing = false) =>
  (dispatch, getState) => {
    return postService
      .editPostComment(commentId, comment)
      .then((response) => {
        if (response.status === 200) {
          if (!isSharing) {
            dispatch({
              type: postTypes.EDIT_POST_COMMENT,
              payload: {
                postId: postId,
                commentId: commentId,
                comment: comment,
              },
            });
          } else {
            dispatch({
              type: postTypes.EDIT_SHARED_POST_COMMENT,
              payload: {
                postId: postId,
                commentId: commentId,
                comment: comment,
              },
            });
          }
          if (postAuthorId === getState().auth.user.userId) {
            dispatch(getUserActivity(getState().auth.user.userId));
          } else {
            dispatch(getUserActivity(postAuthorId));
          }
          dispatch(showNotification('success', 'Komentarz został zmieniony'));
        } else if (response.status === 401) {
          dispatch(logoutUser());
          window.location.href = '/auth/login';
          dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
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

export const deletePostComment =
  (postId, commentId, postAuthorId, isSharing = false) =>
  (dispatch, getState) => {
    return postService
      .deletePostComment(commentId)
      .then((response) => {
        if (response.status === 200) {
          if (!isSharing) {
            dispatch({
              type: postTypes.DELETE_POST_COMMENT,
              payload: { postId: postId, commentId: commentId },
            });
          } else {
            dispatch({
              type: postTypes.DELETE_SHARED_POST_COMMENT,
              payload: { postId: postId, commentId: commentId },
            });
          }
          if (postAuthorId === getState().auth.user.userId) {
            dispatch(getUserActivity(getState().auth.user.userId));
          } else {
            dispatch(getUserActivity(postAuthorId));
          }
          dispatch(showNotification('success', 'Komentarz został usunięty'));
        } else if (response.status === 401) {
          dispatch(logoutUser());
          window.location.href = '/auth/login';
          dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const likePostComment =
  (postId, commentId, postAuthorId, isSharing = false) =>
  (dispatch, getState) => {
    return postService
      .likePostComment(commentId)
      .then((response) => {
        if (response.status === 201) {
          const likedUser = {
            userId: getState().auth.user.userId,
            activityStatus: 'ONLINE',
            email: getState().auth.userProfile.email,
            firstName: getState().auth.userProfile.firstName,
            lastName: getState().auth.userProfile.lastName,
            profilePhoto: getState().auth.userProfile.profilePhoto,
          };
          if (!isSharing) {
            dispatch({
              type: postTypes.LIKE_POST_COMMENT,
              payload: {
                postId: postId,
                commentId: commentId,
                likedUser: likedUser,
              },
            });
          } else {
            dispatch({
              type: postTypes.LIKE_SHARED_POST_COMMENT,
              payload: {
                postId: postId,
                commentId: commentId,
                likedUser: likedUser,
              },
            });
          }
          if (postAuthorId === getState().auth.user.userId) {
            dispatch(getUserActivity(getState().auth.user.userId));
          } else {
            dispatch(getUserActivity(postAuthorId));
          }
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
  (postId, commentId, postAuthorId, isSharing = false) =>
  (dispatch, getState) => {
    return postService
      .dislikePostComment(commentId)
      .then((response) => {
        if (response.status === 200) {
          if (!isSharing) {
            dispatch({
              type: postTypes.DISLIKE_POST_COMMENT,
              payload: {
                postId: postId,
                commentId: commentId,
                userId: getState().auth.user.userId,
              },
            });
          } else {
            dispatch({
              type: postTypes.DISLIKE_SHARED_POST_COMMENT,
              payload: {
                postId: postId,
                commentId: commentId,
                userId: getState().auth.user.userId,
              },
            });
          }
          if (postAuthorId === getState().auth.user.userId) {
            dispatch(getUserActivity(getState().auth.user.userId));
          } else {
            dispatch(getUserActivity(postAuthorId));
          }
          dispatch(
            showNotification('success', 'Usunięto polubienie komentarza')
          );
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

export const manageAccess =
  (postId, isPublic, isSharing = false) =>
  (dispatch, getState) => {
    return postService
      .managePostAccess(postId, isPublic)
      .then((response) => {
        if (response.status === 200) {
          if (isPublic) {
            dispatch(
              showNotification('success', 'Zmieniono na publiczny dostęp')
            );
          } else {
            dispatch(
              showNotification('success', 'Zmieniono na prywatny dostęp')
            );
          }
          if (!isSharing) {
            dispatch({
              type: postTypes.POST_ACCESS,
              payload: {
                postId: postId,
                isPublic: isPublic,
              },
            });
          } else {
            dispatch({
              type: postTypes.SHARED_POST_ACCESS,
              payload: {
                postId: postId,
                isPublic: isPublic,
              },
            });
          }
          dispatch(getUserActivity(getState().auth.user.userId));
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

export const managePostCommentsAccess =
  (postId, isBlocked, isSharing = false) =>
  (dispatch, getState) => {
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
          if (!isSharing) {
            dispatch({
              type: postTypes.POST_COMMENTS_ACCESS,
              payload: {
                postId: postId,
                isCommentingBlocked: isBlocked,
              },
            });
          } else {
            dispatch({
              type: postTypes.SHARED_POST_COMMENTS_ACCESS,
              payload: {
                postId: postId,
                isCommentingBlocked: isBlocked,
              },
            });
          }
          dispatch(getUserActivity(getState().auth.user.userId));
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

export const sharePost =
  (basePostId, outerPost, postAuthorId) => (dispatch, getState) => {
    return postService
      .sharePost(basePostId, outerPost)
      .then((response) => {
        if (response.status === 201) {
          return response.json().then((data) => {
            const sharedPost = {
              activityDate: new Date(),
              activityType: 'SHARE_POST',
              activityAuthor: {
                userId: getState().auth.user.userId,
                activityStatus: 'ONLINE',
                email: getState().auth.userProfile.email,
                firstName: getState().auth.userProfile.firstName,
                lastName: getState().auth.userProfile.lastName,
                profilePhoto: getState().auth.userProfile.profilePhoto,
              },
              activity: data,
            };
            const sharingInfo = {
              sharedPostId: data.sharedPostId,
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
            if (postAuthorId === getState().auth.user.userId) {
              dispatch(getUserActivity(getState().auth.user.userId));
            } else {
              dispatch(getUserActivity(postAuthorId));
            }
            dispatch(showNotification('success', 'Udostępniono post'));
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

export const deleteSharedPost =
  (sharedPostId, basePostId) => (dispatch, getState) => {
    return postService
      .deleteSharedPost(sharedPostId)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: postTypes.DELETE_SHARED_POST,
            payload: {
              sharedPostId: sharedPostId,
            },
          });
          dispatch({
            type: postTypes.UPDATE_DELETED_SHARED_POST,
            payload: {
              basePostId: basePostId,
              sharedPostId: sharedPostId,
            },
          });
          dispatch(getUserActivity(getState().auth.user.userId));
          dispatch(showNotification('success', 'Usunięto udostępnienie'));
        } else if (response.status === 401) {
          dispatch(logoutUser());
          window.location.href = '/auth/login';
          dispatch(showNotification('error', 'Nieautoryzowany dostęp'));
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
