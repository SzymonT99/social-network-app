import activityTypes from '../types/activityBoardTypes';

const initialState = {
  userActivity: [],
};

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case activityTypes.FETCH_SUCCESS:
      return {
        ...state,
        userActivity: action.payload.userActivity,
      };
    default:
      return state;
  }
};

export default activityReducer;
