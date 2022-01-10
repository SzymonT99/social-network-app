import types from '../types/postTypes';

const initialState = {
  posts: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    default:
      return state;
  }
};

export default postReducer;
