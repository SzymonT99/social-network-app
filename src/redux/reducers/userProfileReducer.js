import types from '../types/userProfileTypes';

const initialState = {
  userProfile: null,
};

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    case types.CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
};

export default userProfileReducer;
