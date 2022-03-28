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

const getPrivateChat = (userFriendId) => {
  return fetch(
    endpoints.privateChat +
      '?' +
      new URLSearchParams({
        userFriendId: userFriendId,
      }),
    {
      method: 'GET',
      headers: {
        Authorization: authorization(),
      },
    }
  );
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

const editChatMessage = (messageId, formData) => {
  return fetch(endpoints.chatMessage.replace('{messageId}', messageId), {
    method: 'PUT',
    headers: {
      Authorization: authorization(),
    },
    body: formData,
  });
};

const deleteChatMessage = (messageId) => {
  return fetch(endpoints.chatMessage.replace('{messageId}', messageId), {
    method: 'DELETE',
    headers: {
      Authorization: authorization(),
    },
  });
};

const addUserToChat = (chatId, userId) => {
  return fetch(
    endpoints.addChatMember.replace('{chatId}', chatId) +
      '?' +
      new URLSearchParams({
        userId: userId,
      }),
    {
      method: 'POST',
      headers: {
        Authorization: authorization(),
      },
    }
  );
};

const setChatMemberPermission = (chatId, chatMemberId, canAddMembers) => {
  return fetch(
    endpoints.chatMemberPermission.replace('{chatId}', chatId) +
      '?' +
      new URLSearchParams({
        chatMemberId: chatMemberId,
        canAddMembers: canAddMembers,
      }),
    {
      method: 'PUT',
      headers: {
        Authorization: authorization(),
      },
    }
  );
};

const deleteMemberFromChat = (chatMemberId) => {
  return fetch(endpoints.chatMember.replace('{chatMemberId}', chatMemberId), {
    method: 'DELETE',
    headers: {
      Authorization: authorization(),
    },
  });
};

const uploadChatImages = (chatId, formData) => {
  return fetch(endpoints.chatImages.replace('{chatId}', chatId), {
    method: 'POST',
    headers: {
      Authorization: authorization(),
    },
    body: formData,
  });
};

const getChatImages = (chatId) => {
  return fetch(endpoints.chatImages.replace('{chatId}', chatId), {
    method: 'GET',
    headers: {
      Authorization: authorization(),
    },
  });
};

export default {
  createChat,
  getPrivateChat,
  editChat,
  deleteChat,
  getUserChats,
  getChatDetails,
  getChatMessageById,
  editChatMessage,
  deleteChatMessage,
  addUserToChat,
  setChatMemberPermission,
  deleteMemberFromChat,
  uploadChatImages,
  getChatImages,
};
