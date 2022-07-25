import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './chatConversation-jss';
import { PropTypes } from 'prop-types';
import defaultChatImage from '../../assets/default-chat-image.png';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import { Badge, Typography } from '@mui/material';
import { formatActivityDate } from '../../utils/formatActivityDate';
import { setActiveChat } from '../../redux/actions/chatAction';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import Avatar from '@mui/material/Avatar';

const activeStatus = {
  ONLINE: '#1CCD16',
  BE_RIGHT_BACK: '#f59c11',
  BUSY: '#67207c',
  OFFLINE: '#FF1C00',
};

const ChatConversation = (props) => {
  const {
    classes,
    chatId,
    chatName,
    chatImage,
    activityDate,
    lastMessage,
    lastMessageAuthor,
    newMessagesNumber,
    isPrivate,
    friend,
  } = props;

  const activeChatId = useSelector((state) => state.chats.activeChat);
  const loggedUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const generateChatActivityInformation = () => {
    if (lastMessage && lastMessageAuthor) {
      if (lastMessageAuthor.userId === loggedUser.userId) {
        return 'Ty: ' + lastMessage;
      } else if (isPrivate) {
        return lastMessage;
      } else {
        return lastMessageAuthor.firstName + ': ' + lastMessage;
      }
    } else {
      return 'Brak wiadomości';
    }
  };

  return (
    <div
      className={classNames(
        classes.conversationContainer,
        activeChatId && activeChatId === chatId && classes.selectedConversation
      )}
      onClick={() => dispatch(setActiveChat(chatId))}
    >
      {!isPrivate ? (
        <img
          src={chatImage ? chatImage.url : defaultChatImage}
          className={classes.chatImage}
          alt="Zdjęcie czatu"
        />
      ) : (
        <Badge
          variant="dot"
          overlap="circular"
          className={classes.avatarBadge}
          sx={{
            '& .MuiBadge-badge': {
              border: `1px solid #FFF`,
              backgroundColor: activeStatus[friend.activityStatus],
            },
          }}
        >
          <Avatar
            src={
              friend.profilePhoto ? friend.profilePhoto.url : defaultUserPhoto
            }
            className={classes.friendChatImage}
            alt="Zdjęcie znajomego"
          />
        </Badge>
      )}
      <div className={classes.contentContainer}>
        <Typography
          variant="subtitle1"
          className={classes.conversationNameText}
          noWrap
        >
          {!isPrivate ? chatName : friend.firstName + ' ' + friend.lastName}
        </Typography>
        <Typography
          variant="body2"
          noWrap
          className={classes.conversationLastMessageText}
        >
          {generateChatActivityInformation()}
        </Typography>
        {activityDate && (
          <Typography className={classes.conversationDate}>
            {formatActivityDate(new Date(activityDate))}
          </Typography>
        )}
      </div>
      {newMessagesNumber > 0 && chatId !== activeChatId && (
        <div className={classes.notificationNumber}>{newMessagesNumber}</div>
      )}
    </div>
  );
};

ChatConversation.propTypes = {
  classes: PropTypes.object.isRequired,
  chatId: PropTypes.number.isRequired,
  chatName: PropTypes.string.isRequired,
  lastMessage: PropTypes.string,
  lastMessageAuthor: PropTypes.object,
  activityDate: PropTypes.string,
  newMessagesNumber: PropTypes.number.isRequired,
  chatImage: PropTypes.object,
  isPrivate: PropTypes.bool,
  friend: PropTypes.object,
};

export default withStyles(styles)(ChatConversation);
