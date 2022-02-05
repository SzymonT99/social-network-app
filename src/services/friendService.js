import { endpoints } from './endpoints/endpoints';
import authorization from './authorization';

const inviteToFriend = (inviterUserId) => {
  return fetch(
    endpoints.friendInvitations +
      '?' +
      new URLSearchParams({
        userId: inviterUserId,
      }),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const getFriendInvitations = (userId, isDisplayed) => {
  return fetch(
    endpoints.friendInvitations +
      '?' +
      new URLSearchParams({
        userId: userId,
        isDisplayed: isDisplayed,
      }),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const respondToFriendInvitation = (inviterId, reaction) => {
  return fetch(
    endpoints.respondInvitation.replace('{inviterId}', inviterId) +
      '?' +
      new URLSearchParams({
        reaction: reaction,
      }),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const deleteFriend = (friendId, isDeletedInvitation) => {
  return fetch(
    endpoints.deleteFriend.replace('{friendId}', friendId) +
      '?' +
      new URLSearchParams({
        isDeletedInvitation: isDeletedInvitation,
      }),
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const getUserFriends = (userId) => {
  return fetch(
    endpoints.userFriends +
      '?' +
      new URLSearchParams({
        userId: userId,
      }),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

export default {
  inviteToFriend,
  getFriendInvitations,
  respondToFriendInvitation,
  deleteFriend,
  getUserFriends,
};
