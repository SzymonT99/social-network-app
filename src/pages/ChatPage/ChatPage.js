import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './chatPage-jss';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';
import {
  Button,
  Divider,
  IconButton,
  Paper,
  TextField,
  Tooltip,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Popup from '../../components/Popup/Popup';
import ChatForm from '../../components/Forms/ChatForm';
import {
  getChatDetails,
  getChatMessageById,
  getUserChats,
  setActiveChat,
} from '../../redux/actions/chatAction';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatConversation from '../../components/ChatConversation/ChatConversation';
import ChatMessage from '../../components/ChatMessage/ChatMessage';

const ScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

let stompClient = null;

const ChatPage = (props) => {
  const { classes } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);
  const isUserRemember = useSelector((state) => state.auth.remember);

  const userChats = useSelector((state) => state.chats.userChats);
  const currentChat = useSelector((state) => state.chats.chatDetails);

  const activeChatId = useSelector((state) => state.chats.activeChat);

  const [openChatCreationPopup, setOpenChatCreationPopup] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(getUserChats()).then((data) => {
      if (data.length !== 0 && !activeChatId) {
        dispatch(setActiveChat(data[0].chatId));
        dispatch(getChatDetails(data[0].chatId));
      }
    });
    return () => {
      if (stompClient !== null) {
        stompClient.unsubscribe('topic', {});
      }
    };
  }, []);

  useEffect(() => {
    if (activeChatId !== undefined) {
      if (stompClient !== null) {
        stompClient.unsubscribe('topic', {});
      }
      dispatch(getChatDetails(activeChatId));
      chatConnect();
    }
  }, [activeChatId]);

  const chatConnect = () => {
    let currentUser = JSON.parse(localStorage.getItem('state')).auth.user;
    const Stomp = require('stompjs');
    let SockJS = require('sockjs-client');
    SockJS = new SockJS('http://localhost:8080/chat');
    stompClient = Stomp.over(SockJS);
    stompClient.connect(
      { Authorization: 'Bearer ' + currentUser.accessToken },
      onConnected,
      onError
    );
  };

  const onConnected = () => {
    stompClient.subscribe(
      '/topic/messages/' + activeChatId,
      onMessageReceived,
      {
        id: 'topic',
      }
    );
  };

  const onError = (err) => {
    console.log(err);
  };

  const onMessageReceived = (response) => {
    const messageNotification = JSON.parse(response.body);
    if (activeChatId === messageNotification.chatId) {
      dispatch(getChatMessageById(messageNotification.messageId));
    }

    dispatch(getUserChats());
  };

  const sendMessage = (text) => {
    if (stompClient) {
      const message = {
        chatId: activeChatId,
        userId: loggedUser.userId,
        message: text,
        messageType: 'CHAT',
      };
      stompClient.send(
        '/app/chat/' + activeChatId,
        { Authorization: 'Bearer ' + loggedUser.accessToken },
        JSON.stringify(message)
      );
    }
  };

  const handleCloseChatCreationPopup = () => {
    setOpenChatCreationPopup(false);
  };

  return (
    <div className={classes.wrapper}>
      <Paper elevation={4} className={classes.chatContainer}>
        <div className={classes.conversationsContainer}>
          <div className={classes.conversationsHeadingBox}>
            <Typography variant="h4">Czaty</Typography>
            <Tooltip title="Utwórz nowy czat" placement="top">
              <IconButton
                className={classes.addNewChatBtn}
                onClick={() => setOpenChatCreationPopup(true)}
              >
                <AddCircleOutlineIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Popup
              open={openChatCreationPopup}
              type="chat"
              title="Utwórz czat"
              onClose={handleCloseChatCreationPopup}
            >
              <ChatForm closePopup={handleCloseChatCreationPopup} />
            </Popup>
          </div>
          {userChats && (
            <div className={classes.conversationsContent}>
              <Typography variant="h6" className={classes.conversationsTitle}>
                Znajomi
              </Typography>
              <Divider className={classes.divider} />
              {userChats.map((chat) => {
                if (chat.isPrivate) {
                  return (
                    <ChatConversation
                      key={chat.chatId}
                      chatId={chat.chatId}
                      chatName={chat.name}
                      activityDate={chat.activityDate}
                      lastMessage={chat.lastMessage}
                      lastMessageAuthor={chat.lastMessageAuthor}
                      newMessagesNumber={chat.newMessages}
                      chatImage={chat.image}
                      isPrivate
                      friend={
                        chat.members.find(
                          (member) => member.user.userId !== loggedUser.userId
                        ).user
                      }
                    />
                  );
                }
              })}
              {userChats.filter((chat) => chat.isPrivate).length === 0 && (
                <Typography
                  variant="subtitle2"
                  className={classes.noConversationsInfo}
                >
                  Brak konwersacji
                </Typography>
              )}
              <Typography variant="h6" className={classes.conversationsTitle}>
                Konwersacje grupowe
              </Typography>
              <Divider className={classes.divider} />
              {userChats.map((chat) => {
                if (!chat.isPrivate) {
                  return (
                    <ChatConversation
                      key={chat.chatId}
                      chatId={chat.chatId}
                      chatName={chat.name}
                      activityDate={chat.activityDate}
                      lastMessage={chat.lastMessage}
                      newMessagesNumber={chat.newMessages}
                      chatImage={chat.image}
                    />
                  );
                }
              })}
              {userChats.filter((chat) => !chat.isPrivate).length === 0 && (
                <Typography
                  variant="subtitle2"
                  className={classes.noConversationsInfo}
                >
                  Brak konwersacji
                </Typography>
              )}
            </div>
          )}
        </div>
        <div className={classes.chatMessagesContainer}>
          <div className={classes.messagesContent}>
            {currentChat &&
              currentChat.messages &&
              currentChat.messages.map((message) => (
                <ChatMessage
                  key={message.messageId}
                  messageId={message.messageId}
                  messageType={message.messageType}
                  content={message.text}
                  messageImage={message.image}
                  author={message.author}
                  createdAt={message.createdAt}
                  isEdited={message.isEdited}
                  editedAt={message.editedAt}
                  isDeleted={message.isDeleted}
                />
              ))}
            <ScrollToBottom />
          </div>
          <div className={classes.messageCreationContainer}>
            <TextField
              sx={{ width: '60%' }}
              id="outlined-basic"
              placeholder="Napisz widaomość"
              variant="outlined"
              onChange={(event) => setText(event.target.value)}
            />
            <Button
              color="primary"
              variant="contained"
              sx={{ height: '55px' }}
              onClick={() => sendMessage(text)}
            >
              Wyślij
            </Button>
          </div>
        </div>
        <div className={classes.chatMembersContainer}></div>
      </Paper>
    </div>
  );
};

ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatPage);
