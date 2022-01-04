import types from '../types/notificationTypes';

const initialState = {
  visible: false,
  variant: 'none',
  message: '',
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_NOTIFICATION:
      return {
        ...state,
        visible: true,
        variant: action.payload.variant,
        message: action.payload.message,
      };
    case types.CLOSE_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;
