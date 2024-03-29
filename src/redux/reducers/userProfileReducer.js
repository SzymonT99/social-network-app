import types from '../types/userProfileTypes';

const initialState = {
  userProfile: null,
  userActivity: null,
  userFavourites: [],
  userGroups: [],
  possibleInterests: [],
  userInterests: [],
  images: [],
  friends: [],
  friendInvitations: [],
  selectedProfileNavIndex: 0,
};

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload.userProfile,
      };
    case types.FETCH_USER_ACTIVITY:
      return {
        ...state,
        userActivity: action.payload.userActivity,
      };
    case types.SET_PROFILE_NAV_INDEX:
      return {
        ...state,
        selectedProfileNavIndex: action.payload.index,
      };
    case types.FETCH_USER_FAVOURITES:
      return {
        ...state,
        userFavourites: action.payload.userFavourites,
      };
    case types.FETCH_USER_GROUPS:
      return {
        ...state,
        userGroups: action.payload.userGroups,
      };
    case types.FETCH_POSSIBLE_INTERESTS:
      return {
        ...state,
        possibleInterests: action.payload.possibleInterests,
      };
    case types.FETCH_USER_INTERESTS:
      return {
        ...state,
        userInterests: action.payload.userInterests,
      };
    case types.FETCH_USER_IMAGES:
      return {
        ...state,
        images: action.payload.images,
      };
    case types.FETCH_LOGGED_USER_FRIENDS:
      return {
        ...state,
        friends: action.payload.friends,
      };
    case types.FETCH_USER_FRIENDS_INVITATION:
      return {
        ...state,
        friendInvitations: action.payload.friendInvitations,
      };
    case types.CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
};

export default userProfileReducer;
