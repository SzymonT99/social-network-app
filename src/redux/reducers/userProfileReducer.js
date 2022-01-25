import types from '../types/userProfileTypes';

const initialState = {
  userProfile: null,
  userActivity: null,
  userFavourites: [],
  possibleInterests: [],
  userInterests: [],
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
    case types.FETCH_USER_FAVOURITES:
      return {
        ...state,
        userFavourites: action.payload.userFavourites,
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
    case types.CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
};

export default userProfileReducer;
