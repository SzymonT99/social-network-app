import { endpoints } from './endpoints/endpoints';
import authorization from './authorization';

const register = (accountData) => {
  return fetch(endpoints.register, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(accountData),
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

const logout = () => {
  return fetch(endpoints.logout, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

export default {
  register,
  authenticate,
  logout,
};
