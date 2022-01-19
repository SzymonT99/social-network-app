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
        board: [action.payload.boardItem, ...state.board],
      };
    case postTypes.EDIT_POST:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'CREATE_POST' &&
          boardItem.activity.postId === action.payload.postId
            ? {
                ...boardItem,
                activity: action.payload.updatedPost,
              }
            : boardItem
        ),
      };
    case postTypes.DELETE_POST:
      return {
        ...state,
        board: state.board.filter(
          (boardItem) => boardItem.activity.postId !== action.payload.postId
        ),
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
    case postTypes.EDIT_POST_COMMENT:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'CREATE_POST' &&
          boardItem.activity.postId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  comments: boardItem.activity.comments.map((comment) =>
                    comment.commentId === action.payload.commentId
                      ? {
                          ...comment,
                          text: action.payload.comment,
                          isEdited: true,
                        }
                      : comment
                  ),
                },
              }
            : boardItem
        ),
      };
    case postTypes.DELETE_POST_COMMENT:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'CREATE_POST' &&
          boardItem.activity.postId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  comments: boardItem.activity.comments.filter(
                    (comment) => comment.commentId !== action.payload.commentId
                  ),
                },
              }
            : boardItem
        ),
      };
    case postTypes.LIKE_POST_COMMENT:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'CREATE_POST' &&
          boardItem.activity.postId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  comments: boardItem.activity.comments.map((comment) =>
                    comment.commentId === action.payload.commentId
                      ? {
                          ...comment,
                          userLikes: [
                            ...comment.userLikes,
                            action.payload.likedUser,
                          ],
                        }
                      : comment
                  ),
                },
              }
            : boardItem
        ),
      };
    case postTypes.DISLIKE_POST_COMMENT:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'CREATE_POST' &&
          boardItem.activity.postId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  comments: boardItem.activity.comments.map((comment) =>
                    comment.commentId === action.payload.commentId
                      ? {
                          ...comment,
                          userLikes: comment.userLikes.filter(
                            (userLiked) =>
                              userLiked.userId !== action.payload.userId
                          ),
                        }
                      : comment
                  ),
                },
              }
            : boardItem
        ),
      };
    case postTypes.POST_ACCESS:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'CREATE_POST' &&
          boardItem.activity.postId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  isPublic: action.payload.isPublic,
                },
              }
            : boardItem
        ),
      };
    case postTypes.POST_COMMENTS_ACCESS:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'CREATE_POST' &&
          boardItem.activity.postId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  isCommentingBlocked: action.payload.isCommentingBlocked,
                },
              }
            : boardItem
        ),
      };
    case postTypes.SHARE_POST:
      return {
        ...state,
        board: [action.payload.boardItem, ...state.board],
      };
    case postTypes.UPDATE_SHARED_POST:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'CREATE_POST' &&
          boardItem.activity.postId === action.payload.basePostId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  sharing: [
                    action.payload.sharingInfo,
                    ...boardItem.activity.sharing,
                  ],
                },
              }
            : boardItem
        ),
      };
    case postTypes.LIKE_SHARED_POST:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'SHARE_POST' &&
          boardItem.activity.sharingId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  sharingLikes: [
                    ...boardItem.activity.sharingLikes,
                    action.payload.liked,
                  ],
                },
              }
            : boardItem
        ),
      };
    case postTypes.DISLIKE_SHARED_POST:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'SHARE_POST' &&
          boardItem.activity.sharingId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  sharingLikes: boardItem.activity.sharingLikes.filter(
                    (liked) => liked.likedUser.userId !== action.payload.userId
                  ),
                },
              }
            : boardItem
        ),
      };
    case postTypes.COMMENT_SHARED_POST:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'SHARE_POST' &&
          boardItem.activity.sharingId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  sharingComments: [
                    action.payload.comment,
                    ...boardItem.activity.sharingComments,
                  ],
                },
              }
            : boardItem
        ),
      };
    case postTypes.EDIT_SHARED_POST_COMMENT:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'SHARE_POST' &&
          boardItem.activity.sharingId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  sharingComments: boardItem.activity.sharingComments.map(
                    (comment) =>
                      comment.commentId === action.payload.commentId
                        ? {
                            ...comment,
                            text: action.payload.comment,
                            isEdited: true,
                          }
                        : comment
                  ),
                },
              }
            : boardItem
        ),
      };
    case postTypes.DELETE_SHARED_POST_COMMENT:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'SHARE_POST' &&
          boardItem.activity.sharingId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  sharingComments: boardItem.activity.sharingComments.filter(
                    (comment) => comment.commentId !== action.payload.commentId
                  ),
                },
              }
            : boardItem
        ),
      };
    case postTypes.LIKE_SHARED_POST_COMMENT:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'SHARE_POST' &&
          boardItem.activity.sharingId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  sharingComments: boardItem.activity.sharingComments.map(
                    (comment) =>
                      comment.commentId === action.payload.commentId
                        ? {
                            ...comment,
                            userLikes: [
                              ...comment.userLikes,
                              action.payload.likedUser,
                            ],
                          }
                        : comment
                  ),
                },
              }
            : boardItem
        ),
      };
    case postTypes.DISLIKE_SHARED_POST_COMMENT:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'SHARE_POST' &&
          boardItem.activity.sharingId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  sharingComments: boardItem.activity.sharingComments.map(
                    (comment) =>
                      comment.commentId === action.payload.commentId
                        ? {
                            ...comment,
                            userLikes: comment.userLikes.filter(
                              (userLiked) =>
                                userLiked.userId !== action.payload.userId
                            ),
                          }
                        : comment
                  ),
                },
              }
            : boardItem
        ),
      };
    case postTypes.SHARED_POST_ACCESS:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'SHARE_POST' &&
          boardItem.activity.sharingId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  isPublic: action.payload.isPublic,
                },
              }
            : boardItem
        ),
      };
    case postTypes.SHARED_POST_COMMENTS_ACCESS:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          boardItem.activityType === 'SHARE_POST' &&
          boardItem.activity.sharingId === action.payload.postId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  isCommentingBlocked: action.payload.isCommentingBlocked,
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
