import { endpoints } from './endpoints/endpoints';
import authorization from './authorization';

const getActivityBoard = () => {
  return fetch(endpoints.getActivityBoard, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const getAllUsers = () => {
  return fetch(endpoints.allUsers, {
    method: 'GET',
  });
};

const getActivityNotifications = (isDisplayed) => {
  return fetch(
    endpoints.userActivityNotifications +
      '?' +
      new URLSearchParams({
        isDisplayed: isDisplayed,
      }),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

export default {
  getActivityBoard,
  getAllUsers,
  getActivityNotifications,
};
