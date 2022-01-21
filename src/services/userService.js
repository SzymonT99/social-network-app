import { endpoints } from './endpoints/endpoints';
import authorization from './authorization';

const getUserProfile = (userId) => {
  return fetch(endpoints.userProfile.replace('{userId}', userId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const getUserActivity = (userId) => {
  return fetch(endpoints.userActivity.replace('{userId}', userId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

export default {
  getUserProfile,
  getUserActivity,
};
