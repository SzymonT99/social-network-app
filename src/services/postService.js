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

const editPost = (postId, formData) => {
  return fetch(endpoints.managePost.replace('{postId}', postId), {
    method: 'PUT',
    headers: {
      Authorization: authorization(),
    },
    body: formData,
  });
};

const deletePost = (postId) => {
  return fetch(endpoints.managePost.replace('{postId}', postId) + '/archive', {
    method: 'DELETE',
    headers: {
      Authorization: authorization(),
    },
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

const commentPost = (postId, comment) => {
  return fetch(endpoints.commentPost.replace('{postId}', postId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: JSON.stringify({ commentText: comment }),
  });
};

const editPostComment = (commentId, comment) => {
  return fetch(endpoints.manageComment.replace('{commentId}', commentId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: JSON.stringify({ commentText: comment }),
  });
};

const deletePostComment = (commentId) => {
  return fetch(endpoints.manageComment.replace('{commentId}', commentId), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const likePostComment = (commentId) => {
  return fetch(endpoints.likePostComment.replace('{commentId}', commentId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const dislikePostComment = (commentId) => {
  return fetch(endpoints.dislikePostComment.replace('{commentId}', commentId), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const managePostCommentsAccess = (postId, isBlocked) => {
  return fetch(
    endpoints.postCommentsAccess.replace('{postId}', postId) + isBlocked,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const managePostAccess = (postId, isPublic) => {
  return fetch(endpoints.postAccess.replace('{postId}', postId) + isPublic, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const sharePost = (basePostId, outerPost) => {
  return fetch(endpoints.sharePost.replace('{basePostId}', basePostId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: JSON.stringify(outerPost),
  });
};

const deleteSharedPost = (sharedPostId) => {
  return fetch(
    endpoints.deleteSharedPost.replace('{sharedPostId}', sharedPostId),
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

export default {
  createPost,
  editPost,
  deletePost,
  likePost,
  dislikePost,
  commentPost,
  editPostComment,
  deletePostComment,
  likePostComment,
  dislikePostComment,
  managePostCommentsAccess,
  managePostAccess,
  sharePost,
  deleteSharedPost,
};
