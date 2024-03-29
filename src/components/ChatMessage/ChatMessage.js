import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './chatMessage-jss';
import { PropTypes } from 'prop-types';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import {
  Badge,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { showNotification } from '../../redux/actions/notificationActions';
import {
  deleteChatMessage,
  editChatMessage,
  getChatDetails,
} from '../../redux/actions/chatAction';
import Popup from '../Popup/Popup';
import ActionConfirmation from '../ActionConfirmation/ActionConfirmation';
import classNames from 'classnames';
import { formatBaseDate } from '../../utils/formatBaseDate';
import { formatDateWithTime } from '../../utils/formatDateWithTime';
import ModalImage from 'react-modal-image-responsive';

const activeStatus = {
  ONLINE: '#1CCD16',
  BE_RIGHT_BACK: '#f59c11',
  BUSY: '#67207c',
  OFFLINE: '#FF1C00',
};

const ChatMessage = (props) => {
  const {
    classes,
    chatId,
    messageId,
    content,
    author,
    messageType,
    createdAt,
    isEdited,
    isDeleted,
    messageImage,
    isAuthorDeleted,
    manageMessage,
  } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);

  const isAdmin = loggedUser && loggedUser.roles.indexOf('ROLE_ADMIN') > -1;

  const messageRef = useRef(null);

  const [isEditable, setIsEditable] = useState(false);
  const [messageText, setMessageText] = useState(
    !isDeleted ? content : 'Usunięto wiadomość'
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  useEffect(() => {
    setMessageText(!isDeleted ? content : 'Usunięto wiadomość');
  }, [isDeleted, content]);

  useEffect(() => {
    if (isEditable) {
      messageRef.current.focus();
    }
  }, [isEditable]);

  const generatePublicationDate = (messageDate) => {
    if (
      new Date(messageDate).getDay() === new Date().getDay() &&
      new Date(messageDate).getFullYear() === new Date().getFullYear()
    ) {
      return formatDateWithTime(messageDate).slice(10, 16);
    } else {
      return (
        <span>
          <span>{formatBaseDate(messageDate)}</span>
          <br />
          <span>{formatDateWithTime(messageDate).slice(10, 16)}</span>
        </span>
      );
    }
  };

  const Typing = ({ isAuthor }) => (
    <div
      className={classes.typingContainer}
      style={{ backgroundColor: !isAuthor && '#ECEEF1' }}
    >
      <div className={classes.typingDot} />
      <div className={classes.typingDot} />
      <div className={classes.typingDot} />
    </div>
  );

  const handleCloseMessageManage = () => {
    setAnchorEl(null);
  };

  const handleClickMessageManage = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickEditMessage = () => {
    handleCloseMessageManage();
    setIsEditable(true);
  };

  const editMessage = () => {
    if (messageText === '') {
      dispatch(
        showNotification('warning', 'Nie można pozostawić pustej treści')
      );
    } else {
      const message = {
        chatId: chatId,
        userId: author.userId,
        message: document.getElementById('message').textContent,
        messageType: messageType,
      };

      dispatch(editChatMessage(messageId, message));
      manageMessage('MESSAGE_EDIT', chatId, author.userId, messageId);
      setIsEditable(false);
    }
  };

  const cancelEdit = () => {
    setIsEditable(false);
    dispatch(getChatDetails(chatId));
  };

  const handleClickDeleteMessage = () => {
    handleCloseMessageManage();
    setOpenDeletePopup(true);
  };

  const deleteMessage = () => {
    dispatch(deleteChatMessage(messageId));
    manageMessage('MESSAGE_DELETE', chatId, author.userId, messageId);
    setOpenDeletePopup(false);
  };

  const handleCloseDeletePopup = () => {
    setOpenDeletePopup(false);
  };

  return (
    <div
      className={
        loggedUser.userId !== author.userId
          ? classes.otherMessageContainer
          : classes.userMessageContainer
      }
    >
      <div
        className={
          loggedUser.userId !== author.userId
            ? classes.otherAuthorContainer
            : classes.userAuthorContainer
        }
      >
        <Badge
          variant="dot"
          overlap="circular"
          className={classes.avatarBadge}
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: activeStatus[author.activityStatus],
            },
          }}
        >
          <Avatar
            src={
              author.profilePhoto ? author.profilePhoto.url : defaultUserPhoto
            }
            alt={author.firstName + ' ' + author.lastName}
            className={classes.authorPhoto}
            onClick={() => history.push('/app/profile/' + author.userId)}
          />
        </Badge>
        {messageType !== 'TYPING' && (
          <Typography fontSize="11px" className={classes.messageTimeText}>
            {generatePublicationDate(createdAt)}
          </Typography>
        )}
      </div>
      {messageType === 'CHAT' && (
        <div className={classes.messageContent}>
          <Typography variant="subtitle2" fontWeight={500}>
            {author.firstName + ' ' + author.lastName}
            <span className={classes.authorIsNotMemberText}>
              {isAuthorDeleted ? ' (Nie należy już do czatu)' : ''}
            </span>
          </Typography>
          {isEdited && !isDeleted && (
            <Typography fontSize="11px" fontWeight={300} lineHeight={1.2}>
              (edytowano)
            </Typography>
          )}
          {messageImage && (
            <ModalImage
              className={classes.sentImage}
              small={messageImage.url}
              medium={messageImage.url}
              large={messageImage.url}
              hideZoom
            />
          )}
          {!messageImage && (
            <div
              className={
                loggedUser.userId === author.userId || isAdmin
                  ? classes.messageDetailsContent
                  : null
              }
              style={{
                flexDirection:
                  isAdmin &&
                  loggedUser.userId !== author.userId &&
                  'row-reverse',
              }}
            >
              {(loggedUser.userId === author.userId || isAdmin) && !isDeleted && (
                <div className={classes.manageMessageBox}>
                  <IconButton onClick={handleClickMessageManage}>
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMessageManage}
                    disableScrollLock={true}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={handleClickEditMessage}>
                      <ListItemIcon>
                        <EditIcon fontSize="medium" />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography variant="subtitle2">
                            Edytuj wiadomość
                          </Typography>
                        }
                      />
                    </MenuItem>
                    <MenuItem onClick={handleClickDeleteMessage}>
                      <ListItemIcon>
                        <DeleteForeverIcon fontSize="medium" />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography variant="subtitle2">
                            Usuń wiadomość
                          </Typography>
                        }
                      />
                    </MenuItem>
                  </Menu>
                  <Popup
                    open={openDeletePopup}
                    type="confirmation"
                    title="Usuwanie wiadomości"
                    onClose={handleCloseDeletePopup}
                  >
                    <ActionConfirmation
                      title="Czy napewno chcesz usunąć wskazaną wiadomość?"
                      confirmationAction={deleteMessage}
                      rejectionAction={handleCloseDeletePopup}
                    />
                  </Popup>
                </div>
              )}
              <div
                id="message"
                contentEditable={isEditable}
                ref={messageRef}
                className={
                  loggedUser.userId !== author.userId
                    ? classes.otherMessageField
                    : classes.userMessageField
                }
              >
                {messageText}
              </div>
            </div>
          )}
          {isEditable && (
            <div>
              <Link
                component="button"
                variant="body2"
                className={classes.messageEditBtn}
                onClick={editMessage}
              >
                Zapisz
              </Link>
              <Link
                component="button"
                className={classes.messageEditBtn}
                onClick={cancelEdit}
              >
                Anuluj
              </Link>
            </div>
          )}
        </div>
      )}
      {(messageType === 'JOIN' ||
        messageType === 'LEAVE' ||
        messageType === 'CREATE') && (
        <Typography variant="subtitle2" fontWeight="bold">
          {author.firstName + ' ' + author.lastName}
          <span className={classes.authorIsNotMemberText}>
            {isAuthorDeleted ? ' (Nie należy już do czatu)' : ''}
          </span>
          <br />
          <span className={classes.messageTypeText}>
            {messageType !== 'CREATE'
              ? messageType === 'JOIN'
                ? 'dołączył(a) do czatu'
                : 'opuścił(a) czat'
              : 'utworzył(a) czat'}
          </span>
        </Typography>
      )}
      {messageType === 'TYPING' && (
        <div
          className={classNames(
            classes.messageContent,
            loggedUser.userId === author.userId && classes.authorMessageTyping
          )}
        >
          <Typography variant="subtitle2" fontWeight={500} marginBottom="3px">
            {author.firstName + ' ' + author.lastName}
          </Typography>
          <Typing isAuthor={loggedUser.userId === author.userId} />
        </div>
      )}
    </div>
  );
};

ChatMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  chatId: PropTypes.number.isRequired,
  messageId: PropTypes.number,
  content: PropTypes.string,
  author: PropTypes.object.isRequired,
  messageType: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  isEdited: PropTypes.bool,
  editedAt: PropTypes.string,
  isDeleted: PropTypes.bool,
  messageImage: PropTypes.object,
  isAuthorDeleted: PropTypes.bool,
  manageMessage: PropTypes.func,
};

export default withStyles(styles)(ChatMessage);
