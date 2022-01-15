import activityTypes from '../types/userActivityTypes';
import postTypes from '../types/postTypes';

const initialState = {
  board: [],
};

const userActivityReducer = (state = initialState, action) => {
  switch (action.type) {
    case activityTypes.FETCH_BOARD_SUCCESS:
      return {
        ...state,
        board: action.payload.board,
      };
    case postTypes.CREATE_POST:
      return {
        ...state,
        board: [action.payload.activity, ...state.board],
      };
    case postTypes.LIKE_POST:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'CREATE_POST' &&
          boardItem.activity.postId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  likes: [...boardItem.activity.likes, action.payload.liked],
                },
              }
            : boardItem
        ),
      };
    case postTypes.DISLIKE_POST:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'CREATE_POST' &&
          boardItem.activity.postId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  likes: boardItem.activity.likes.filter(
                    (liked) => liked.likedUser.userId !== action.payload.userId
                  ),
                },
              }
            : boardItem
        ),
      };
    case postTypes.COMMENT_POST:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'CREATE_POST' &&
          boardItem.activity.postId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  comments: [
                    action.payload.comment,
                    ...boardItem.activity.comments,
                  ],
                },
              }
            : boardItem
        ),
      };
    case activityTypes.CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
};

export default userActivityReducer;
