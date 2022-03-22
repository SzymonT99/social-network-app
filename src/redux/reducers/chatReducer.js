import chatTypes from '../types/chatTypes';

const initialState = {
  userChats: [],
  chatDetails: {},
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case chatTypes.FETCH_USER_CHATS:
      return {
        ...state,
        userChats: action.payload.userChats,
      };
    case chatTypes.FETCH_CHAT_DETAILS:
      return {
        ...state,
        chatDetails: action.payload.chatDetails,
      };
    case chatTypes.ADD_NEW_MESSAGE:
      return {
        ...state,
        chatDetails: {
          ...state.chatDetails,
          messages: [...state.chatDetails.messages, action.payload.newMessage],
        },
      };
    default:
      return state;
  }
};

export default chatReducer;
