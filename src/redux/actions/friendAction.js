import friendService from '../../services/friendService';
import { showNotification } from './notificationActions';
import { logoutUser } from './authActions';
import authTypes from '../types/authTypes';
import userProfileTypes from '../types/userProfileTypes';

export const inviteToFriend = (inviterUserId) => (dispatch, getState) => {
  return friendService
    .inviteToFriend(inviterUserId)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getFriendInvitations(inviterUserId));
        dispatch(getUserFriends(getState().auth.user.userId, true));
        dispatch(showNotification('success', 'Wysłano zaproszenie'));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Zabroniona akcja'));
      } else if (response.status === 409) {
        dispatch(showNotification('warning', 'Już wysłano zaproszenie'));
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

export const getFriendInvitations =
  (userId, forLoggedIn = false) =>
  (dispatch) => {
    return friendService
      .getFriendsInvitation(userId)
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => {
            if (!forLoggedIn) {
              dispatch({
                type: userProfileTypes.FETCH_USER_FRIENDS_INVITATION,
                payload: {
                  friendInvitations: data,
                },
              });
            } else {
              dispatch({
                type: authTypes.SAVE_LOGGED_USER_FRIEND_INVITATIONS,
                payload: {
                  friendInvitations: data,
                },
              });
            }
            return data;
          });
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
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

export const getUserFriends =
  (userId, forLoggedIn = false) =>
  (dispatch) => {
    return friendService
      .getUserFriends(userId)
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => {
            if (!forLoggedIn) {
              dispatch({
                type: userProfileTypes.FETCH_USER_FRIENDS,
                payload: {
                  friends: data,
                },
              });
            } else {
              dispatch({
                type: authTypes.SAVE_LOGGED_USER_FRIENDS,
                payload: {
                  friends: data,
                },
              });
            }
            return data;
          });
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
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

export const respondToFriendInvitation =
  (inviterId, reaction) => (dispatch, getState) => {
    return friendService
      .respondToFriendInvitation(inviterId, reaction)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getUserFriends(getState().auth.user.userId, true));
          dispatch(getFriendInvitations(getState().auth.user.userId, true));
          if (reaction === 'accept') {
            dispatch(showNotification('success', 'Zaakceptowano zaproszenie'));
          } else {
            dispatch(showNotification('success', 'Odrzucono zaproszenie'));
          }
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
        } else if (response.status === 409) {
          dispatch(
            showNotification('warning', 'Już odpowiedziano na zaproszenie')
          );
        } else if (response.status === 400) {
          dispatch(
            showNotification('warning', 'Nieznana reakcja na zaproszenie')
          );
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

export const deleteFriend =
  (friendId, deletingInvitation = false) =>
  (dispatch, getState) => {
    return friendService
      .deleteFriend(friendId, deletingInvitation)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getUserFriends(getState().auth.user.userId, true));
          dispatch(
            getUserFriends(getState().selectedProfile.userProfile.userProfileId)
          );
          if (!deletingInvitation) {
            dispatch(showNotification('success', 'Usunięto ze znajomych'));
          } else {
            dispatch(
              showNotification('success', 'Usunięto zaproszenie do przyjaciół')
            );
          }
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
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
