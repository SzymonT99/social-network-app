import friendTypes from '../types/friendTypes';

const initialState = {
  friendsSuggestions: [],
};

const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case friendTypes.FETCH_USER_FRIEND_SUGGESTIONS:
      return {
        ...state,
        friendsSuggestions: action.payload.friendsSuggestions,
      };
    default:
      return state;
  }
};

export default friendReducer;
