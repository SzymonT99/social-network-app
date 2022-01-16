import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './postComment-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import { Badge, Button, Divider, TextField } from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../../redux/actions/notificationActions';
import {
  deletePostComment,
  dislikePostComment,
  editPostComment,
  likePostComment,
} from '../../redux/actions/postActions';
import Popup from '../Popup/Popup';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import UsersListPopup from '../UsersListPopup/UsersListPopup';

const formatTime = (createdDate) => {
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

const activeStatus = {
  ONLINE: '#1CCD16',
  BE_RIGHT_BACK: 'orange',
  BUSY: 'purple',
  OFFLINE: '#FF1C00',
};

const PostComment = (props) => {
  const {
    classes,
    commentId,
    postId,
    content,
    authorName,
    createdDate,
    userStatus,
    authorId,
    likes,
  } = props;

  const userId = useSelector((state) => state.auth.user.userId);
  const commentInputRef = useRef(null);

  const dispatch = useDispatch();

  const [commentText, setCommentText] = useState(content);
  const [isDisabled, setIsDisabled] = useState(true);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openLikesPopup, setOpenLikesPopup] = useState(false);

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const editComment = () => {
    if (commentText === '') {
      dispatch(
        showNotification('warning', 'Nie można pozostawić pustej treści')
      );
    } else {
      dispatch(editPostComment(postId, commentId, commentText));
      setIsDisabled(true);
    }
  };

  const editCommentClick = () => {
    setIsDisabled(false);
  };

  const handleCloseDeletePopup = () => {
    setOpenDeletePopup(false);
  };

  const handleCloseLikesPopup = () => {
    setOpenLikesPopup(false);
  };

  const deleteCommentClick = () => {
    dispatch(deletePostComment(postId, commentId));
    setOpenDeletePopup(false);
  };

  const commentIsLiked = (likes, userId) => {
    let state = false;
    if (likes === null) {
      return false;
    }
    likes.forEach((likedUser) => {
      if (likedUser.userId === userId) {
        state = true;
      }
    });
    return state;
  };

  const commentReaction = () => {
    if (!commentIsLiked(likes, userId)) {
      dispatch(likePostComment(postId, commentId));
    } else {
      dispatch(dislikePostComment(postId, commentId));
    }
  };

  useEffect(() => {
    if (!isDisabled) {
      commentInputRef.current.focus();
    }
  }, [isDisabled]);

  return (
    <div className={classes.commentContainer}>
      <div>
        <Badge
          variant="dot"
          overlap="circular"
          sx={{
            marginRight: '20px',
            '& .MuiBadge-badge': {
              position: 'absolute',
              backgroundColor: activeStatus[userStatus],
            },
          }}
        >
          <img
            src={defaultUserPhoto}
            alt="Zdjęcie użytkownika"
            className={classes.userPhotoSmall}
          />
        </Badge>
      </div>
      <div className={classes.commentContent}>
        <div className={classes.commentText}>
          <Typography variant="subtitle2" fontWeight="bold">
            <span className={classes.authorName}>{authorName}</span>
            <span className={classes.commentTime}>
              {' ' + formatTime(createdDate)}
            </span>
          </Typography>
          <TextField
            fullWidth
            multiline
            disabled={isDisabled}
            inputRef={commentInputRef}
            maxRows={3}
            className={classes.commentInput}
            value={commentText}
            onChange={handleCommentChange}
          />
        </div>
        {!isDisabled && (
          <div className={classes.editActionContainer}>
            <Button
              color="secondary"
              variant="contained"
              className={classes.editActionBtn}
              onClick={editComment}
            >
              Zmień komentarz
            </Button>
            <Button
              color="primary"
              variant="contained"
              className={classes.editActionBtn}
              onClick={() => setIsDisabled(true)}
            >
              Anuluj
            </Button>
          </div>
        )}
        <div className={classes.commentActions}>
          <div className={classes.likesContainer}>
            <Button
              style={{ display: 'block' }}
              className={classes.commentActionItem}
              variant="text"
              onClick={commentReaction}
            >
              {commentIsLiked(likes, userId) ? 'Nie lubię tego' : 'Lubię to'}
            </Button>
            {likes !== null && likes.length !== 0 && (
              <Typography
                variant="body1"
                fontWeight="bold"
                className={classes.likesCounter}
                onClick={() => setOpenLikesPopup(true)}
              >
                <ThumbUpIcon color="primary" className={classes.likeItem} />
                {likes.length}
              </Typography>
            )}
          </div>
          {authorId === userId && (
            <div>
              <Button
                className={classes.commentActionItem}
                style={{ marginRight: '20px' }}
                variant="text"
                onClick={editCommentClick}
              >
                Edytuj
              </Button>
              <Button
                className={classes.commentActionItem}
                variant="text"
                onClick={handleCloseDeletePopup}
              >
                Usuń
              </Button>
            </div>
          )}
        </div>
      </div>
      <Popup
        open={openDeletePopup}
        type="confirmation"
        title="Usuwanie komentarza"
        onClose={handleCloseDeletePopup}
      >
        <>
          <Typography variant="h6" style={{ marginBottom: '15px' }}>
            Czy napewno chcesz usunąć wskazany komentarz?
          </Typography>
          <Divider />
          <div className={classes.dialogActionContainer}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.dialogActionBtn}
              style={{ marginRight: '20px' }}
              onClick={deleteCommentClick}
            >
              Potwierdź
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.dialogActionBtn}
              onClick={handleCloseDeletePopup}
            >
              Anuluj
            </Button>
          </div>
        </>
      </Popup>
      <UsersListPopup
        title="Polubienia użytkowników"
        open={openLikesPopup}
        users={likes}
        onClose={handleCloseLikesPopup}
      />
    </div>
  );
};

PostComment.propTypes = {
  classes: PropTypes.object.isRequired,
  commentId: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  createdDate: PropTypes.object.isRequired,
  userStatus: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
};

PostComment.defaultProps = {
  likes: [],
};

export default withStyles(styles)(PostComment);
