import eventTypes from '../types/eventTypes';

const initialState = {
  allEvents: [],
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case eventTypes.FETCH_EVENTS:
      return {
        ...state,
        allEvents: action.payload.allEvents,
      };
    case eventTypes.CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
};

export default eventReducer;
