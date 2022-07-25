import types from '../types/notificationTypes';

export const showNotification = (variant, message) => ({
  type: types.SHOW_NOTIFICATION,
  payload: {
    variant,
    message,
  },
});

export const closeNotification = () => ({
  type: types.CLOSE_NOTIFICATION,
});
