import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { withStyles } from '@mui/styles';
import styles from './sharedPost-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Post/Post';
import ActivityHeading from '../ActivityHeading/ActivityHeading';
import {
  AvatarGroup,
  Button,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import UsersListPopup from '../UsersListPopup/UsersListPopup';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PostComment from '../PostComment/PostComment';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import {
  commentPost,
  deleteSharedPost,
  dislikePost,
  likePost,
  manageAccess,
  managePostCommentsAccess,
} from '../../redux/actions/postActions';
import { showNotification } from '../../redux/actions/notificationActions';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CommentIcon from '@mui/icons-material/Comment';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';

const SharedPost = (props) => {
  const {
    classes,
    sharedPostId,
    sharedPost,
    sharingAuthorId,
    sharingId,
    date,
    authorName,
    userStatus,
    text,
    profilePhoto,
    isPublic,
    isCommentingBlocked,
    likes,
    comments,
    highlightCommentById,
  } = props;

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user.userId);
  const loggedUserProfile = useSelector((state) => state.auth.userProfile);

  const [postComments, setPostComments] = useState(comments);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openLikesPopup, setOpenLikesPopup] = useState(false);
  const [commentsDisplayed, setCommentsDisplayed] = useState(false);
  const [allCommentsShown, setAllCommentsShown] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [highlightComment, setHighlightComment] = useState(null);

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

  const handleClickPostOption = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePostOption = () => {
    setAnchorEl(null);
  };

  const handleDeleteSharing = () => {
    dispatch(deleteSharedPost(sharedPostId, sharedPost.postId));
    handleClosePostOption();
  };

  const sharedPostIsLiked = (likes, userId) => {
    let state = false;
    likes.forEach((like) => {
      if (like.likedUser.userId === userId) {
        state = true;
      }
    });
    return state;
  };

  const sharedPostReaction = () => {
    if (!sharedPostIsLiked(likes, userId)) {
      dispatch(likePost(sharingId, true));
    } else {
      dispatch(dislikePost(sharingId, true));
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

  const handleCloseLikesPopup = () => {
    setOpenLikesPopup(false);
  };

  const specifyCommentsVisibility = () => {
    if (commentsDisplayed) {
      setCommentsDisplayed(false);
    } else {
      setCommentsDisplayed(true);
    }
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleManageSharedPostAccess = () => {
    dispatch(manageAccess(sharingId, !isPublic, true));
    handleClosePostOption();
  };

  const handleManageSharedPostCommentsAccess = () => {
    dispatch(managePostCommentsAccess(sharingId, !isCommentingBlocked, true));
    handleClosePostOption();
  };

  const addComment = () => {
    if (commentText === '') {
      dispatch(showNotification('warning', 'Nie podano treści komentarza'));
    } else {
      dispatch(commentPost(sharingId, commentText, true));
      setCommentsDisplayed(true);
      setCommentText('');
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{ borderRadius: '10px' }}
      className={classes.sharedPostContainer}
    >
      <ActivityHeading
        authorName={authorName}
        profilePhoto={profilePhoto}
        createdDate={date}
        activityTitle=" udostępnił(a) post"
        userStatus={userStatus}
      >
        {sharingAuthorId === userId ? (
          <div>
            <IconButton onClick={handleClickPostOption}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              className={classes.optionMenu}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
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
                className={classes.postMenuItem}
                onClick={handleManageSharedPostAccess}
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
                onClick={handleManageSharedPostCommentsAccess}
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
                onClick={handleDeleteSharing}
                className={classes.postMenuItem}
              >
                <ListItemIcon>
                  <DeleteIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="subtitle2">
                      Usuń udostępnienie
                    </Typography>
                  }
                />
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div />
        )}
      </ActivityHeading>
      <Divider />
      <div className={classes.sharedPostContent}>
        <Typography variant="body1">{text}</Typography>
      </div>
      <Post
        asSharing
        authorName={
          sharedPost.postAuthor.firstName + ' ' + sharedPost.postAuthor.lastName
        }
        profilePhoto={sharedPost.postAuthor.profilePhoto}
        createdDate={new Date(sharedPost.createdAt)}
        images={sharedPost.images}
        likesNumber={sharedPost.likes.length}
        sharesNumber={sharedPost.sharing.length}
        commentsNumber={sharedPost.comments.length}
        comments={sharedPost.comments}
        content={sharedPost.text}
        userStatus={sharedPost.postAuthor.activityStatus}
        postId={sharedPost.postId}
        likes={sharedPost.likes}
        isEdited={sharedPost.isEdited}
        isPublic={sharedPost.isPublic}
        isCommentingBlocked={sharedPost.isCommentingBlocked}
        editionDate={sharedPost.editedAt}
      />
      <div
        className={classes.likesContainer}
        onClick={() => setOpenLikesPopup(true)}
      >
        <AvatarGroup max={4} className={classes.likedUsersContainer}>
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
          onClick={sharedPostReaction}
          className={
            sharedPostIsLiked(likes, userId)
              ? classes.likedBtnClicked
              : classes.postBtn
          }
        >
          <Typography variant="subtitle2" className={classes.postReactionItem}>
            {sharedPostIsLiked(likes, userId) ? (
              <ThumbUpIcon sx={{ fontSize: '35px', marginRight: '6px' }} />
            ) : (
              <ThumbUpAltOutlinedIcon
                sx={{ fontSize: '35px', marginRight: '6px' }}
              />
            )}
            {'Lubię to | ' + likes.length}
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
              {'Komentarze | ' + comments.length}
            </Typography>
          </Button>
        )}
      </div>
      <Divider />
      {highlightComment !== null && (
        <PostComment
          highlightComment
          commentId={highlightComment.commentId}
          postId={sharingId}
          postAuthorId={sharingId}
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
                sharing
                key={comment.commentId}
                commentId={comment.commentId}
                postId={sharingId}
                postAuthorId={sharingAuthorId}
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
        <Divider className={classes.divider} style={{ marginTop: '15px' }} />
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
              loggedUserProfile && loggedUserProfile
                ? loggedUserProfile.firstName + ' ' + loggedUserProfile.lastName
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
    </Paper>
  );
};

SharedPost.propTypes = {
  classes: PropTypes.object.isRequired,
  sharedPostId: PropTypes.number.isRequired,
  sharedPost: PropTypes.object.isRequired,
  sharingId: PropTypes.number.isRequired,
  authorName: PropTypes.string.isRequired,
  userStatus: PropTypes.string.isRequired,
  profilePhoto: PropTypes.object,
  text: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  isPublic: PropTypes.bool.isRequired,
  isCommentingBlocked: PropTypes.bool.isRequired,
  likes: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
};

SharedPost.defaultProps = {
  highlightCommentById: null,
};

export default withStyles(styles)(SharedPost);
