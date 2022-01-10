import { endpoints } from './endpoints/endpoints';
import authorization from './authorization';

const createPost = (formData) => {
  return fetch(endpoints.createPost, {
    method: 'POST',
    headers: {
      Authorization: authorization(),
    },
    body: formData,
  });
};

export default {
  createPost,
};
