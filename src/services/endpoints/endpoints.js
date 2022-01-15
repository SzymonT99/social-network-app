const baseUrl = 'http://localhost:8080';

export const endpoints = {
  authenticate: baseUrl + '/api/auth/login',
  userProfile: baseUrl + '/api/profile/{userId}/information',
  register: baseUrl + '/api/auth/register',
  createPost: baseUrl + '/api/posts',
  getActivityBoard: baseUrl + '/api/activity',
  likePost: baseUrl + '/api/posts/{postId}/like',
  dislikePost: baseUrl + '/api/posts/{postId}/liked',
  commentPost: baseUrl + '/api/posts/{postId}/comments',
  editComment: baseUrl + '/api/posts/comments/{commentId}',
};
