const baseUrl = 'http://localhost:8080';

export const endpoints = {
  authenticate: baseUrl + '/api/auth/login',
  userProfile: baseUrl + '/api/profile/{userId}/information',
  register: baseUrl + '/api/auth/register',
};
