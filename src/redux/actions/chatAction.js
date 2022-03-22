import { showNotification } from './notificationActions';
import chatService from '../../services/chatService';
import eventTypes from '../types/eventTypes';
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
