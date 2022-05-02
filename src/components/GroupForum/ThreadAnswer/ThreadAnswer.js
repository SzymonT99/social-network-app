import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './threadAnswer-jss';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Badge, Button, Rating, TextField } from '@mui/material';
import defaultUserPhoto from '../../../assets/default-profile-photo.jpg';
import Typography from '@mui/material/Typography';
import ActionConfirmation from '../../ActionConfirmation/ActionConfirmation';
import { formatActivityDate } from '../../../utils/formatActivityDate';
import { showNotification } from '../../../redux/actions/notificationActions';
import {
  createGroupThreadAnswerReview,
  deleteGroupThreadAnswer,
  editGroupThreadAnswer,
  editGroupThreadAnswerReview,
} from '../../../redux/actions/groupActions';
import Popup from '../../Popup/Popup';

const activeStatus = {
  ONLINE: '#1CCD16',
  BE_RIGHT_BACK: '#f59c11',
  BUSY: '#67207c',
  OFFLINE: '#FF1C00',
};

const ThreadAnswer = (props) => {
  const {
    classes,
    memberName,
    authorId,
    groupId,
    answerId,
    text,
    userStatus,
    userProfilePhoto,
    createdDate,
    isEdited,
    reviews,
    averageRating,
    accessToManagement,
  } = props;

  const loggedUser = useSelector((state) => state.auth.user);

  const [isDisabled, setIsDisabled] = useState(true);
  const [answerText, setAnswerText] = useState(text);
  const [openDeleteAnswerPopup, setOpenDeleteAnswerPopup] = useState(false);

  const answerInputRef = useRef(null);

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isDisabled) {
      answerInputRef.current.focus();
    }
  }, [isDisabled]);

  const handleChangeRating = (event, newValue) => {
    dispatch(createGroupThreadAnswerReview(groupId, answerId, newValue)).then(
      (response) => {
        if (response.status === 409) {
          const userReviewId = reviews.find(
            ({ author }) => author.user.userId === loggedUser.userId
          ).answerReviewId;
          dispatch(
            editGroupThreadAnswerReview(groupId, userReviewId, newValue)
          );
        }
      }
    );
  };

  const handleChangeAnswer = (event) => {
    setAnswerText(event.target.value);
  };

  const handleClickEditAnswer = () => {
    if (answerText === '') {
      dispatch(
        showNotification('warning', 'Nie można pozostawić pustej treści')
      );
    } else {
      dispatch(editGroupThreadAnswer(groupId, answerId, answerText));
      setIsDisabled(true);
    }
  };

  const handleClickDeleteAnswer = () => {
    dispatch(deleteGroupThreadAnswer(groupId, answerId));
    setOpenDeleteAnswerPopup(false);
  };

  const handleCloseDeleteAnswerPopup = () => {
    setOpenDeleteAnswerPopup(false);
  };

  return (
    <div className={classes.answerContainer}>
      <div style={{ display: 'flex' }}>
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
              src={userProfilePhoto ? userProfilePhoto.url : defaultUserPhoto}
              alt={memberName}
              className={classes.memberPhotoSmall}
              onClick={() => history.push('app/profile/' + authorId)}
            />
          </Badge>
        </div>
        <div style={{ width: '100%' }}>
          <div className={classes.answerContent}>
            <div className={classes.answerHeading}>
              <Typography variant="subtitle2" fontWeight="bold">
                <span
                  className={classes.authorName}
                  onClick={() => history.push('/app/profile/' + authorId)}
                >
                  {memberName}
                </span>
                <span className={classes.answerTime}>
                  {' odpowiedział(a) ' +
                    formatActivityDate(new Date(createdDate)) +
                    (isEdited ? ' (edytowany)' : '')}
                </span>
              </Typography>
              <Rating
                name="answer-rating"
                precision={0.2}
                value={averageRating}
                sx={{ '&.Mui-disabled': { opacity: 1 } }}
                onChange={(event, newValue) =>
                  handleChangeRating(event, newValue)
                }
              />
            </div>
            <TextField
              fullWidth
              multiline
              disabled={isDisabled}
              inputRef={answerInputRef}
              maxRows={3}
              className={classes.answerInput}
              value={answerText}
              onChange={handleChangeAnswer}
            />
          </div>
          {!isDisabled && (
            <div className={classes.editActionContainer}>
              <Button
                color="secondary"
                variant="contained"
                className={classes.editActionBtn}
                onClick={handleClickEditAnswer}
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
        </div>
      </div>
      {(authorId === loggedUser.userId || accessToManagement === true) && (
        <div className={classes.answerBtnContainer}>
          <Button
            className={classes.answerActionItem}
            style={{ marginRight: '20px' }}
            variant="text"
            onClick={() => setIsDisabled(false)}
          >
            Edytuj
          </Button>
          <Button
            className={classes.answerActionItem}
            variant="text"
            onClick={() => setOpenDeleteAnswerPopup(true)}
          >
            Usuń
          </Button>
        </div>
      )}
      <Popup
        open={openDeleteAnswerPopup}
        type="confirmation"
        title="Usuwanie odpowiedzi na wątek grupy"
        onClose={handleCloseDeleteAnswerPopup}
      >
        <ActionConfirmation
          title="Czy napewno chcesz usunąć wskazaną odpowiedź?"
          confirmationAction={handleClickDeleteAnswer}
          rejectionAction={handleCloseDeleteAnswerPopup}
        />
      </Popup>
    </div>
  );
};

ThreadAnswer.propTypes = {
  classes: PropTypes.object.isRequired,
  authorId: PropTypes.number.isRequired,
  groupId: PropTypes.number.isRequired,
  answerId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  userStatus: PropTypes.string.isRequired,
  memberName: PropTypes.string.isRequired,
  userProfilePhoto: PropTypes.object,
  createdDate: PropTypes.string.isRequired,
  isEdited: PropTypes.bool.isRequired,
  reviews: PropTypes.array.isRequired,
  averageRating: PropTypes.number,
  accessToManagement: PropTypes.bool,
};

ThreadAnswer.defaultProps = {
  averageRating: 0,
  accessToManagement: false,
};

export default withStyles(styles)(ThreadAnswer);
