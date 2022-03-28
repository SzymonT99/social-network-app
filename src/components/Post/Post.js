import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { withStyles } from '@mui/styles';
import styles from './post-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import {
  Button,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import {
  addPostToFavourite,
  commentPost,
  deletePost,
  deletePostFromFavourite,
  dislikePost,
  likePost,
  manageAccess,
  managePostCommentsAccess,
} from '../../redux/actions/postActions';
import { useDispatch, useSelector } from 'react-redux';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { showNotification } from '../../redux/actions/notificationActions';
import PostComment from '../PostComment/PostComment';
import Avatar from '@mui/material/Avatar';
import { AvatarGroup } from '@mui/material';
import UsersListPopup from '../UsersListPopup/UsersListPopup';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CommentIcon from '@mui/icons-material/Comment';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import Popup from '../Popup/Popup';
import PostForm from '../Forms/PostForm';
import SharePostForm from '../Forms/SharePostForm';
import ActivityHeading from '../ActivityHeading/ActivityHeading';
import ActionConfirmation from '../ActionConfirmation/ActionConfirmation';
import { deleteGroupPost } from '../../redux/actions/groupActions';
import { formatActivityDate } from '../../utils/formatActivityDate';
import ModalImage from 'react-modal-image-responsive';

const Post = (props) => {
  const {
    classes,
    authorId,
    authorName,
    profilePhoto,
    createdDate,
    content,
    images,
    likesNumber,
    commentsNumber,
    sharesNumber,
    userStatus,
    postId,
    likes,
    comments,
    isPublic,
    isEdited,
    isCommentingBlocked,
    editionDate,
    asSharing,
    highlightCommentById,
    isFavourite,
    accessToManagement,
    isGroupPost,
    isGroupPostActivity,
    groupId,
    groupName,
    groupImage,
    isActivity,
    activityType,
    activityAuthorName,
    activityAuthorPhoto,
    activityDate,
    isChangeProfilePhotoPost,
  } = props;

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user.userId);
  const loggedUserProfile = useSelector((state) => state.auth.userProfile);

  const [postComments, setPostComments] = useState(comments);
  const [commentText, setCommentText] = useState('');
  const [commentsDisplayed, setCommentsDisplayed] = useState(false);
  const [allCommentsShown, setAllCommentsShown] = useState(false);
  const [openLikesPopup, setOpenLikesPopup] = useState(false);
  const [openEditionPostPopup, setOpenEditionPostPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSharePostPopup, setOpenSharePostPopup] = useState(false);
  const [highlightComment, setHighlightComment] = useState(null);
  const [openDeletePostPopup, setOpenDeletePostPopup] = useState(false);

  const handleClickPostOption = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePostOption = () => {
    setAnchorEl(null);
  };

  const postIsLiked = (likes, userId) => {
    let state = false;
    likes.forEach((like) => {
      if (like.likedUser.userId === userId) {
        state = true;
      }
    });
    return state;
  };

  useEffect(() => {
    if (highlightCommentById !== null) {
      const comment = comments.find(
        ({ commentId }) => commentId === highlightCommentById
      );
      setHighlightComment(comment);
      setPostComments(comments.filter((item) => item !== comment));
    } else {
      setPostComments(comments);
    }
  }, [comments]);

  const postReaction = () => {
    if (!postIsLiked(likes, userId)) {
      dispatch(likePost(postId));
    } else {
      dispatch(dislikePost(postId));
    }
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const addComment = () => {
    if (commentText === '') {
      dispatch(showNotification('warning', 'Nie podano treści komentarza'));
    } else {
      dispatch(commentPost(postId, commentText));
      setCommentsDisplayed(true);
      setCommentText('');
    }
  };

  const specifyCommentsVisibility = () => {
    if (commentsDisplayed) {
      setCommentsDisplayed(false);
    } else {
      setCommentsDisplayed(true);
    }
  };

  const generateLikesAuthorNames = () => {
    let names = '';
    let counter = 0;

    likes.forEach((like, index) => {
      if (index < 2) {
        counter++;
        names +=
          like.likedUser.firstName + ' ' + like.likedUser.lastName + ', ';
      }
    });

    let otherUsersNumber = likes.length - counter;

    if (likes.length === 1) {
      names = names.substring(0, names.length - 2) + ' lubi post';
    } else if (likes.length > 1) {
      if (otherUsersNumber !== 0) {
        names =
          names.substring(0, names.length - 2) +
          'oraz ' +
          otherUsersNumber +
          ' innych użytkowników';
      }
      names += ' lubią post';
    } else {
      names = '';
    }

    return names;
  };

  const handleClosePostDeletePopup = () => {
    setOpenDeletePostPopup(false);
  };

  const handleCloseLikesPopup = () => {
    setOpenLikesPopup(false);
  };

  const handleDeletePost = () => {
    if (!isGroupPost) {
      dispatch(deletePost(postId));
    } else {
      dispatch(deleteGroupPost(groupId, postId));
    }
    handleClosePostDeletePopup();
    handleClosePostOption();
  };

  const handleEditPost = () => {
    setOpenEditionPostPopup(true);
    handleClosePostOption();
  };

  const handleCloseEditionPostPopup = () => {
    setOpenEditionPostPopup(false);
  };

  const handleManagePostAccess = () => {
    dispatch(manageAccess(postId, !isPublic));
    handleClosePostOption();
  };

  const handleManagePostCommentsAccess = () => {
    dispatch(managePostCommentsAccess(postId, !isCommentingBlocked));
    handleClosePostOption();
  };

  const handleClickAddFavouritePost = () => {
    dispatch(addPostToFavourite(postId));
    handleClosePostOption();
  };

  const handleClickDeleteFromFavourite = () => {
    dispatch(deletePostFromFavourite(postId));
  };

  const handleCloseSharePostPopup = () => {
    setOpenSharePostPopup(false);
  };

  const handleSharePost = () => {
    setOpenSharePostPopup(true);
  };

  return (
    <Paper
      elevation={!asSharing ? 4 : 0}
      sx={{
        border: asSharing && '1px solid rgba(0, 0, 0, 0.87)',
      }}
      className={classes.postContainer}
    >
      {isActivity && (
        <div>
          <div className={classes.activityInformationContainer}>
            <Avatar
              src={
                activityAuthorPhoto ? activityAuthorPhoto.url : defaultUserPhoto
              }
              alt={activityAuthorName ? activityAuthorName : 'Autor aktywności'}
              className={classes.userPhotoInfo}
            />
            <Typography
              variant="body1"
              className={classes.activityUserNameText}
            >
              {activityAuthorName}
              <span className={classes.activityActionDescription}>
                {activityType === 'LIKE_POST'
                  ? ' polubił(a) post'
                  : ' skomentował(a) post'}
              </span>
            </Typography>
            <Typography variant="body2" className={classes.activityDateText}>
              {formatActivityDate(new Date(activityDate))}
            </Typography>
          </div>
          <Divider sx={{ margin: '15px 0px' }} />
        </div>
      )}
      <ActivityHeading
        authorId={authorId}
        authorName={authorName}
        profilePhoto={profilePhoto}
        createdDate={createdDate}
        activityTitle={
          !isChangeProfilePhotoPost
            ? ' dodał(a) nowy post'
            : ' zmienił(a) zdjęcie profilowe'
        }
        editionDate={editionDate}
        userStatus={userStatus}
        isEdited={isEdited}
        postGroupActivity={isGroupPostActivity}
        groupId={groupId}
        groupName={groupName}
        groupImage={groupImage}
      >
        <>
          {!asSharing && !isFavourite ? (
            <div>
              <IconButton onClick={handleClickPostOption}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                className={classes.optionMenu}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                PaperProps={{
                  sx: {
                    borderRadius: '5px',
                  },
                }}
                disableScrollLock={true}
                onClose={handleClosePostOption}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem
                  onClick={handleClickAddFavouritePost}
                  className={classes.postMenuItem}
                  sx={{
                    borderBottom:
                      (authorId === userId || accessToManagement === true) &&
                      '1px solid rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <ListItemIcon>
                    <FavoriteIcon fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography variant="subtitle2">
                        Dodaj do ulubionych
                      </Typography>
                    }
                  />
                </MenuItem>
                {(authorId === userId || accessToManagement === true) && (
                  <div>
                    {!isChangeProfilePhotoPost && (
                      <MenuItem
                        className={classes.postMenuItem}
                        onClick={handleEditPost}
                      >
                        <ListItemIcon>
                          <EditIcon fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText
                          disableTypography
                          primary={
                            <Typography variant="subtitle2">
                              Edytuj post
                            </Typography>
                          }
                        />
                      </MenuItem>
                    )}
                    <MenuItem
                      className={classes.postMenuItem}
                      onClick={handleManagePostAccess}
                    >
                      <ListItemIcon>
                        <PeopleAltIcon fontSize="medium" />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography variant="subtitle2">
                            Zmień dostępność
                          </Typography>
                        }
                      />
                    </MenuItem>
                    <MenuItem
                      className={classes.postMenuItem}
                      sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
                      onClick={handleManagePostCommentsAccess}
                    >
                      <ListItemIcon>
                        {isCommentingBlocked ? (
                          <CommentIcon fontSize="medium" />
                        ) : (
                          <CommentsDisabledIcon fontSize="medium" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography variant="subtitle2">
                            {!isCommentingBlocked
                              ? 'Zablokuj komentowanie'
                              : 'Odblokuj komentowanie'}
                          </Typography>
                        }
                      />
                    </MenuItem>
                    <MenuItem
                      className={classes.postMenuItem}
                      onClick={() => setOpenDeletePostPopup(true)}
                    >
                      <ListItemIcon>
                        <DeleteIcon fontSize="medium" />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography variant="subtitle2">Usuń post</Typography>
                        }
                      />
                    </MenuItem>
                  </div>
                )}
              </Menu>
            </div>
          ) : (
            <div />
          )}
          {isFavourite && (
            <Tooltip title="Usuń z ulubionych" placement="left">
              <IconButton onClick={handleClickDeleteFromFavourite}>
                <DeleteIcon fontSize="medium" color="secondary" />
              </IconButton>
            </Tooltip>
          )}
        </>
      </ActivityHeading>
      <Popup
        open={openDeletePostPopup}
        type="confirmation"
        title="Usuwanie postu"
        onClose={handleClosePostDeletePopup}
      >
        <ActionConfirmation
          title="Czy napewno chcesz usunąć wskazany post?"
          confirmationAction={handleDeletePost}
          rejectionAction={handleClosePostDeletePopup}
        />
      </Popup>
      <Divider />
      <div className={classes.postContent}>
        <Typography variant="body1">{content}</Typography>
      </div>
      {images.length !== 0 && (
        <div
          className={classes.postImageListContainer}
          style={{
            gridTemplateColumns: `repeat(${images.length > 1 ? 2 : 1}, 1fr)`,
          }}
        >
          {images.map((img, index) => (
            <ModalImage
              key={index}
              className={
                images.length > 1
                  ? classes.postSmallImage
                  : classes.postLargeImage
              }
              small={img.url}
              medium={img.url}
              large={img.url}
              hideZoom
            />
          ))}
        </div>
      )}
      {!asSharing && (
        <>
          <div
            className={classes.likesContainer}
            onClick={() => setOpenLikesPopup(true)}
          >
            <AvatarGroup max={4}>
              {likes.map((like) => (
                <Avatar
                  key={like.likedUser.userId}
                  className={classes.likedUserAvatar}
                  alt={like.likedUser.firstName + ' ' + like.likedUser.lastName}
                  src={
                    like.likedUser.profilePhoto
                      ? like.likedUser.profilePhoto.url
                      : defaultUserPhoto
                  }
                />
              ))}
            </AvatarGroup>
            <Typography variant="body2" marginLeft="6px">
              {generateLikesAuthorNames()}
            </Typography>
          </div>
          <UsersListPopup
            title="Polubienia użytkowników"
            open={openLikesPopup}
            users={likes.map((like) => like.likedUser)}
            onClose={handleCloseLikesPopup}
          />
          <Divider />
          <div className={classes.postReactionContainer}>
            <Button
              onClick={postReaction}
              className={
                postIsLiked(likes, userId)
                  ? classes.likedBtnClicked
                  : classes.postBtn
              }
            >
              <Typography
                variant="subtitle2"
                className={classes.postReactionItem}
              >
                {postIsLiked(likes, userId) ? (
                  <ThumbUpIcon sx={{ fontSize: '35px', marginRight: '6px' }} />
                ) : (
                  <ThumbUpAltOutlinedIcon
                    sx={{ fontSize: '35px', marginRight: '6px' }}
                  />
                )}
                {'Lubię to | ' + likesNumber}
              </Typography>
            </Button>
            {!isCommentingBlocked && (
              <Button
                className={classes.postBtn}
                onClick={specifyCommentsVisibility}
              >
                <Typography
                  variant="subtitle2"
                  className={classes.postReactionItem}
                >
                  <ChatBubbleOutlineOutlinedIcon
                    sx={{ fontSize: '35px', marginRight: '6px' }}
                  />
                  {'Komentarze | ' + commentsNumber}
                </Typography>
              </Button>
            )}
            {!isChangeProfilePhotoPost && (
              <Button className={classes.postBtn} onClick={handleSharePost}>
                <Typography
                  variant="subtitle2"
                  className={classes.postReactionItem}
                >
                  <ShareOutlinedIcon
                    sx={{ fontSize: '35px', marginRight: '6px' }}
                  />
                  {'Udostępnij | ' + sharesNumber}
                </Typography>
              </Button>
            )}
          </div>
          <Divider />
          {highlightComment !== null && (
            <PostComment
              highlightComment
              commentId={highlightComment.commentId}
              postId={postId}
              postAuthorId={authorId}
              createdDate={new Date(highlightComment.createdAt)}
              authorName={
                highlightComment.commentAuthor.firstName +
                ' ' +
                highlightComment.commentAuthor.lastName
              }
              userStatus={highlightComment.commentAuthor.activityStatus}
              content={highlightComment.text}
              authorId={highlightComment.commentAuthor.userId}
              likes={highlightComment.userLikes}
              isEdited={highlightComment.isEdited}
              authorProfilePhoto={highlightComment.commentAuthor.profilePhoto}
            />
          )}
          {commentsDisplayed &&
            !isCommentingBlocked &&
            postComments.map((comment, index) => {
              let numberShowedItems = allCommentsShown
                ? postComments.length + 1
                : 2;
              if (index < numberShowedItems) {
                return (
                  <PostComment
                    key={comment.commentId}
                    commentId={comment.commentId}
                    postId={postId}
                    postAuthorId={authorId}
                    createdDate={new Date(comment.createdAt)}
                    authorName={
                      comment.commentAuthor.firstName +
                      ' ' +
                      comment.commentAuthor.lastName
                    }
                    userStatus={comment.commentAuthor.activityStatus}
                    content={comment.text}
                    authorId={comment.commentAuthor.userId}
                    likes={comment.userLikes}
                    isEdited={comment.isEdited}
                    authorProfilePhoto={comment.commentAuthor.profilePhoto}
                    accessToManagement={accessToManagement}
                  />
                );
              }
            })}
          {allCommentsShown === false &&
            commentsDisplayed === true &&
            postComments.length > 2 && (
              <div className={classes.moreCommentsContainer}>
                <Link
                  component="button"
                  variant="body1"
                  onClick={() => setAllCommentsShown(true)}
                  className={classes.moreCommentsLink}
                >
                  Zobacz więcej komentarzy
                </Link>
              </div>
            )}
          {postComments.length !== 0 && commentsDisplayed && (
            <Divider sx={{ marginTop: '15px' }} />
          )}
          {!isCommentingBlocked && (
            <div className={classes.addCommentContainer}>
              <Avatar
                src={
                  loggedUserProfile && loggedUserProfile.profilePhoto
                    ? loggedUserProfile.profilePhoto.url
                    : defaultUserPhoto
                }
                alt={
                  loggedUserProfile && loggedUserProfile.profilePhoto
                    ? loggedUserProfile.firstName +
                      ' ' +
                      loggedUserProfile.lastName
                    : 'Zalogowany użytkownik'
                }
                className={classes.userPhotoSmall}
              />
              <TextField
                fullWidth
                placeholder="Napisz komentarz"
                multiline
                maxRows={3}
                className={classes.commentInput}
                value={commentText}
                onChange={handleCommentChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addComment();
                    e.preventDefault();
                  }
                }}
              />
            </div>
          )}
        </>
      )}
      <Popup
        open={openEditionPostPopup}
        type="post"
        title="Edytuj post"
        onClose={handleCloseEditionPostPopup}
      >
        <PostForm
          edition
          closePopup={handleCloseEditionPostPopup}
          postText={content}
          postImages={images}
          postIsPublic={isPublic}
          editedPostId={postId}
          groupPost={isGroupPost}
          groupId={isGroupPost && groupId}
        />
      </Popup>
      <Popup
        open={openSharePostPopup}
        type="post"
        title="Udostępnij post"
        onClose={handleCloseSharePostPopup}
      >
        <SharePostForm
          closePopup={handleCloseSharePostPopup}
          postAuthorId={authorId}
          basePostId={postId}
        />
      </Popup>
    </Paper>
  );
};

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  authorId: PropTypes.number.isRequired,
  authorName: PropTypes.string.isRequired,
  profilePhoto: PropTypes.object,
  createdDate: PropTypes.object.isRequired,
  content: PropTypes.string,
  likesNumber: PropTypes.number.isRequired,
  commentsNumber: PropTypes.number.isRequired,
  sharesNumber: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  userStatus: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  likes: PropTypes.array.isRequired,
  isPublic: PropTypes.bool.isRequired,
  isEdited: PropTypes.bool.isRequired,
  isCommentingBlocked: PropTypes.bool.isRequired,
  asSharing: PropTypes.bool,
  highlightCommentById: PropTypes.number,
  isFavourite: PropTypes.bool,
  accessToManagement: PropTypes.bool,
  isGroupPost: PropTypes.bool,
  isGroupPostActivity: PropTypes.bool,
  isChangeProfilePhotoPost: PropTypes.bool,
  groupId: PropTypes.number,
  groupName: PropTypes.string,
  groupImage: PropTypes.object,
  isActivity: PropTypes.bool,
  activityType: PropTypes.string,
  activityAuthorName: PropTypes.string,
  activityAuthorPhoto: PropTypes.object,
  activityDate: PropTypes.string,
};

Post.defaultProps = {
  asSharing: false,
  highlightCommentById: null,
  isFavourite: false,
  accessToManagement: false,
  isGroupPost: false,
  isGroupPostActivity: false,
  isActivity: false,
  isChangeProfilePhotoPost: false,
};

export default withStyles(styles)(Post);
