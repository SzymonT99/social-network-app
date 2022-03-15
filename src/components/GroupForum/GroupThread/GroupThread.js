import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './groupThread-jss';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Button,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import defaultUserPhoto from '../../../assets/default-profile-photo.jpg';
import defaultImg from '../../../assets/default-image.png';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThreadAnswer from '../ThreadAnswer/ThreadAnswer';
import { showNotification } from '../../../redux/actions/notificationActions';
import {
  createGroupThreadAnswer,
  deleteGroupThread,
} from '../../../redux/actions/groupActions';
import Popup from '../../Popup/Popup';
import ActionConfirmation from '../../ActionConfirmation/ActionConfirmation';
import GroupThreadForm from '../../Forms/GroupThreadForm';

const activeStatus = {
  ONLINE: '#1CCD16',
  BE_RIGHT_BACK: '#de681d',
  BUSY: '#67207c',
  OFFLINE: '#FF1C00',
};

const GroupThread = (props) => {
  const {
    classes,
    groupId,
    threadId,
    title,
    content,
    threadImage,
    groupMemberId,
    authorId,
    memberName,
    createdDate,
    isEdited,
    userProfilePhoto,
    userStatus,
    answers,
    accessToManagement,
  } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);
  const loggedUserProfile = useSelector((state) => state.auth.userProfile);

  const [createdAnswer, setCreatedAnswer] = useState('');
  const [openDeleteThreadPopup, setOpenDeleteThreadPopup] = useState(false);
  const [openThreadEditionPopup, setOpenThreadEditionPopup] = useState(false);

  const handleChangeCreatedAnswer = (event) => {
    setCreatedAnswer(event.target.value);
  };

  const handleClickAddAnswer = () => {
    if (createdAnswer === '') {
      dispatch(showNotification('warning', 'Nie podano treści odpowiedzi'));
    } else {
      dispatch(createGroupThreadAnswer(groupId, threadId, createdAnswer));
      setCreatedAnswer('');
    }
  };

  const handleCloseDeleteThreadPopup = () => {
    setOpenDeleteThreadPopup(false);
  };

  const handleClickDeleteThread = () => {
    dispatch(deleteGroupThread(groupId, threadId));
    setOpenDeleteThreadPopup(false);
  };

  const handleCloseThreadEditionPopup = () => {
    setOpenThreadEditionPopup(false);
  };

  return (
    <Accordion
      elevation={4}
      style={{ borderRadius: '10px' }}
      className={classes.threadContainer}
    >
      <AccordionSummary className={classes.threadHeadingContainer}>
        <Badge
          variant="dot"
          overlap="circular"
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: activeStatus[userStatus],
            },
          }}
        >
          <Avatar
            src={userProfilePhoto ? userProfilePhoto.url : defaultUserPhoto}
            alt={memberName}
            className={classes.memberPhoto}
            onClick={() => history.push('/app/profile/' + authorId)}
          />
        </Badge>
        <div className={classes.threadHeadingContent}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle2" fontWeight={300}>
            <span
              className={classes.memberNameText}
              onClick={(event) => {
                history.push('/app/profile/' + authorId);
                event.stopPropagation();
              }}
            >
              {memberName}
            </span>
            {' opublikował(a) dnia ' +
              new Date(createdDate)
                .toJSON()
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('.') +
              ' o godz. ' +
              new Date(createdDate).toJSON().slice(10, 16).replace('T', ' ')}
            {isEdited && <span style={{ fontWeight: 400 }}> (edytowano)</span>}
          </Typography>
        </div>
        <div className={classes.threadAnswersNumberInfo}>
          <QuestionAnswerIcon fontSize="large" />
          <Typography variant="h5" marginLeft="10px">
            {answers.length}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.threadDetailsContainer}>
        {(authorId === loggedUser.userId || accessToManagement === true) && (
          <div className={classes.threadManageContainer}>
            <Button
              className={classes.manageThreadAction}
              variant="text"
              onClick={() => setOpenThreadEditionPopup(true)}
            >
              <EditIcon /> Edytuj
            </Button>
            <Button
              className={classes.manageThreadAction}
              variant="text"
              onClick={() => setOpenDeleteThreadPopup(true)}
            >
              <DeleteIcon /> Usuń
            </Button>
            <Popup
              open={openThreadEditionPopup}
              type="groupThread"
              title="Edycja wątku forum"
              onClose={handleCloseThreadEditionPopup}
            >
              <GroupThreadForm
                closePopup={handleCloseThreadEditionPopup}
                groupId={groupId}
                edition
                threadId={threadId}
                editedTitle={title}
                editedContent={content}
                threadImage={threadImage ? threadImage : null}
              />
            </Popup>
            <Popup
              open={openDeleteThreadPopup}
              type="confirmation"
              title="Usuwanie wątku forum grupy"
              onClose={handleCloseDeleteThreadPopup}
            >
              <ActionConfirmation
                title="Czy napewno chcesz usunąć wskazany wątek forum?"
                confirmationAction={handleClickDeleteThread}
                rejectionAction={handleCloseDeleteThreadPopup}
              />
            </Popup>
          </div>
        )}
        <Divider />
        <div className={classes.threadDetailsContent}>
          <Typography variant="subtitle2">{content}</Typography>
          <img
            src={threadImage ? threadImage.url : defaultImg}
            alt="Zdjęcie wątku"
            className={classes.threadImage}
          />
        </div>
        <Typography variant="subtitle2" className={classes.answersNumberText}>
          {answers.length + ' odpowiedzi'}
        </Typography>
        <Divider />
        <div>
          {answers.map((answer) => (
            <ThreadAnswer
              key={answer.answerId}
              answerId={answer.answerId}
              groupId={groupId}
              text={answer.text}
              createdDate={answer.date}
              averageRating={answer.averageRating}
              groupMemberId={answer.author.groupMemberId}
              memberName={
                answer.author.user.firstName + ' ' + answer.author.user.lastName
              }
              authorId={answer.author.user.userId}
              userStatus={answer.author.user.activityStatus}
              userProfilePhoto={answer.author.user.profilePhoto}
            />
          ))}
        </div>
        {answers.length !== 0 && <Divider />}
        <div className={classes.createAnswerContainer}>
          <Avatar
            src={
              loggedUserProfile && loggedUserProfile.profilePhoto
                ? loggedUserProfile.profilePhoto.url
                : defaultUserPhoto
            }
            alt={
              loggedUserProfile && loggedUserProfile.profilePhoto
                ? loggedUserProfile.firstName + ' ' + loggedUserProfile.lastName
                : 'Zalogowany użytkownik'
            }
            className={classes.memberPhotoSmall}
          />
          <div className={classes.createAnswerContent}>
            <TextField
              placeholder="Odpowiedz na wątek"
              multiline
              maxRows={4}
              className={classes.answerInput}
              value={createdAnswer}
              onChange={handleChangeCreatedAnswer}
            />
            <Button
              variant="contained"
              color="secondary"
              className={classes.answerBtn}
              onClick={handleClickAddAnswer}
            >
              Dodaj odpowiedź
            </Button>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

GroupThread.propTypes = {
  classes: PropTypes.object.isRequired,
  groupId: PropTypes.number.isRequired,
  threadId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  threadImage: PropTypes.object,
  groupMemberId: PropTypes.number.isRequired,
  authorId: PropTypes.number.isRequired,
  userStatus: PropTypes.string.isRequired,
  memberName: PropTypes.string.isRequired,
  userProfilePhoto: PropTypes.object,
  isEdited: PropTypes.bool.isRequired,
  createdDate: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  accessToManagement: PropTypes.bool,
};

GroupThread.defaultProps = {
  accessToManagement: false,
};

export default withStyles(styles)(GroupThread);
