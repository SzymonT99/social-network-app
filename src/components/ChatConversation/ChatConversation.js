import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './chatConversation-jss';
import { PropTypes } from 'prop-types';
import defaultChatImage from '../../assets/default-chat-image.png';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import { Typography } from '@mui/material';
import { formatCreationDate } from '../../utils/formatCreationDate';
import { setActiveChat } from '../../redux/actions/chatAction';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

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
        <img
          src={friend.profilePhoto ? friend.profilePhoto.url : defaultUserPhoto}
          className={classes.chatImage}
          alt="Zdjęcie czatu"
        />
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
          {lastMessage && lastMessageAuthor
            ? lastMessageAuthor.userId === loggedUser.userId
              ? 'Ty: ' + lastMessage
              : lastMessageAuthor.firstName + ': ' + lastMessage
            : 'Brak wiadomości'}
        </Typography>
        {activityDate && (
          <Typography fontSize="10px" fontWeight={300} lineHeight={1}>
            {formatCreationDate(new Date(activityDate))}
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
