import { endpoints } from './endpoints/endpoints';
import authorization from './authorization';

const createChat = (formData) => {
  return fetch(endpoints.chat, {
    method: 'POST',
    headers: {
      Authorization: authorization(),
    },
    body: formData,
  });
};

const editChat = (chatId, formData) => {
  return fetch(endpoints.chatDetails.replace('{chatId}', chatId), {
    method: 'PUT',
    headers: {
      Authorization: authorization(),
    },
    body: formData,
  });
};

const deleteChat = (chatId) => {
  return fetch(endpoints.chatDetails.replace('{chatId}', chatId), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const getUserChats = (userId) => {
  return fetch(
    endpoints.chat +
      '?' +
      new URLSearchParams({
        userId: userId,
      }),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization(),
      },
    }
  );
};

const getChatDetails = (chatId) => {
  return fetch(endpoints.chatDetails.replace('{chatId}', chatId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

const getChatMessageById = (messageId) => {
  return fetch(endpoints.chatMessage.replace('{messageId}', messageId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization(),
    },
  });
};

export default {
  createChat,
  editChat,
  deleteChat,
  getUserChats,
  getChatDetails,
  getChatMessageById,
};
