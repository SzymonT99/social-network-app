import types from '../types/userProfileTypes';

const initialState = {
  userProfile: null,
  userActivity: null,
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
    case types.CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
};

export default userProfileReducer;
