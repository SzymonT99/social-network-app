import activityTypes from '../types/userActivityTypes';
import postTypes from '../types/postTypes';
import eventTypes from '../types/eventTypes';
import groupTypes from '../types/groupTypes';

const initialState = {
  isLoading: false,
  board: [],
  notifications: [],
};

const userActivityReducer = (state = initialState, action) => {
  switch (action.type) {
    case activityTypes.FETCH_BOARD_SUCCESS:
      return {
        ...state,
        board: action.payload.board,
      };
    case activityTypes.FETCH_ACTIVITY_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.activityNotifications,
      };
    case activityTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case postTypes.CREATE_POST:
      return {
        ...state,
        board: [action.payload.boardItem, ...state.board],
      };
    case postTypes.EDIT_POST:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            boardItem.activityType === 'CREATE_POST' &&
            boardItem.activity.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: action.payload.updatedPost,
            };
          } else if (
            (boardItem.activityType === 'LIKE_POST' ||
              boardItem.activityType === 'COMMENT_POST') &&
            boardItem.activity.post.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                post: action.payload.updatedPost,
              },
            };
          } else if (
            boardItem.activityType === 'SHARE_POST' &&
            boardItem.activity.sharedPost.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                sharedPost: action.payload.updatedPost,
              },
            };
          } else if (
            (boardItem.activityType === 'LIKE_SHARED_POST' ||
              boardItem.activityType === 'COMMENT_SHARED_POST') &&
            boardItem.activity.sharedPost.sharedPost.postId ===
              action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                sharedPost: {
                  ...boardItem.sharedPost,
                  sharedPost: action.payload.updatedPost,
                },
              },
            };
          } else if (
            boardItem.activityType === 'CREATE_GROUP_POST' &&
            boardItem.activity.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                text: action.payload.updatedPost.text,
                images: action.payload.updatedPost.images,
                editedAt: action.payload.updatedPost.editedAt,
                isEdited: true,
              },
            };
          } else return boardItem;
        }),
      };
    case postTypes.DELETE_POST:
      return {
        ...state,
        board: state.board.filter((boardItem) => {
          if (
            boardItem.activityType === 'CREATE_POST' ||
            boardItem.activityType === 'CREATE_GROUP_POST'
          )
            return boardItem.activity.postId !== action.payload.postId;
          else if (
            boardItem.activityType === 'LIKE_POST' ||
            boardItem.activityType === 'COMMENT_POST'
          )
            return boardItem.activity.post.postId !== action.payload.postId;
          else if (
            boardItem.activityType === 'CREATE_GROUP_POST' &&
            boardItem.activity.postId === action.payload.postId
          )
            return boardItem.activity.postId !== action.payload.postId;
          else if (
            boardItem.activityType === 'CHANGE_PROFILE_PHOTO' &&
            boardItem.activity.changePhotoPost.postId === action.payload.postId
          )
            return (
              boardItem.activity.changePhotoPost.postId !==
              action.payload.postId
            );
        }),
      };
    case postTypes.LIKE_POST:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            (boardItem.activityType === 'CREATE_POST' ||
              boardItem.activityType === 'CREATE_GROUP_POST') &&
            boardItem.activity.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                likes: [...boardItem.activity.likes, action.payload.liked],
              },
            };
          } else if (
            (boardItem.activityType === 'LIKE_POST' ||
              boardItem.activityType === 'COMMENT_POST') &&
            boardItem.activity.post.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                post: {
                  ...boardItem.activity.post,
                  likes: [
                    ...boardItem.activity.post.likes,
                    action.payload.liked,
                  ],
                },
              },
            };
          } else if (
            boardItem.activityType === 'CHANGE_PROFILE_PHOTO' &&
            boardItem.activity.changePhotoPost.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                changePhotoPost: {
                  ...boardItem.activity.changePhotoPost,
                  likes: [
                    ...boardItem.activity.changePhotoPost.likes,
                    action.payload.liked,
                  ],
                },
              },
            };
          } else return boardItem;
        }),
      };
    case postTypes.DISLIKE_POST:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            (boardItem.activityType === 'CREATE_POST' ||
              boardItem.activityType === 'CREATE_GROUP_POST') &&
            boardItem.activity.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                likes: boardItem.activity.likes.filter(
                  (liked) => liked.likedUser.userId !== action.payload.userId
                ),
              },
            };
          } else if (
            (boardItem.activityType === 'LIKE_POST' ||
              boardItem.activityType === 'COMMENT_POST') &&
            boardItem.activity.post.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                post: {
                  ...boardItem.activity.post,
                  likes: boardItem.activity.post.likes.filter(
                    (liked) => liked.likedUser.userId !== action.payload.userId
                  ),
                },
              },
            };
          } else if (
            boardItem.activityType === 'CHANGE_PROFILE_PHOTO' &&
            boardItem.activity.changePhotoPost.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                changePhotoPost: {
                  ...boardItem.activity.changePhotoPost,
                  likes: boardItem.activity.changePhotoPost.likes.filter(
                    (liked) => liked.likedUser.userId !== action.payload.userId
                  ),
                },
              },
            };
          } else {
            return boardItem;
          }
        }),
      };
    case postTypes.COMMENT_POST:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            (boardItem.activityType === 'CREATE_POST' ||
              boardItem.activityType === 'CREATE_GROUP_POST') &&
            boardItem.activity.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                comments: [
                  action.payload.comment,
                  ...boardItem.activity.comments,
                ],
              },
            };
          } else if (
            (boardItem.activityType === 'LIKE_POST' ||
              boardItem.activityType === 'COMMENT_POST') &&
            boardItem.activity.post.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                post: {
                  ...boardItem.activity.post,
                  comments: [
                    action.payload.comment,
                    ...boardItem.activity.post.comments,
                  ],
                },
              },
            };
          } else if (
            boardItem.activityType === 'CHANGE_PROFILE_PHOTO' &&
            boardItem.activity.changePhotoPost.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                changePhotoPost: {
                  ...boardItem.activity.changePhotoPost,
                  comments: [
                    action.payload.comment,
                    ...boardItem.activity.changePhotoPost.comments,
                  ],
                },
              },
            };
          } else {
            return boardItem;
          }
        }),
      };
    case postTypes.EDIT_POST_COMMENT:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            (boardItem.activityType === 'CREATE_POST' ||
              boardItem.activityType === 'CREATE_GROUP_POST') &&
            boardItem.activity.postId === action.payload.postId
          ) {
            return {
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
            };
          } else if (
            (boardItem.activityType === 'LIKE_POST' ||
              boardItem.activityType === 'COMMENT_POST') &&
            boardItem.activity.post.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                post: {
                  ...boardItem.activity.post,
                  comments: boardItem.activity.post.comments.map((comment) =>
                    comment.commentId === action.payload.commentId
                      ? {
                          ...comment,
                          text: action.payload.comment,
                          isEdited: true,
                        }
                      : comment
                  ),
                },
              },
            };
          } else if (
            boardItem.activityType === 'CHANGE_PROFILE_PHOTO' &&
            boardItem.activity.changePhotoPost.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                changePhotoPost: {
                  ...boardItem.activity.changePhotoPost,
                  comments: boardItem.activity.changePhotoPost.comments.map(
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
              },
            };
          } else {
            return boardItem;
          }
        }),
      };
    case postTypes.DELETE_POST_COMMENT:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            (boardItem.activityType === 'CREATE_POST' ||
              boardItem.activityType === 'CREATE_GROUP_POST') &&
            boardItem.activity.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                comments: boardItem.activity.comments.filter(
                  (comment) => comment.commentId !== action.payload.commentId
                ),
              },
            };
          } else if (
            (boardItem.activityType === 'LIKE_POST' ||
              boardItem.activityType === 'COMMENT_POST') &&
            boardItem.activity.post.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                post: {
                  ...boardItem.activity.post,
                  comments: boardItem.activity.post.comments.filter(
                    (comment) => comment.commentId !== action.payload.commentId
                  ),
                },
              },
            };
          } else if (
            boardItem.activityType === 'CHANGE_PROFILE_PHOTO' &&
            boardItem.activity.changePhotoPost.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                changePhotoPost: {
                  ...boardItem.activity.changePhotoPost,
                  comments: boardItem.activity.changePhotoPost.comments.filter(
                    (comment) => comment.commentId !== action.payload.commentId
                  ),
                },
              },
            };
          } else {
            return boardItem;
          }
        }),
      };
    case postTypes.LIKE_POST_COMMENT:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            (boardItem.activityType === 'CREATE_POST' ||
              boardItem.activityType === 'CREATE_GROUP_POST') &&
            boardItem.activity.postId === action.payload.postId
          ) {
            return {
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
            };
          } else if (
            (boardItem.activityType === 'LIKE_POST' ||
              boardItem.activityType === 'COMMENT_POST') &&
            boardItem.activity.post.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                post: {
                  ...boardItem.activity.post,
                  comments: boardItem.activity.post.comments.map((comment) =>
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
              },
            };
          } else if (
            boardItem.activityType === 'CHANGE_PROFILE_PHOTO' &&
            boardItem.activity.changePhotoPost.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                changePhotoPost: {
                  ...boardItem.activity.changePhotoPost,
                  comments: boardItem.activity.changePhotoPost.comments.map(
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
              },
            };
          } else {
            return boardItem;
          }
        }),
      };
    case postTypes.DISLIKE_POST_COMMENT:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            (boardItem.activityType === 'CREATE_POST' ||
              boardItem.activityType === 'CREATE_GROUP_POST') &&
            boardItem.activity.postId === action.payload.postId
          ) {
            return {
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
            };
          } else if (
            (boardItem.activityType === 'LIKE_POST' ||
              boardItem.activityType === 'COMMENT_POST') &&
            boardItem.activity.post.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                post: {
                  ...boardItem.activity.post,
                  comments: boardItem.activity.post.comments.map((comment) =>
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
              },
            };
          } else if (
            boardItem.activityType === 'CHANGE_PROFILE_PHOTO' &&
            boardItem.activity.changePhotoPost.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                changePhotoPost: {
                  ...boardItem.activity.changePhotoPost,
                  comments: boardItem.activity.changePhotoPost.comments.map(
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
              },
            };
          } else {
            return boardItem;
          }
        }),
      };
    case postTypes.POST_ACCESS:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            (boardItem.activityType === 'CREATE_POST' ||
              boardItem.activityType === 'CREATE_GROUP_POST') &&
            boardItem.activity.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                isPublic: action.payload.isPublic,
              },
            };
          } else if (
            (boardItem.activityType === 'LIKE_POST' ||
              boardItem.activityType === 'COMMENT_POST') &&
            boardItem.activity.post.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                post: {
                  ...boardItem.activity.post,
                  isPublic: action.payload.isPublic,
                },
              },
            };
          } else if (
            boardItem.activityType === 'CHANGE_PROFILE_PHOTO' &&
            boardItem.activity.changePhotoPost.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                changePhotoPost: {
                  ...boardItem.activity.changePhotoPost,
                  isPublic: action.payload.isPublic,
                },
              },
            };
          } else return boardItem;
        }),
      };
    case postTypes.POST_COMMENTS_ACCESS:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            (boardItem.activityType === 'CREATE_POST' ||
              boardItem.activityType === 'CREATE_GROUP_POST') &&
            boardItem.activity.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                isCommentingBlocked: action.payload.isCommentingBlocked,
              },
            };
          } else if (
            (boardItem.activityType === 'LIKE_POST' ||
              boardItem.activityType === 'COMMENT_POST') &&
            boardItem.activity.post.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                post: {
                  ...boardItem.activity.post,
                  isCommentingBlocked: action.payload.isCommentingBlocked,
                },
              },
            };
          } else if (
            boardItem.activityType === 'CHANGE_PROFILE_PHOTO' &&
            boardItem.activity.changePhotoPost.postId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                changePhotoPost: {
                  ...boardItem.activity.changePhotoPost,
                  isCommentingBlocked: action.payload.isCommentingBlocked,
                },
              },
            };
          } else return boardItem;
        }),
      };
    case postTypes.SHARE_POST:
      return {
        ...state,
        board: [action.payload.boardItem, ...state.board],
      };
    case postTypes.DELETE_SHARED_POST:
      return {
        ...state,
        board: state.board.filter((boardItem) => {
          if (boardItem.activityType === 'SHARE_POST') {
            return (
              boardItem.activity.sharedPostId !== action.payload.sharedPostId
            );
          } else if (
            boardItem.activityType === 'LIKE_SHARED_POST' ||
            boardItem.activityType === 'COMMENT_SHARED_POST'
          ) {
            return (
              boardItem.activity.sharedPost.sharedPostId !==
              action.payload.sharedPostId
            );
          } else return boardItem;
        }),
      };
    case postTypes.UPDATE_SHARED_POST:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          (boardItem.activityType === 'CREATE_POST' ||
            boardItem.activityType === 'CREATE_GROUP_POST') &&
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
    case postTypes.UPDATE_DELETED_SHARED_POST:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          (boardItem.activityType === 'CREATE_POST' ||
            boardItem.activityType === 'CREATE_GROUP_POST') &&
          boardItem.activity.postId === action.payload.basePostId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  sharing: boardItem.activity.sharing.filter(
                    (share) =>
                      share.sharedPostId !== action.payload.sharedPostId
                  ),
                },
              }
            : boardItem
        ),
      };
    case postTypes.LIKE_SHARED_POST:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            boardItem.activityType === 'SHARE_POST' &&
            boardItem.activity.sharingId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                sharingLikes: [
                  ...boardItem.activity.sharingLikes,
                  action.payload.liked,
                ],
              },
            };
          } else if (
            (boardItem.activityType === 'LIKE_SHARED_POST' ||
              boardItem.activityType === 'COMMENT_SHARED_POST') &&
            boardItem.activity.sharedPost.sharingId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                sharedPost: {
                  ...boardItem.activity.sharedPost,
                  sharingLikes: [
                    ...boardItem.activity.sharedPost.sharingLikes,
                    action.payload.liked,
                  ],
                },
              },
            };
          } else return boardItem;
        }),
      };
    case postTypes.DISLIKE_SHARED_POST:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            boardItem.activityType === 'SHARE_POST' &&
            boardItem.activity.sharingId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                sharingLikes: boardItem.activity.sharingLikes.filter(
                  (liked) => liked.likedUser.userId !== action.payload.userId
                ),
              },
            };
          } else if (
            (boardItem.activityType === 'LIKE_SHARED_POST' ||
              boardItem.activityType === 'COMMENT_SHARED_POST') &&
            boardItem.activity.sharedPost.sharingId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                sharedPost: {
                  ...boardItem.activity.sharedPost,
                  sharingLikes:
                    boardItem.activity.sharedPost.sharingLikes.filter(
                      (liked) =>
                        liked.likedUser.userId !== action.payload.userId
                    ),
                },
              },
            };
          } else return boardItem;
        }),
      };
    case postTypes.COMMENT_SHARED_POST:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            boardItem.activityType === 'SHARE_POST' &&
            boardItem.activity.sharingId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                sharingComments: [
                  action.payload.comment,
                  ...boardItem.activity.sharingComments,
                ],
              },
            };
          } else if (
            (boardItem.activityType === 'LIKE_SHARED_POST' ||
              boardItem.activityType === 'COMMENT_SHARED_POST') &&
            boardItem.activity.sharedPost.sharingId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                sharedPost: {
                  ...boardItem.activity.sharedPost,
                  sharingComments: [
                    action.payload.comment,
                    ...boardItem.activity.sharedPost.sharingComments,
                  ],
                },
              },
            };
          } else return boardItem;
        }),
      };
    case postTypes.EDIT_SHARED_POST_COMMENT:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            boardItem.activityType === 'SHARE_POST' &&
            boardItem.activity.sharingId === action.payload.postId
          ) {
            return {
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
            };
          } else if (
            (boardItem.activityType === 'LIKE_SHARED_POST' ||
              boardItem.activityType === 'COMMENT_SHARED_POST') &&
            boardItem.activity.sharedPost.sharingId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                sharedPost: {
                  ...boardItem.activity.sharedPost,
                  sharingComments:
                    boardItem.activity.sharedPost.sharingComments.map(
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
              },
            };
          } else return boardItem;
        }),
      };
    case postTypes.DELETE_SHARED_POST_COMMENT:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            boardItem.activityType === 'SHARE_POST' &&
            boardItem.activity.sharingId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                sharingComments: boardItem.activity.sharingComments.filter(
                  (comment) => comment.commentId !== action.payload.commentId
                ),
              },
            };
          } else if (
            (boardItem.activityType === 'LIKE_SHARED_POST' ||
              boardItem.activityType === 'COMMENT_SHARED_POST') &&
            boardItem.activity.sharedPost.sharingId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                sharedPost: {
                  ...boardItem.activity.sharedPost,
                  sharingComments:
                    boardItem.activity.sharedPost.sharingComments.filter(
                      (comment) =>
                        comment.commentId !== action.payload.commentId
                    ),
                },
              },
            };
          } else return boardItem;
        }),
      };
    case postTypes.LIKE_SHARED_POST_COMMENT:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            boardItem.activityType === 'SHARE_POST' &&
            boardItem.activity.sharingId === action.payload.postId
          ) {
            return {
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
            };
          } else if (
            (boardItem.activityType === 'LIKE_SHARED_POST' ||
              boardItem.activityType === 'COMMENT_SHARED_POST') &&
            boardItem.activity.sharedPost.sharingId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                sharedPost: {
                  ...boardItem.activity.sharedPost,
                  sharingComments:
                    boardItem.activity.sharedPost.sharingComments.map(
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
              },
            };
          } else return boardItem;
        }),
      };
    case postTypes.DISLIKE_SHARED_POST_COMMENT:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            boardItem.activityType === 'SHARE_POST' &&
            boardItem.activity.sharingId === action.payload.postId
          ) {
            return {
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
            };
          } else if (
            (boardItem.activityType === 'LIKE_SHARED_POST' ||
              boardItem.activityType === 'COMMENT_SHARED_POST') &&
            boardItem.activity.sharedPost.sharingId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                sharedPost: {
                  ...boardItem.activity.sharedPost,
                  sharingComments:
                    boardItem.activity.sharedPost.sharingComments.map(
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
              },
            };
          } else return boardItem;
        }),
      };
    case postTypes.SHARED_POST_ACCESS:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            boardItem.activityType === 'SHARE_POST' &&
            boardItem.activity.sharingId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                isPublic: action.payload.isPublic,
              },
            };
          } else if (
            (boardItem.activityType === 'LIKE_SHARED_POST' ||
              boardItem.activityType === 'COMMENT_SHARED_POST') &&
            boardItem.activity.sharedPost.sharingId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                sharedPost: {
                  ...boardItem.activity.sharedPost,
                  isPublic: action.payload.isPublic,
                },
              },
            };
          } else return boardItem;
        }),
      };
    case postTypes.SHARED_POST_COMMENTS_ACCESS:
      return {
        ...state,
        board: state.board.map((boardItem) => {
          if (
            boardItem.activityType === 'SHARE_POST' &&
            boardItem.activity.sharingId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                isCommentingBlocked: action.payload.isCommentingBlocked,
              },
            };
          } else if (
            (boardItem.activityType === 'LIKE_SHARED_POST' ||
              boardItem.activityType === 'COMMENT_SHARED_POST') &&
            boardItem.activity.sharedPost.sharingId === action.payload.postId
          ) {
            return {
              ...boardItem,
              activity: {
                ...boardItem.activity,
                sharedPost: {
                  ...boardItem.activity.sharedPost,
                  isCommentingBlocked: action.payload.isCommentingBlocked,
                },
              },
            };
          } else return boardItem;
        }),
      };
    case activityTypes.FETCH_ALL_USERS_INFORMATION:
      return {
        ...state,
        users: action.payload.users,
      };
    case eventTypes.UPDATE_RESPOND_TO_EVENT:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          (boardItem.activityType === 'RESPOND_TO_EVENT' ||
            boardItem.activityType === 'SHARE_EVENT') &&
          boardItem.activity.event.eventId === action.payload.eventId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  event: {
                    ...boardItem.activity.event,
                    members: boardItem.activity.event.members.filter(
                      (member) =>
                        member.eventMember.userId !== action.payload.userId
                    ),
                  },
                },
              }
            : boardItem
        ),
      };
    case eventTypes.RESPOND_TO_EVENT:
      return {
        ...state,
        board: state.board.map((boardItem) =>
          (boardItem.activityType === 'RESPOND_TO_EVENT' ||
            boardItem.activityType === 'SHARE_EVENT') &&
          boardItem.activity.event.eventId === action.payload.eventId
            ? {
                ...boardItem,
                activity: {
                  ...boardItem.activity,
                  event: {
                    ...boardItem.activity.event,
                    members: [
                      ...boardItem.activity.event.members,
                      action.payload.member,
                    ],
                  },
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
