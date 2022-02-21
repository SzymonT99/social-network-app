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

const editUserEmail = (userId, oldEmail, newEmail, password) => {
  return fetch(endpoints.changeEmail.replace('{userId}', userId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: JSON.stringify({ oldEmail, newEmail, password }),
  });
};

const editUsername = (userId, oldUsername, newUsername, password) => {
  return fetch(endpoints.changeUsername.replace('{userId}', userId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: JSON.stringify({ oldUsername, newUsername, password }),
  });
};

const editPhoneNumber = (userId, oldPhoneNumber, newPhoneNumber, password) => {
  return fetch(endpoints.changePhoneNumber.replace('{userId}', userId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: JSON.stringify({ oldPhoneNumber, newPhoneNumber, password }),
  });
};

const changePassword = (
  userId,
  oldPassword,
  newPassword,
  repeatedNewPassword
) => {
  return fetch(endpoints.changePassword.replace('{userId}', userId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: JSON.stringify({ oldPassword, newPassword, repeatedNewPassword }),
  });
};

const deleteUserAccount = (login, password) => {
  return fetch(endpoints.deleteUser, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
    body: JSON.stringify({ login, password }),
  });
};

const activateAccount = (token) => {
  return fetch(
    endpoints.activateAccount +
      '?' +
      new URLSearchParams({
        token: token,
      }),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

const resendActivationLink = (email) => {
  return fetch(
    endpoints.resendActivationLink +
      '?' +
      new URLSearchParams({
        userEmail: email,
      }),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

const forgetUserPassword = (email) => {
  return fetch(
    endpoints.forgetPassword +
      '?' +
      new URLSearchParams({
        userEmail: email,
      }),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

const resetUserPassword = (token, login, newPassword, repeatedNewPassword) => {
  return fetch(
    endpoints.forgetPassword +
      '?' +
      new URLSearchParams({
        token: token,
      }),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, newPassword, repeatedNewPassword }),
    }
  );
};

export default {
  register,
  authenticate,
  logout,
  editUserEmail,
  editPhoneNumber,
  editUsername,
  changePassword,
  deleteUserAccount,
  activateAccount,
  resendActivationLink,
  forgetUserPassword,
  resetUserPassword,
};
