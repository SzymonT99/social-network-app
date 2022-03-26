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
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Tooltip,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Popup from '../../components/Popup/Popup';
import ChatForm from '../../components/Forms/ChatForm';
import {
  addTypingMessage,
  deleteChat,
  deleteMemberFromChat,
  getChatDetails,
  getChatMessageById,
  getUserChats,
  setActiveChat,
} from '../../redux/actions/chatAction';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatConversation from '../../components/ChatConversation/ChatConversation';
import ChatMessage from '../../components/ChatMessage/ChatMessage';
import ImageIcon from '@mui/icons-material/Image';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';
import defaultChatImage from '../../assets/default-chat-image.png';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import ActionConfirmation from '../../components/ActionConfirmation/ActionConfirmation';
import ChatMember from '../../components/ChatMember/ChatMember';
import { ExitToApp } from '@mui/icons-material';
import SentInvitation from '../../components/SentInvitation/SentInvitation';
import SearchIcon from '@mui/icons-material/Search';
import chatTypes from '../../redux/types/chatTypes';

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

  const users = useSelector((state) => state.activity.users);
  const userChats = useSelector((state) => state.chats.userChats);
  const currentChat = useSelector((state) => state.chats.chatDetails);

  const activeChatId = useSelector((state) => state.chats.activeChat);

  const [openChatCreationPopup, setOpenChatCreationPopup] = useState(false);
  const [openChatEditionPopup, setOpenChatEditionPopup] = useState(false);
  const [openDeleteChatPopup, setOpenDeleteChatPopup] = useState(false);
  const [openLeaveChatPopup, setOpenLeaveChatPopup] = useState(false);
  const [openChatInvitationsPopup, setOpenChatInvitationsPopup] =
    useState(false);
  const [text, setText] = useState('');
  const [searchedUserName, setSearchedUserName] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    dispatch(getUserChats()).then((data) => {
      if (data.length !== 0 && !activeChatId) {
        dispatch(setActiveChat(data[0].chatId));
        dispatch(getChatDetails(data[0].chatId));
      }
    });
    return () => {
      dispatch(setActiveChat(undefined));
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
    if (
      activeChatId === messageNotification.chatId &&
      messageNotification.messageType !== 'TYPING' &&
      messageNotification.messageType !== 'MESSAGE_DELETE'
    ) {
      if (messageNotification.messageType !== 'MESSAGE_EDIT') {
        dispatch(getChatMessageById(messageNotification.messageId));
      } else {
        setTimeout(() => {
          dispatch(getChatMessageById(messageNotification.messageId, true));
        }, 2000);
      }
    } else if (
      activeChatId === messageNotification.chatId &&
      messageNotification.messageType === 'TYPING'
    ) {
      let typingMessage = {
        messageType: messageNotification.messageType,
        text: messageNotification.typingMessage,
        author: messageNotification.author,
        isEdited: false,
        isDeleted: false,
      };
      dispatch(addTypingMessage(typingMessage));
    } else if (
      activeChatId === messageNotification.chatId &&
      messageNotification.messageType === 'MESSAGE_DELETE'
    ) {
      dispatch({
        type: chatTypes.DELETE_MESSAGE,
        payload: {
          messageId: messageNotification.messageId,
        },
      });
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
      setText('');
    }
  };

  const handleCloseChatCreationPopup = () => {
    setOpenChatCreationPopup(false);
  };

  const handleClickChatEdit = () => {
    setOpenChatEditionPopup(true);
  };

  const handleCloseChatEditionPopup = () => {
    setOpenChatEditionPopup(false);
  };

  const handleChangeMessageText = (event) => {
    let typingMessage = event.target.value;
    setText(typingMessage);
    stompClient.send(
      '/app/chat/' + activeChatId,
      { Authorization: 'Bearer ' + loggedUser.accessToken },
      JSON.stringify({
        chatId: activeChatId,
        userId: loggedUser.userId,
        messageType: 'TYPING',
        message: typingMessage,
      })
    );
  };

  const handleClickDeleteChat = () => {
    setOpenDeleteChatPopup(true);
  };

  const handleCloseDeleteChatPopup = () => {
    setOpenDeleteChatPopup(false);
  };

  const deleteChatClick = () => {
    handleCloseDeleteChatPopup();
    dispatch(deleteChat(currentChat.chatId));
  };

  const handleCloseLeaveChatPopup = () => {
    setOpenLeaveChatPopup(false);
  };

  const handleClickLeaveChat = () => {
    handleCloseLeaveChatPopup();
    let userMemberId = currentChat.chatMembers.find(
      (member) => member.user.userId === loggedUser.userId
    ).chatMemberId;
    dispatch(deleteMemberFromChat(userMemberId, false));
    stompClient.send(
      '/app/chat/' + activeChatId,
      { Authorization: 'Bearer ' + loggedUser.accessToken },
      JSON.stringify({
        chatId: activeChatId,
        userId: loggedUser.userId,
        messageType: 'LEAVE',
      })
    );
  };

  const addUserToChat = (chatId, addedUserId) => {
    stompClient.send(
      '/app/chat/' + chatId,
      { Authorization: 'Bearer ' + loggedUser.accessToken },
      JSON.stringify({
        chatId: chatId,
        userId: addedUserId,
        messageType: 'JOIN',
      })
    );
  };

  const manageMessage = (type, chatId, userId, messageId) => {
    stompClient.send(
      '/app/chat/' + chatId,
      { Authorization: 'Bearer ' + loggedUser.accessToken },
      JSON.stringify({
        chatId: chatId,
        messageType: type,
        userId: userId,
        editedMessageId: messageId,
      })
    );
  };

  const handleCloseChatInvitationsPopup = () => {
    setOpenChatInvitationsPopup(false);
  };

  const handleChangeSearchedUserName = (event) => {
    const typedText = event.target.value;
    setSearchedUserName(typedText);

    if (typedText !== '') {
      setSearchedUsers(
        users.filter((user) => {
          let userName = user.firstName + ' ' + user.lastName;
          return (
            userName.toUpperCase().includes(typedText.toUpperCase()) &&
            currentChat.chatMembers.filter(
              (member) => member.user.userId === user.userId
            ).length === 0
          );
        })
      );
    } else {
      setSearchedUsers([]);
    }
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
                      lastMessageAuthor={chat.lastMessageAuthor}
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
            {currentChat.messages &&
              currentChat.messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  messageId={message.messageId}
                  chatId={currentChat.chatId}
                  messageType={message.messageType}
                  content={message.text}
                  messageImage={message.image}
                  author={message.author}
                  isAuthorDeleted={
                    currentChat.chatMembers.filter(
                      (member) => member.user.userId === message.author.userId
                    ).length === 0
                  }
                  createdAt={message.createdAt}
                  isEdited={message.isEdited}
                  isDeleted={message.isDeleted}
                  manageMessage={manageMessage}
                />
              ))}
            <ScrollToBottom />
          </div>
          <div className={classes.messageCreationContainer}>
            <IconButton>
              <SentimentSatisfiedAltIcon fontSize="medium" color="primary" />
            </IconButton>
            <IconButton>
              <ImageIcon fontSize="medium" color="primary" />
            </IconButton>
            <TextField
              fullWidth
              placeholder="Napisz widaomość"
              variant="outlined"
              onChange={handleChangeMessageText}
              value={text}
              className={classes.messageInput}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  sendMessage(text);
                  e.preventDefault();
                }
              }}
            />
            <Button
              color="primary"
              variant="contained"
              sx={{ height: '55px' }}
              onClick={() => sendMessage(text)}
              className={classes.sendMessageBtn}
            >
              Wyślij
              <SendIcon fontSize="medium" />
            </Button>
          </div>
        </div>
        <div className={classes.chatSettingsContainer}>
          <div className={classes.chatInfoContainer}>
            {!currentChat.isPrivate ? (
              <img
                src={
                  currentChat.image ? currentChat.image.url : defaultChatImage
                }
                className={classes.activeChatImage}
                alt="Zdjęcie czatu"
              />
            ) : (
              <img
                src={
                  currentChat.chatMembers.find(
                    (member) => member.user.userId !== loggedUser.userId
                  ).user.profilePhoto
                    ? currentChat.chatMembers.find(
                        (member) => member.user.userId !== loggedUser.userId
                      ).user.profilePhoto.url
                    : defaultUserPhoto
                }
                className={classes.activeChatImage}
                alt="Zdjęcie znajomego"
              />
            )}
            {!currentChat.isPrivate ? (
              <Typography variant="h5" className={classes.chatNameText}>
                {currentChat.name}
              </Typography>
            ) : (
              <Typography variant="h5" className={classes.chatNameText}>
                {currentChat.chatMembers.find(
                  (member) => member.user.userId !== loggedUser.userId
                ).user.firstName +
                  ' ' +
                  currentChat.chatMembers.find(
                    (member) => member.user.userId !== loggedUser.userId
                  ).user.lastName}
              </Typography>
            )}
            {currentChat.isPrivate && (
              <Link
                component="button"
                variant="body1"
                className={classes.friendProfileLink}
                onClick={() =>
                  history.push(
                    '/app/profile/' +
                      currentChat.chatMembers.find(
                        (member) => member.user.userId !== loggedUser.userId
                      ).user.userId
                  )
                }
              >
                Zobacz profil
              </Link>
            )}
            {!currentChat.isPrivate &&
              currentChat.chatCreator &&
              currentChat.chatCreator.userId === loggedUser.userId && (
                <div className={classes.chatManageBtnContainer}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClickChatEdit}
                  >
                    Edytuj
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickDeleteChat}
                  >
                    Usuń
                  </Button>
                  <Popup
                    open={openChatEditionPopup}
                    type="chat"
                    title="Edytuj czat"
                    onClose={handleCloseChatEditionPopup}
                  >
                    <ChatForm
                      closePopup={handleCloseChatEditionPopup}
                      edition
                      chatId={currentChat.chatId}
                      editedName={currentChat.name}
                      editedImage={currentChat.image}
                    />
                  </Popup>
                  <Popup
                    open={openDeleteChatPopup}
                    type="confirmation"
                    title="Usuwanie czatu"
                    onClose={handleCloseDeleteChatPopup}
                  >
                    <ActionConfirmation
                      title="Czy napewno chcesz usunąć czat?"
                      confirmationAction={deleteChatClick}
                      rejectionAction={handleCloseDeleteChatPopup}
                    />
                  </Popup>
                </div>
              )}
          </div>
          <div className={classes.chatSettingsContent}>
            <Accordion className={classes.activeChatInfoBox} disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} id="chat-info">
                <Typography variant="subtitle1">Informacje</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {!currentChat.isPrivate && (
                  <Typography variant="body1" className={classes.chatInfoRow}>
                    <ChatBubbleIcon />
                    {'Nazwa: ' + currentChat.name}
                  </Typography>
                )}
                <Typography variant="body1" className={classes.chatInfoRow}>
                  <AddCircleIcon />
                  {'Data utworzenia: ' +
                    new Date(currentChat.createdAt)
                      .toJSON()
                      .slice(0, 10)
                      .split('-')
                      .reverse()
                      .join('.')}
                </Typography>
                {!currentChat.isPrivate && currentChat.chatCreator && (
                  <Typography variant="body1" className={classes.chatInfoRow}>
                    <PersonIcon />
                    {'Autor: '}
                    <Tooltip title="Zobacz profil" placement="right">
                      <span
                        className={classes.activeChatAuthorLink}
                        onClick={() =>
                          history.push(
                            '/app/profile/' + currentChat.chatCreator.userId
                          )
                        }
                      >
                        {currentChat.chatCreator.firstName +
                          ' ' +
                          currentChat.chatCreator.lastName}
                      </span>
                    </Tooltip>
                  </Typography>
                )}
                {!currentChat.isPrivate && (
                  <Typography variant="body1" className={classes.chatInfoRow}>
                    <GroupIcon />
                    {'Liczba członków: ' + currentChat.chatMembers.length}
                  </Typography>
                )}
                <Typography variant="body1" className={classes.chatInfoRow}>
                  <MessageIcon />
                  {'Liczba wiadomości: ' + currentChat.messages.length}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className={classes.activeChatInfoBox} disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} id="chat-image">
                <Typography variant="subtitle1">Zdjęcia</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">{'Zdjęcia: '}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className={classes.activeChatInfoBox} disableGutters>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="chat-members"
              >
                <Typography variant="subtitle1">Członkowie</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {currentChat.chatMembers.map((member) => (
                  <ChatMember
                    key={member.chatMemberId}
                    memberId={member.chatMemberId}
                    chatId={currentChat.chatId}
                    userMember={member.user}
                    addedIn={member.addedIn}
                    canAddOthers={member.canAddOthers}
                    isPrivateChat={currentChat.isPrivate}
                    chatCreator={currentChat.chatCreator}
                  />
                ))}
                {currentChat.chatMembers.filter(
                  (member) =>
                    member.canAddOthers === true &&
                    member.user.userId === loggedUser.userId
                ).length !== 0 && (
                  <Button
                    color="secondary"
                    variant="text"
                    onClick={() => setOpenChatInvitationsPopup(true)}
                  >
                    <AddCircleOutlineIcon />
                    <Typography variant="subtitle1" marginLeft="10px">
                      Dodaj użytkowników
                    </Typography>
                  </Button>
                )}
                <Popup
                  open={openChatInvitationsPopup}
                  type="chatInvitations"
                  title="Dodaj do czatu"
                  onClose={handleCloseChatInvitationsPopup}
                >
                  <div className={classes.chatInvitationsContainer}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={500}
                      textAlign="center"
                    >
                      Wyszukaj oraz dodaj użytkowników do czatu
                    </Typography>
                    <TextField
                      id="user-searchbar"
                      fullWidth
                      placeholder="Szukaj osób"
                      value={searchedUserName}
                      sx={{ marginTop: '15px' }}
                      onChange={handleChangeSearchedUserName}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {searchedUsers.map((searchedUser) => (
                      <SentInvitation
                        key={searchedUser.userId}
                        chatInvitation
                        chatId={currentChat.chatId}
                        userId={searchedUser.userId}
                        name={
                          searchedUser.firstName + ' ' + searchedUser.lastName
                        }
                        avatar={searchedUser.profilePhoto}
                        addToChatNotification={addUserToChat}
                      />
                    ))}
                  </div>
                </Popup>
              </AccordionDetails>
            </Accordion>
            {currentChat.chatCreator &&
              currentChat.chatCreator.userId !== loggedUser.userId &&
              !currentChat.isPrivate && (
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.leaveChatBtn}
                  onClick={() => setOpenLeaveChatPopup(true)}
                >
                  <ExitToApp fontSize="medium" /> Opuść czat
                </Button>
              )}
            <Popup
              open={openLeaveChatPopup}
              type="confirmation"
              title="Usuwanie członka"
              onClose={handleCloseLeaveChatPopup}
            >
              <ActionConfirmation
                title="Czy napewno chcesz usunąć członka?"
                confirmationAction={handleClickLeaveChat}
                rejectionAction={handleCloseLeaveChatPopup}
              />
            </Popup>
          </div>
        </div>
      </Paper>
    </div>
  );
};

ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatPage);
