import { endpoints } from './endpoints/endpoints';

const register = (accountData) => {
  return fetch(endpoints.authenticate, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accountData }),
  });
};

const authenticate = (login, password) => {
  return fetch(endpoints.authenticate, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
  });
};

export default {
  register,
  authenticate,
};
