import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { withStyles } from '@mui/styles';
import styles from './post-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import {
  Badge,
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
import Popup from '../Popup/Popup';
import PostForm from '../Forms/PostForm';

const formatPostTime = (createdDate) => {
  let diffInMs = (new Date().getTime() - createdDate.getTime()) / 1000;
  let minutes = Math.floor(diffInMs / 60);

  if (minutes < 30) {
    return 'kilka minut temu';
  } else if (minutes < 90) {
    return '1 godz. temu';
  } else if (minutes >= 90 && minutes < 150) {
    return '2 godz. temu';
  } else if (minutes >= 150 && minutes < 210) {
    return '3 godz. temu';
  } else if (minutes >= 210 && minutes < 270) {
    return '4 godz. temu';
  } else if (minutes >= 270 && minutes < 1440) {
    return 'kilka godz. temu';
  } else if (minutes >= 1440 && minutes < 1560) {
    return '1 dzień temu';
  } else if (minutes >= 1560 && minutes < 3000) {
    return '2 dni temu';
  } else if (minutes >= 3000 && minutes < 3100) {
    return '3 dni temu';
  } else {
    let day = createdDate.getDate();
    let month = createdDate.getMonth() + 1;
    let year = createdDate.getFullYear();
    let hour = createdDate.getHours();
    let minutes = createdDate.getMinutes();
    return (
      (day <= 9 ? '0' + day : day) +
      '.' +
      (month <= 9 ? '0' + month : month) +
      '.' +
      year +
      ' r. ' +
      (hour <= 9 ? '0' + hour : hour) +
      ':' +
      (minutes <= 9 ? '0' + minutes : minutes)
    );
  }
};

const Post = (props) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user.userId);
  const userProfile = useSelector((state) => state.profile.userProfile);

  const [comment, setComment] = useState('');
  const [commentsDisplayed, setCommentsDisplayed] = useState(false);
  const [allCommentsShown, setAllCommentsShown] = useState(false);
  const [openLikesPopup, setOpenLikesPopup] = useState(false);
  const [openEditionPost, setOpenEditionPost] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

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
    editionDate,
  } = props;

  const activeStatus = {
    ONLINE: '#1CCD16',
    BE_RIGHT_BACK: 'orange',
    BUSY: 'purple',
    OFFLINE: '#FF1C00',
  };

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
    setOpenEditionPost(true);
    handleClosePostOption();
  };

  const handleCloseEditionPost = () => {
    setOpenEditionPost(false);
  };

  const handleFavouritePost = () => {
    console.log('add to favourite');
  };

  return (
    <Paper
      elevation={7}
      sx={{ borderRadius: '10px' }}
      className={classes.postContainer}
    >
      <div className={classes.headingBox}>
        <div className={classes.authorContainer}>
          <Badge
            variant="dot"
            overlap="circular"
            sx={{
              marginRight: '20px',
              '& .MuiBadge-badge': {
                backgroundColor: activeStatus[userStatus],
              },
            }}
          >
            <Avatar
              src={profilePhoto ? profilePhoto.url : defaultUserPhoto}
              alt={authorName}
              className={classes.userPhoto}
            />
          </Badge>
          <div>
            <Typography variant="subtitle1" fontWeight="bold">
              {authorName}
              <span className={classes.actionName}> dodał(a) nowy wpis</span>
              {isEdited && (
                <Typography component="span" variant="body2" fontWeight="bold">
                  {' - edytowano ' + editionDate}
                </Typography>
              )}
            </Typography>
            <Typography variant="body2">
              {formatPostTime(createdDate)}
            </Typography>
          </div>
        </div>
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
            <MenuItem onClick={handleFavouritePost}>
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
            <MenuItem onClick={handleEditPost}>
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
            <MenuItem onClick={handleDeletePost}>
              <ListItemIcon>
                <DeleteIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography variant="subtitle2">Usuń post</Typography>}
              />
            </MenuItem>
          </Menu>
        </div>
      </div>
      <Divider />
      <div className={classes.postContent}>
        <Typography variant="body1">{content}</Typography>
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
          <Typography variant="subtitle2" className={classes.postReactionItem}>
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
        <Button className={classes.postBtn} onClick={specifyCommentsVisibility}>
          <Typography variant="subtitle2" className={classes.postReactionItem}>
            <ChatBubbleOutlineOutlinedIcon
              sx={{ fontSize: '35px', marginRight: '6px' }}
            />
            {'Komentarze | ' + commentsNumber}
          </Typography>
        </Button>
        <Typography variant="subtitle2" className={classes.postReactionItem}>
          <ShareOutlinedIcon sx={{ fontSize: '35px', marginRight: '6px' }} />
          {'Udostępnij | ' + sharesNumber}
        </Typography>
      </div>
      <Divider />
      {commentsDisplayed &&
        comments.map((comment, index) => {
          let numberShowedItems = allCommentsShown ? comments.length + 1 : 2;
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
        <Divider className={classes.divider} style={{ marginTop: '15px' }} />
      )}
      <div className={classes.addCommentContainer}>
        <Avatar
          src={userProfile ? userProfile.profilePhoto.url : defaultUserPhoto}
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
      <Popup
        open={openEditionPost}
        type="createPost"
        title="Edytuj post"
        onClose={handleCloseEditionPost}
      >
        <PostForm
          edition
          closePopup={handleCloseEditionPost}
          postText={content}
          postImages={images}
          postIsPublic={isPublic}
          editedPostId={postId}
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
};

export default withStyles(styles)(Post);
