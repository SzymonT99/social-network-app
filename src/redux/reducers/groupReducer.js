import groupTypes from '../types/groupTypes';

const initialState = {
  publicGroups: [],
  groupDetails: null,
  groupInvitations: [],
  userGroupJoinRequests: [],
  currentGroupPosts: [],
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case groupTypes.FETCH_GROUPS:
      return {
        ...state,
        publicGroups: action.payload.publicGroups,
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
    default:
      return state;
  }
};

export default groupReducer;