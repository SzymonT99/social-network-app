import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './chatMessage-jss';
import { PropTypes } from 'prop-types';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import {
  Badge,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const activeStatus = {
  ONLINE: '#1CCD16',
  BE_RIGHT_BACK: '#de681d',
  BUSY: '#67207c',
  OFFLINE: '#FF1C00',
};

const FONT_SIZE = 14;
const DEFAULT_MESSAGE_WIDTH = 60;
const MAX_MESSAGE_WIDTH = 350;

const ChatMessage = (props) => {
  const {
    classes,
    messageId,
    content,
    author,
    messageType,
    createdAt,
    isEdited,
    editedAt,
    isDeleted,
    messageImage,
  } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);

  const messageRef = useRef(null);

  const [isDisabled, setIsDisabled] = useState(true);
  const [messageText, setMessageText] = useState(content);
  const [messageFieldWidth, setMessageFieldWidth] = useState(
    DEFAULT_MESSAGE_WIDTH
  );
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (
      messageText.length * FONT_SIZE > DEFAULT_MESSAGE_WIDTH &&
      messageText.length * FONT_SIZE < MAX_MESSAGE_WIDTH
    ) {
      setMessageFieldWidth(messageText.length * (FONT_SIZE - 2));
    } else if (messageText.length * FONT_SIZE > MAX_MESSAGE_WIDTH) {
      setMessageFieldWidth(MAX_MESSAGE_WIDTH);
    } else {
      setMessageFieldWidth(DEFAULT_MESSAGE_WIDTH);
    }
  }, [messageText]);

  const generatePublicationDate = (messageDate) => {
    if (
      new Date(messageDate).getDate() === new Date().getDate() &&
      new Date(messageDate).getFullYear() === new Date().getFullYear()
    ) {
      return new Date(messageDate).toJSON().slice(10, 16).replace('T', ' ');
    } else {
      return (
        <span>
          <span>
            {new Date(messageDate)
              .toJSON()
              .slice(0, 10)
              .split('-')
              .reverse()
              .join('.')}
          </span>
          <br />
          <span>
            {new Date(messageDate).toJSON().slice(10, 16).replace('T', ' ')}
          </span>
        </span>
      );
    }
  };

  const handleMessageChange = (event) => {
    setMessageText(event.target.value);
  };

  const handleCloseMessageManage = () => {
    setAnchorEl(null);
  };

  const handleClickMessageManage = (event) => {
    setAnchorEl(event.currentTarget);
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
        <Typography fontSize="11px" className={classes.messageTimeText}>
          {generatePublicationDate(createdAt)}
        </Typography>
      </div>
      <div className={classes.messageContent}>
        <Typography variant="subtitle2" fontWeight={500}>
          {author.firstName + ' ' + author.lastName}
        </Typography>
        <div
          className={
            loggedUser.userId === author.userId && classes.messageDetailsContent
          }
        >
          {loggedUser.userId === author.userId && (
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
                <MenuItem>
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
                <MenuItem>
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
            </div>
          )}
          <TextField
            multiline
            disabled={isDisabled}
            inputRef={messageRef}
            className={
              loggedUser.userId !== author.userId
                ? classes.otherMessageField
                : classes.userMessageField
            }
            value={messageText}
            sx={{
              width: `${messageFieldWidth}px`,
            }}
            onChange={handleMessageChange}
          />
        </div>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  messageId: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  messageType: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  isEdited: PropTypes.bool,
  editedAt: PropTypes.string,
  isDeleted: PropTypes.bool,
  messageImage: PropTypes.object,
};

export default withStyles(styles)(ChatMessage);
