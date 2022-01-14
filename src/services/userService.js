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

export default {
  getUserProfile,
};
