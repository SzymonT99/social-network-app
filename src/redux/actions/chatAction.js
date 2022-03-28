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
        dispatch(getChatDetails(chatId));
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
        dispatch(setActiveChat(undefined));
        window.location.reload();
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
          dispatch(getUserChats());
          dispatch(getChatImages(chatId));
          dispatch({
            type: chatTypes.FETCH_CHAT_DETAILS,
            payload: {
              chatDetails: data,
            },
          });
          return data;
        });
      } else if (response.status === 404) {
        dispatch(setActiveChat(undefined));
        window.location.reload();
      } else {
        dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getChatMessageById =
  (messageId, edition = false) =>
  (dispatch, getState) => {
    return chatService
      .getChatMessageById(messageId)
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => {
            if (
              getState().chats.chatDetails.messages.filter(
                (message) =>
                  message.messageType === 'TYPING' &&
                  message.author.userId === data.author.userId
              ).length !== 0
            ) {
              dispatch({
                type: chatTypes.DELETE_TYPING_MESSAGE,
                payload: {
                  userId: data.author.userId,
                },
              });
            }

            if (
              getState().chats.chatDetails.messages.filter(
                (message) => message.messageId === messageId
              ).length !== 0 &&
              edition
            ) {
              dispatch({
                type: chatTypes.EDIT_MESSAGE,
                payload: {
                  messageId: messageId,
                  message: data,
                },
              });
            } else {
              dispatch({
                type: chatTypes.ADD_NEW_MESSAGE,
                payload: {
                  newMessage: data,
                },
              });
            }

            if (data.messageType === 'LEAVE') {
              dispatch({
                type: chatTypes.UPDATE_CHAT_MEMBERS,
                payload: {
                  deletedUserId: data.author.userId,
                },
              });
            }

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
        dispatch(showNotification('success', 'Usunięto wiadomość'));
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
        dispatch(showNotification('success', 'Dodano do czatu'));
      } else if (response.status === 403) {
        dispatch(showNotification('warning', 'Zabroniona akcja'));
      } else if (response.status === 409) {
        dispatch(showNotification('warning', 'Użytkownik już należy do czatu'));
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
          dispatch(getChatDetails(chatId));
          dispatch({
            type: chatTypes.CHANGE_MEMBER_PERMISSION,
            payload: {
              chatMemberId: chatMemberId,
              canAddMembers: canAddMembers,
            },
          });
          dispatch(showNotification('success', 'Zmieniono uprawnienie'));
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

export const deleteMemberFromChat =
  (chatMemberId, isDeletedByAdmin) => (dispatch) => {
    return chatService
      .deleteMemberFromChat(chatMemberId)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: chatTypes.DELETE_MEMBER,
            payload: {
              chatMemberId: chatMemberId,
            },
          });
          if (isDeletedByAdmin) {
            dispatch(showNotification('success', 'Usunięto członka czatu'));
          } else {
            dispatch(showNotification('success', 'Opuszczono czat'));
            dispatch(getUserChats()).then((data) => {
              dispatch(getChatDetails(data[0].chatId));
            });
          }
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const setChatMemberChatNotifications =
  (chatMemberId, isChatMuted) => (dispatch) => {
    return chatService
      .setChatMemberChatNotifications(chatMemberId, isChatMuted)
      .then((response) => {
        if (response.status === 200) {
          if (isChatMuted) {
            dispatch(
              showNotification('success', 'Wyłączono powiadomienia czatu')
            );
          } else {
            dispatch(
              showNotification('success', 'Włączono powiadomienia czatu')
            );
          }
        } else if (response.status === 404) {
          dispatch(showNotification('warning', 'Nie znaleziono członka czatu'));
        } else {
          dispatch(showNotification('error', 'Błąd połączenia z serwerem'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const uploadChatImages = (chatId, formData) => (dispatch) => {
  return chatService
    .uploadChatImages(chatId, formData)
    .then((response) => {
      if (response.status === 201) {
        dispatch(getChatImages(chatId));
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

export const getChatImages = (chatId) => (dispatch) => {
  return chatService
    .getChatImages(chatId)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          dispatch({
            type: chatTypes.FETCH_CHAT_IMAGES,
            payload: {
              chatImages: data,
            },
          });
          return data;
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

export const setActiveChat = (chatId) => ({
  type: chatTypes.SET_ACTIVE_CHAT,
  payload: {
    chatId,
  },
});

export const addTypingMessage = (typingMessage) => (dispatch, getState) => {
  if (
    getState().chats.chatDetails.messages.filter(
      (message) =>
        message.messageType === 'TYPING' &&
        message.author.userId === typingMessage.author.userId
    ).length === 0
  ) {
    dispatch({
      type: chatTypes.ADD_TYPING_MESSAGE,
      payload: {
        typingMessage,
      },
    });
  } else if (
    getState().chats.chatDetails.messages.filter(
      (message) =>
        message.messageType === 'TYPING' &&
        message.author.userId === typingMessage.author.userId
    ).length !== 0 &&
    typingMessage.text === ''
  ) {
    dispatch({
      type: chatTypes.DELETE_TYPING_MESSAGE,
      payload: {
        userId: typingMessage.author.userId,
      },
    });
  }
};
