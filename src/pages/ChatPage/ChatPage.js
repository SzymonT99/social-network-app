import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './chatPage-jss';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';
import { Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Popup from '../../components/Popup/Popup';
import ChatForm from '../../components/Forms/ChatForm';
import {
  getChatDetails,
  getChatMessageById,
  getUserChats,
} from '../../redux/actions/chatAction';

let stompClient = null;

const ChatPage = (props) => {
  const { classes } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);
  const isUserRemember = useSelector((state) => state.auth.remember);

  const userChats = useSelector((state) => state.chats.userChats);
  const currentChat = useSelector((state) => state.chats.chatDetails);

  const [openChatCreationPopup, setOpenChatCreationPopup] = useState(false);
  const [text, setText] = useState('');
  const [activeChat, setActiveChat] = useState(undefined);

  useEffect(() => {
    dispatch(getUserChats()).then((data) => {
      if (data.length !== 0) {
        setActiveChat(data[0].chatId);
        dispatch(getChatDetails(data[0].chatId));
      }
    });
  }, []);

  useEffect(() => {
    if (activeChat !== undefined) {
      if (stompClient !== null) {
        stompClient.unsubscribe('topic', {});
      }
      dispatch(getChatDetails(activeChat));
      chatConnect();
    }
  }, [activeChat]);

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
    stompClient.subscribe('/topic/messages/' + activeChat, onMessageReceived, {
      id: 'topic',
    });
  };

  const onError = (err) => {
    console.log(err);
  };

  const onMessageReceived = (response) => {
    const messageNotification = JSON.parse(response.body);
    if (activeChat === messageNotification.chatId) {
      dispatch(getChatMessageById(messageNotification.messageId));
    }

    dispatch(getUserChats());
  };

  const sendMessage = (text) => {
    if (stompClient) {
      const message = {
        chatId: activeChat,
        userId: loggedUser.userId,
        message: text,
        messageType: 'CHAT',
      };
      stompClient.send(
        '/app/chat/' + activeChat,
        { Authorization: 'Bearer ' + loggedUser.accessToken },
        JSON.stringify(message)
      );
    }
  };

  const handleCloseChatCreationPopup = () => {
    setOpenChatCreationPopup(false);
  };

  return (
    <div className={classes.chatContainer}>
      <div className={classes.conversationsContainer}>
        <div style={{ height: '100px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenChatCreationPopup(true)}
          >
            Utwórz nowy czat
          </Button>
          <Popup
            open={openChatCreationPopup}
            type="chat"
            title="Utwórz czat"
            onClose={handleCloseChatCreationPopup}
          >
            <ChatForm closePopup={handleCloseChatCreationPopup} />
          </Popup>
        </div>
        {userChats &&
          userChats.map((chat) => (
            <Button
              key={chat.chatId}
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ margin: '10px 0px' }}
              onClick={() => setActiveChat(chat.chatId)}
            >
              {chat.name}
            </Button>
          ))}
      </div>
      <div className={classes.chatMessagesContainer}>
        <div style={{ height: '90%' }}>
          {currentChat &&
            currentChat.messages &&
            currentChat.messages.map((msg) => (
              <Typography key={msg.messageId} variant="h5" textAlign="center">
                {msg.createdAt +
                  ' --- ' +
                  msg.author.firstName +
                  ': ' +
                  msg.text}
              </Typography>
            ))}
        </div>
        <div style={{ textAlign: 'right' }}>
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
    </div>
  );
};

ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatPage);
