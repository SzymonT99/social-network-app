import friendTypes from '../types/friendTypes';

const initialState = {
  friendsSuggestions: [],
  userFriends: [],
  receivedFriendInvitations: [],
  sentFriendInvitations: [],
};

const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case friendTypes.FETCH_USER_FRIENDS_SUGGESTIONS:
      return {
        ...state,
        friendsSuggestions: action.payload.friendsSuggestions,
      };
    case friendTypes.FETCH_LOGGED_USER_FRIENDS:
      return {
        ...state,
        userFriends: action.payload.userFriends,
      };
    case friendTypes.FETCH_LOGGED_USER_RECEIVED_FRIEND_INVITATIONS:
      return {
        ...state,
        receivedFriendInvitations: action.payload.receivedFriendInvitations,
      };
    case friendTypes.FETCH_LOGGED_USER_SENT_FRIEND_INVITATIONS:
      return {
        ...state,
        sentFriendInvitations: action.payload.sentFriendInvitations,
      };
    default:
      return state;
  }
};

export default friendReducer;
