import groupTypes from '../types/groupTypes';

const initialState = {
  publicGroups: [],
  userGroups: [],
  userInterestingGroups: [],
  groupDetails: null,
  groupInvitations: [],
  userGroupJoinRequests: [],
  currentGroupPosts: [],
  possibleInterests: [],
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case groupTypes.FETCH_GROUPS:
      return {
        ...state,
        publicGroups: action.payload.publicGroups,
      };
    case groupTypes.FETCH_USER_GROUPS:
      return {
        ...state,
        userGroups: action.payload.userGroups,
      };
    case groupTypes.FETCH_USER_INTERESTING_GROUPS:
      return {
        ...state,
        userInterestingGroups: action.payload.userInterestingGroups,
      };
    case groupTypes.FETCH_GROUP_DETAILS:
      return {
        ...state,
        groupDetails: action.payload.groupDetails,
      };
    case groupTypes.FETCH_GROUP_INVITATIONS:
      return {
        ...state,
        groupInvitations: action.payload.groupInvitations,
      };
    case groupTypes.FETCH_USER_GROUP_JOIN_REQUESTS:
      return {
        ...state,
        userGroupJoinRequests: action.payload.userGroupJoinRequests,
      };
    case groupTypes.FETCH_GROUP_POSTS:
      return {
        ...state,
        currentGroupPosts: action.payload.currentGroupPosts,
      };
    case groupTypes.FETCH_POSSIBLE_INTERESTS:
      return {
        ...state,
        possibleInterests: action.payload.possibleInterests,
      };
    default:
      return state;
  }
};

export default groupReducer;
