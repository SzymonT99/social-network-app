import types from '../types/navTypes';

export const setCurrentPath = (path, index) => ({
  type: types.SET_PATH,
  payload: {
    path,
    index,
  },
});
