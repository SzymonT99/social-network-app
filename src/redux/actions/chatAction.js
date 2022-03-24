import { showNotification } from './notificationActions';
import chatService from '../../services/chatService';
import chatTypes from '../types/chatTypes';

export const createChat = (chatFormData) => (dispatch) => {
  return chatService
    .createChat(chatFormData)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getUserChats());
        dispatch(showNotification('success', 'Utworzono czat'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Błędny format danych'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getPrivateChat = (userFriendId) => (dispatch) => {
  return chatService
    .getPrivateChat(userFriendId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch(setActiveChat(data.chatId));
          return data;
        });
      } else if (response.status === 404) {
        dispatch(showNotification('warning', 'Nie znaleziono użytkownika'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editChat = (chatId, chatFormData) => (dispatch) => {
  return chatService
    .editChat(chatId, chatFormData)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserChats());
        dispatch(showNotification('success', 'Edytowano czat'));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Zabroniona akcja'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Błędny format danych'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteChat = (chatId) => (dispatch) => {
  return chatService
    .deleteChat(chatId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserChats());
        dispatch(showNotification('success', 'Usunięto czat'));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Zabroniona akcja'));
      } else if (response.status === 400) {
        dispatch(showNotification('warning', 'Błędny format danych'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserChats = () => (dispatch, getState) => {
  return chatService
    .getUserChats(getState().auth.user.userId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: chatTypes.FETCH_USER_CHATS,
            payload: {
              userChats: data,
            },
          });
          return data;
        });
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getChatDetails = (chatId) => (dispatch) => {
  return chatService
    .getChatDetails(chatId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: chatTypes.FETCH_CHAT_DETAILS,
            payload: {
              chatDetails: data,
            },
          });
          return data;
        });
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getChatMessageById = (messageId) => (dispatch) => {
  return chatService
    .getChatMessageById(messageId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: chatTypes.ADD_NEW_MESSAGE,
            payload: {
              newMessage: data,
            },
          });
          return data;
        });
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editChatMessage =
  (messageId, formData) => (dispatch, getState) => {
    return chatService
      .editChatMessage(messageId, formData)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getChatDetails(getState().chats.chatDetails.chatId));
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const deleteChatMessage = (messageId) => (dispatch) => {
  return chatService
    .deleteChatMessage(messageId)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: chatTypes.DELETE_MESSAGE,
          payload: {
            messageId: messageId,
          },
        });
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Zabroniona akcja'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addUserToChat = (chatId, userId) => (dispatch) => {
  return chatService
    .addUserToChat(chatId, userId)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getUserChats());
        dispatch(getChatDetails(chatId));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Zabroniona akcja'));
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const setChatMemberPermission =
  (chatId, chatMemberId, canAddMembers) => (dispatch) => {
    return chatService
      .setChatMemberPermission(chatId, chatMemberId, canAddMembers)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getUserChats());
          dispatch({
            type: chatTypes.CHANGE_MEMBER_PERMISSION,
            payload: {
              chatMemberId: chatMemberId,
              canAddMembers: canAddMembers,
            },
          });
        } else if (response.status === 403) {
          dispatch(showNotification('warning', 'Zabroniona akcja'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const deleteMemberFromChat = (chatMemberId) => (dispatch) => {
  return chatService
    .deleteMemberFromChat(chatMemberId)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getUserChats());
        dispatch({
          type: chatTypes.DELETE_MEMBER,
          payload: {
            chatMemberId: chatMemberId,
          },
        });
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const setActiveChat = (chatId) => ({
  type: chatTypes.SET_ACTIVE_CHAT,
  payload: {
    chatId,
  },
});
