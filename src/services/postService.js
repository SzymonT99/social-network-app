import { endpoints } from './endpoints/endpoints';
import authorization from './authorization';

const createPost = (formData) => {
  return fetch(endpoints.createPost, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: formData,
  });
};

const likePost = (postId) => {
  return fetch(endpoints.likePost.replace('{postId}', postId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const dislikePost = (postId) => {
  return fetch(endpoints.dislikePost.replace('{postId}', postId), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

export default {
  createPost,
  likePost,
  dislikePost,
};
