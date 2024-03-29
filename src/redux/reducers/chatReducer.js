import chatTypes from '../types/chatTypes';

const initialState = {
  userChats: [],
  chatDetails: {},
  activeChat: undefined,
  selectedUserId: undefined,
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
    case chatTypes.EDIT_MESSAGE:
      return {
        ...state,
        chatDetails: {
          ...state.chatDetails,
          messages: state.chatDetails.messages.map((message) =>
            message.messageId === action.payload.messageId
              ? {
                  ...message,
                  text: action.payload.message.text,
                  isEdited: true,
                  editedAt: action.payload.message.editedAt,
                }
              : message
          ),
        },
      };
    case chatTypes.DELETE_MESSAGE:
      return {
        ...state,
        chatDetails: {
          ...state.chatDetails,
          messages: state.chatDetails.messages.map((message) =>
            message.messageId === action.payload.messageId
              ? {
                  ...message,
                  isDeleted: true,
                }
              : message
          ),
        },
      };
    case chatTypes.CHANGE_MEMBER_PERMISSION:
      return {
        ...state,
        chatDetails: {
          ...state.chatDetails,
          chatMembers: state.chatDetails.chatMembers.map((member) =>
            member.chatMemberId === action.payload.chatMemberId
              ? {
                  ...member,
                  canAddOthers: action.payload.canAddMembers,
                }
              : member
          ),
        },
      };
    case chatTypes.DELETE_MEMBER:
      return {
        ...state,
        chatDetails: {
          ...state.chatDetails,
          chatMembers: state.chatDetails.chatMembers.filter(
            (member) => member.chatMemberId !== action.payload.chatMemberId
          ),
        },
      };
    case chatTypes.SET_ACTIVE_CHAT:
      return {
        ...state,
        activeChat: action.payload.chatId,
      };
    case chatTypes.SET_USER_SHOWED_CHATS:
      return {
        ...state,
        selectedUserId: action.payload.selectedUserId,
      };
    case chatTypes.ADD_TYPING_MESSAGE:
      return {
        ...state,
        chatDetails: {
          ...state.chatDetails,
          messages: [
            ...state.chatDetails.messages,
            action.payload.typingMessage,
          ],
        },
      };
    case chatTypes.DELETE_TYPING_MESSAGE:
      return {
        ...state,
        chatDetails: {
          ...state.chatDetails,
          messages: state.chatDetails.messages.filter(
            (message) =>
              !(
                message.messageType === 'TYPING' &&
                message.author.userId === action.payload.userId
              )
          ),
        },
      };
    case chatTypes.UPDATE_CHAT_MEMBERS:
      return {
        ...state,
        chatDetails: {
          ...state.chatDetails,
          chatMembers: state.chatDetails.chatMembers.filter(
            (member) => member.user.userId !== action.payload.deletedUserId
          ),
        },
      };
    case chatTypes.FETCH_CHAT_IMAGES:
      return {
        ...state,
        chatDetails: {
          ...state.chatDetails,
          addedImages: action.payload.chatImages,
        },
      };
    case chatTypes.CLEAR_ALL:
      return initialState;
    case chatTypes.CLEAR_CHAT:
      return initialState;
    default:
      return state;
  }
};

export default chatReducer;
