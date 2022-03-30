import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './postComment-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import { Avatar, Badge, Button, Divider, TextField } from '@mui/material';
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
import ActionConfirmation from '../ActionConfirmation/ActionConfirmation';
import { useHistory } from 'react-router-dom';
import { formatActivityDate } from '../../utils/formatActivityDate';

const activeStatus = {
  ONLINE: '#1CCD16',
  BE_RIGHT_BACK: '#f59c11',
  BUSY: '#67207c',
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
    isEdited,
    authorProfilePhoto,
    sharing,
    highlightComment,
    accessToManagement,
  } = props;

  const loggedUser = useSelector((state) => state.auth.user);
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const commentInputRef = useRef(null);

  const dispatch = useDispatch();

  const history = useHistory();

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
      dispatch(editPostComment(postId, commentId, commentText, sharing));
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
    dispatch(deletePostComment(postId, commentId, sharing));
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
    if (!isUserLoggedIn) {
      dispatch(showNotification('warning', 'Musisz być zalogowany'));
      return;
    }

    if (loggedUser && !commentIsLiked(likes, loggedUser.userId)) {
      dispatch(likePostComment(postId, commentId, sharing));
    } else {
      dispatch(dislikePostComment(postId, commentId, sharing));
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
          className={classes.avatarBadge}
          sx={{
            marginRight: '20px',
            '& .MuiBadge-badge': {
              backgroundColor: activeStatus[userStatus],
            },
          }}
        >
          <Avatar
            src={authorProfilePhoto ? authorProfilePhoto.url : defaultUserPhoto}
            alt={authorName}
            className={classes.userPhotoSmall}
            onClick={() => history.push('/app/profile/' + authorId)}
          />
        </Badge>
      </div>
      <div className={classes.commentContent}>
        <div
          className={
            !highlightComment
              ? classes.commentText
              : classes.commentTextHighlight
          }
        >
          <div className={classes.commentTextHeading}>
            <Typography variant="subtitle2" fontWeight="bold">
              <span
                className={classes.authorName}
                onClick={() => history.push('/app/profile/' + authorId)}
              >
                {authorName}
              </span>
              <span className={classes.commentTime}>
                {' ' + formatActivityDate(createdDate)}
              </span>
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {isEdited ? 'Edytowano' : ' '}
            </Typography>
          </div>
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
              {loggedUser && commentIsLiked(likes, loggedUser.userId)
                ? 'Nie lubię tego'
                : 'Lubię to'}
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
          {((loggedUser && authorId === loggedUser.userId) ||
            accessToManagement === true) && (
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
                onClick={() => setOpenDeletePopup(true)}
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
        <ActionConfirmation
          title="Czy napewno chcesz usunąć wskazany komentarz?"
          confirmationAction={deleteCommentClick}
          rejectionAction={handleCloseDeletePopup}
        />
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
  postAuthorId: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  createdDate: PropTypes.object.isRequired,
  userStatus: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  isEdited: PropTypes.bool.isRequired,
  authorProfilePhoto: PropTypes.object,
  accessToManagement: PropTypes.bool,
};

PostComment.defaultProps = {
  likes: [],
  sharing: false,
  highlightComment: false,
  accessToManagement: false,
};

export default withStyles(styles)(PostComment);
