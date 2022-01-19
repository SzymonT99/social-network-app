import React, { useState } from 'react';
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
} from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import {
  commentPost,
  deletePost,
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

const Post = (props) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user.userId);
  const userProfile = useSelector((state) => state.profile.userProfile);

  const [comment, setComment] = useState('');
  const [commentsDisplayed, setCommentsDisplayed] = useState(false);
  const [allCommentsShown, setAllCommentsShown] = useState(false);
  const [openLikesPopup, setOpenLikesPopup] = useState(false);
  const [openEditionPostPopup, setOpenEditionPostPopup] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSharePostPopup, setOpenSharePostPopup] = React.useState(false);

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
  } = props;

  const postReaction = () => {
    if (!postIsLiked(likes, userId)) {
      dispatch(likePost(postId));
    } else {
      dispatch(dislikePost(postId));
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    if (comment === '') {
      dispatch(showNotification('warning', 'Nie podano treści komentarza'));
    } else {
      dispatch(commentPost(postId, comment));
      setCommentsDisplayed(true);
      setComment('');
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

  const handleCloseLikesPopup = () => {
    setOpenLikesPopup(false);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(postId));
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

  const handleFavouritePost = () => {
    console.log('add to favourite');
    handleClosePostOption();
  };

  const handleCloseSharePostPopup = () => {
    setOpenSharePostPopup(false);
  };

  const handleSharePost = () => {
    setOpenSharePostPopup(true);
  };

  return (
    <Paper
      elevation={7}
      sx={{ borderRadius: '10px' }}
      className={classes.postContainer}
    >
      <ActivityHeading
        authorName={authorName}
        profilePhoto={profilePhoto}
        createdDate={createdDate}
        activityTitle=" dodał(a) nowy post"
        editionDate={editionDate}
        userStatus={userStatus}
        isEdited={isEdited}
      >
        {!asSharing ? (
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
                onClick={handleFavouritePost}
                className={classes.postMenuItem}
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
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
              {authorId && authorId === userId && (
                <div>
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
                        <Typography variant="subtitle2">Edytuj post</Typography>
                      }
                    />
                  </MenuItem>
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
                          Edytuj dostępność
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
                    onClick={handleDeletePost}
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
      </ActivityHeading>
      <Divider />
      <div className={classes.postContent}>
        <Typography variant="body1">{content + ' ' + authorId}</Typography>
      </div>
      {images.length !== 0 && (
        <ImageList cols={1} rowHeight={300} className={classes.postImageList}>
          {images.map((img, index) => (
            <ImageListItem key={index} className={classes.uploadImageItem}>
              <img
                key={index}
                src={img.url}
                srcSet={img.url}
                alt={img.filename}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      {!asSharing && (
        <>
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
                  src={like.likedUser.profilePhoto.url}
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
          </div>
          <Divider />
          {commentsDisplayed &&
            !isCommentingBlocked &&
            comments.map((comment, index) => {
              let numberShowedItems = allCommentsShown
                ? comments.length + 1
                : 2;
              if (index < numberShowedItems) {
                return (
                  <PostComment
                    key={comment.commentId}
                    commentId={comment.commentId}
                    postId={postId}
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
            comments.length > 2 && (
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
          {comments.length !== 0 && commentsDisplayed && (
            <Divider
              className={classes.divider}
              style={{ marginTop: '15px' }}
            />
          )}
          {!isCommentingBlocked && (
            <div className={classes.addCommentContainer}>
              <Avatar
                src={
                  userProfile ? userProfile.profilePhoto.url : defaultUserPhoto
                }
                alt={
                  userProfile
                    ? userProfile.firstName + ' ' + userProfile.lastName
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
                value={comment}
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
          basePostId={postId}
        />
      </Popup>
    </Paper>
  );
};

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  authorName: PropTypes.string.isRequired,
  profilePhoto: PropTypes.object.isRequired,
  createdDate: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
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
};

Post.defaultProps = {
  asSharing: false,
};

export default withStyles(styles)(Post);
