import types from '../types/navTypes';

const initialState = {
  currentPath: '',
  pathIndex: 0,
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PATH:
      return {
        ...state,
        currentPath: action.payload.path,
        pathIndex: action.payload.index,
      };
    default:
      return state;
  }
};

export default navReducer;
