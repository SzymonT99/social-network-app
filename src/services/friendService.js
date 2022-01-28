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

const getFriendsInvitation = (userId) => {
  return fetch(
    endpoints.friendInvitations +
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

const respondToFriendInvitation = (inviterId, reaction) => {
  return fetch(
    endpoints.respondInvitation +
      '?' +
      new URLSearchParams({
        inviterId: inviterId,
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

const deleteFriend = (friendId) => {
  return fetch(endpoints.deleteFriend.replace('{friendId}', friendId), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
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
  getFriendsInvitation,
  respondToFriendInvitation,
  deleteFriend,
  getUserFriends,
};
