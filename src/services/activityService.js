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

export default {
  getActivityBoard,
};
