import { endpoints } from './endpoints/endpoints';
import authorization from './authorization';

const inviteToFriend = (inviterUserId) => {
  return fetch(
    endpoints.inviteFriend +
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

const getReceivedFriendInvitations = (userId, isDisplayed) => {
  return fetch(
    endpoints.receivedFriendInvitations +
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

const getSentFriendInvitations = (userId) => {
  return fetch(
    endpoints.sentFriendInvitations +
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

const getUserFriendsSuggestions = () => {
  return fetch(endpoints.userFriendsSuggestions, {
    method: 'GET',
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
  getSentFriendInvitations,
  getReceivedFriendInvitations,
  respondToFriendInvitation,
  deleteFriend,
  getUserFriendsSuggestions,
  getUserFriends,
};
