import groupTypes from '../types/groupTypes';

const initialState = {
  publicGroups: [],
  userInterestingGroups: [],
  groupDetails: null,
  groupInvitations: [],
  userGroupJoinRequests: [],
  possibleInterests: [],
  groupForum: {},
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case groupTypes.FETCH_GROUPS:
      return {
        ...state,
        publicGroups: action.payload.publicGroups,
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
    case groupTypes.FETCH_POSSIBLE_INTERESTS:
      return {
        ...state,
        possibleInterests: action.payload.possibleInterests,
      };
    case groupTypes.FETCH_GROUP_FORUM:
      return {
        ...state,
        groupForum: {
          ...state.groupForum,
          threads: action.payload.forumThreads,
        },
      };
    case groupTypes.FETCH_GROUP_FORUM_STATS:
      return {
        ...state,
        groupForum: {
          ...state.groupForum,
          stats: action.payload.forumStats,
        },
      };
    case groupTypes.CLEAR_GROUP_DETAILS:
      return {
        ...state,
        groupDetails: [],
      };
    case groupTypes.CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
};

export default groupReducer;
