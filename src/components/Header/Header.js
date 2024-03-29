import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './header-jss';
import { PropTypes } from 'prop-types';
import logoWhite from '../../assets/logo-white.png';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import defaultChatImage from '../../assets/default-chat-image.png';
import defaultImg from '../../assets/default-image.png';
import Typography from '@mui/material/Typography';
import {
  Autocomplete,
  Badge,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  TextField,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import {
  getReceivedFriendInvitations,
  respondToFriendInvitation,
} from '../../redux/actions/friendAction';
import { getActivityNotification } from '../../redux/actions/userActivityActions';
import { formatActivityDate } from '../../utils/formatActivityDate';
import {
  getChatDetails,
  getUserChats,
  setActiveChat,
} from '../../redux/actions/chatAction';
import UserMenu from '../UserMenu/UserMenu';
import MenuIcon from '@mui/icons-material/Menu';

const Header = (props) => {
  const { classes } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  const location = useLocation();

  const loggedUser = useSelector((state) => state.auth.user);
  const isTokenRefreshing = useSelector(
    (state) => state.auth.isTokenRefreshing
  );
  const loggedUserProfile = useSelector((state) => state.auth.userProfile);
  const users = useSelector((state) => state.activity.users);
  const loggedUserFriendInvitations = useSelector(
    (state) => state.friends.receivedFriendInvitations
  );
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const activityNotifications = useSelector(
    (state) => state.activity.notifications
  );
  const userChats = useSelector((state) => state.chats.userChats);

  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [anchorElAccountMenu, setAnchorElAccountMenu] = useState(null);
  const [anchorElFriendsNotif, setAnchorElFriendsNotif] = useState(null);
  const [anchorElActivityNotif, setAnchorElActivityNotif] = useState(null);
  const [anchorElChatNotif, setAnchorElChatNotif] = useState(null);

  useEffect(() => {
    if (isUserLoggedIn) {
      const isTokenExpired =
        new Date() > new Date(loggedUser.accessTokenExpirationDate);

      if (!isTokenExpired) {
        dispatch(getReceivedFriendInvitations(loggedUser.userId, true));
        dispatch(getActivityNotification());
        dispatch(getUserChats(loggedUser.userId));
        if (users) {
          let usersArray = [];
          users.forEach((user) =>
            usersArray.push({
              label: user.firstName + ' ' + user.lastName,
              id: user.userId,
            })
          );
          setOptions(usersArray);
        }
      }
    } else {
      if (users) {
        let usersArray = [];
        users.forEach((user) =>
          usersArray.push({
            label: user.firstName + ' ' + user.lastName,
            id: user.userId,
          })
        );
        setOptions(usersArray);
      }
    }
  }, [users, isTokenRefreshing]);

  const handleChangeSearchedUser = (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
      history.push('/app/profile/' + newValue.id);
    }
  };

  const handleClickAccountMenu = (event) => {
    setAnchorElAccountMenu(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAnchorElAccountMenu(null);
  };

  const handleClickFriendNotification = (event) => {
    setAnchorElFriendsNotif(event.currentTarget);
  };

  const handleCloseFriendNotification = () => {
    setAnchorElFriendsNotif(null);
    dispatch(getReceivedFriendInvitations(loggedUser.userId, true, true));
  };

  const handleClickActivityNotification = (event) => {
    dispatch(getActivityNotification(true));
    setAnchorElActivityNotif(event.currentTarget);
  };

  const handleCloseActivityNotification = () => {
    setAnchorElActivityNotif(null);
    dispatch(getActivityNotification(true));
  };

  const handleClickChatNotification = (event) => {
    setAnchorElChatNotif(event.currentTarget);
  };

  const handleCloseChatNotification = (event) => {
    setAnchorElChatNotif(null);
  };

  const handleClickRespondToFriendInvitation = (inviterId, reaction) => {
    dispatch(respondToFriendInvitation(inviterId, reaction));
  };

  const generateActivityName = (type) => {
    if (type === 'INVITATION_TO_FRIENDS') {
      return 'Wysłał(a) Ci zaproszenie do znajomych';
    } else if (type === 'ACCEPTANCE_INVITATION_TO_FRIENDS') {
      return 'Zaakceptował(a) zaproszenie do znajomych';
    } else if (type === 'INVITATION_TO_EVENT') {
      return 'Zaprosił(a) Cię na wydarzenie';
    } else if (type === 'LIKE_USER_POST') {
      return 'Polubił(a) Twój post';
    } else if (type === 'COMMENT_USER_POST') {
      return 'Skomentował(a) Twój post';
    } else if (type === 'SHARE_USER_POST') {
      return 'Udostępnił(a) Twój post';
    } else if (type === 'INVITATION_TO_GROUP') {
      return 'Zaproszono(a) Cię do grupy';
    } else if (type === 'POST_IN_GROUP') {
      return 'Dodał(a) post na grupie';
    } else if (type === 'ADDED_TO_GROUP') {
      return 'Dodano Cię do grupy';
    }
  };

  const handleClickNotificationInfo = (activityNotification) => {
    if (
      activityNotification.notificationType ===
      'ACCEPTANCE_INVITATION_TO_FRIENDS'
    ) {
      history.push('/app/profile/' + activityNotification.details.userFriendId);
    } else if (
      activityNotification.notificationType === 'LIKE_USER_POST' ||
      activityNotification.notificationType === 'COMMENT_USER_POST' ||
      activityNotification.notificationType === 'SHARE_USER_POST'
    ) {
      history.push('/app/posts/' + activityNotification.details.postId);
    } else if (
      activityNotification.notificationType === 'INVITATION_TO_EVENT'
    ) {
      history.push('/app/events');
    } else if (
      activityNotification.notificationType === 'INVITATION_TO_GROUP'
    ) {
      history.push('/app/groups');
    } else if (activityNotification.notificationType === 'ADDED_TO_GROUP') {
      history.push('/app/groups/' + activityNotification.details.groupId);
    } else if (activityNotification.notificationType === 'POST_IN_GROUP') {
      history.push('/app/groups/' + activityNotification.details.groupId);
    }
    handleCloseActivityNotification();
  };

  const handleClickChat = (chatId) => {
    dispatch(setActiveChat(chatId));
    dispatch(getChatDetails(chatId));
    history.push('/app/chat');
  };

  const handleClickShowDrawer = () => {
    let drawerEl = document.getElementById('drawer');
    if (drawerEl.style.display === 'block') {
      drawerEl.style.display = 'none';
    } else {
      drawerEl.style.display = 'block';
    }
  };

  const handleClickShowFriendList = () => {
    let rightbarEl = document.getElementById('rightbar');
    if (rightbarEl.style.display === 'block') {
      rightbarEl.style.display = 'none';
    } else {
      rightbarEl.style.display = 'block';
    }
  };

  const matchesBpSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <div className={classes.headerContainer}>
      <div className={classes.drawerBtnContainer}>
        <IconButton
          className={classes.drawerBtn}
          onClick={handleClickShowDrawer}
        >
          <MenuIcon fontSize="large" color="primary" />
        </IconButton>
      </div>
      <Typography
        variant="h4"
        component="div"
        className={classes.logoContainer}
      >
        <img src={logoWhite} className={classes.logo} alt="Logo" />
        Social Network
      </Typography>
      <div className={classes.searchContainer}>
        <div className={classes.searchbar}>
          <Autocomplete
            fullWidth
            freeSolo
            open={inputValue !== '' && showOptions}
            onOpen={() => {
              if (inputValue !== '') {
                setShowOptions(true);
              }
            }}
            onClose={() => setShowOptions(false)}
            value={value}
            onChange={(event, newValue) =>
              handleChangeSearchedUser(event, newValue)
            }
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={options}
            id="searchbar"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Szukaj użytkowników"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  type: 'search',
                  sx: {
                    borderRadius: '10px',
                    backgroundColor: '#FFB188',
                  },
                }}
              />
            )}
          />
        </div>
      </div>
      <div
        className={classes.actionContainer}
        style={{ justifyContent: !isUserLoggedIn && 'flex-end' }}
      >
        <div
          className={classes.actionIcons}
          style={{ display: !isUserLoggedIn && 'none' }}
        >
          {matchesBpSM && (
            <IconButton
              className={classes.drawerBtn}
              onClick={handleClickShowDrawer}
            >
              <MenuIcon fontSize="large" color="primary" />
            </IconButton>
          )}
          <IconButton
            onClick={handleClickFriendNotification}
            className={classes.notificationBtn}
          >
            <Badge
              sx={{
                '& .MuiBadge-badge': {
                  color: 'white',
                  backgroundColor: '#1CCD16',
                },
              }}
              overlap="circular"
              badgeContent={
                loggedUserFriendInvitations.filter(
                  (invitation) => invitation.invitationDisplayed === false
                ).length
              }
            >
              <PersonIcon color="primary" />
            </Badge>
          </IconButton>
          <Menu
            id="friend-notification-menu"
            anchorEl={anchorElFriendsNotif}
            open={Boolean(anchorElFriendsNotif)}
            onClick={handleCloseFriendNotification}
            disableScrollLock={true}
            className={classes.friendNotificationMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {loggedUserFriendInvitations.map((friendInvitation, index) => (
              <ListItem
                key={friendInvitation.friendId}
                className={classes.activityNotificationItem}
                sx={{
                  borderBottom:
                    index + 1 < loggedUserFriendInvitations.length &&
                    '1px solid rgba(0, 0, 0, 0.4)',
                }}
                secondaryAction={
                  <>
                    <Tooltip title="Akceptuj" placement="top">
                      <IconButton
                        className={classes.friendMenuBtn}
                        onClick={() =>
                          handleClickRespondToFriendInvitation(
                            friendInvitation.invitingUser.userId,
                            'accept'
                          )
                        }
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Odrzuć" placement="top">
                      <IconButton
                        className={classes.friendMenuBtn}
                        onClick={() =>
                          handleClickRespondToFriendInvitation(
                            friendInvitation.invitingUser.userId,
                            'reject'
                          )
                        }
                      >
                        <ClearIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    src={
                      friendInvitation.invitingUser.profilePhoto !== null
                        ? friendInvitation.invitingUser.profilePhoto.url
                        : defaultUserPhoto
                    }
                    alt={
                      loggedUserProfile
                        ? friendInvitation.invitingUser.firstName +
                          ' ' +
                          friendInvitation.invitingUser.lastName
                        : 'Nazwa użytkownika'
                    }
                    className={classes.userPhoto}
                    sx={{ marginRight: '20px' }}
                    onClick={() =>
                      history.push(
                        '/app/profile/' + friendInvitation.invitingUser.userId
                      )
                    }
                  >
                    <MessageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      noWrap
                      variant="subtitle2"
                      onClick={() =>
                        history.push(
                          '/app/profile/' + friendInvitation.invitingUser.userId
                        )
                      }
                    >
                      {friendInvitation.invitingUser.firstName +
                        ' ' +
                        friendInvitation.invitingUser.lastName}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2">
                      {'Liczba znajomych: ' +
                        friendInvitation.invitingUserFriends.length}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
            {loggedUserFriendInvitations.length === 0 && (
              <Typography
                margin="10px 0px"
                textAlign="center"
                variant="subtitle2"
              >
                Brak zaproszeń
              </Typography>
            )}
          </Menu>
          <IconButton
            onClick={handleClickActivityNotification}
            className={classes.notificationBtn}
          >
            <Badge
              sx={{
                '& .MuiBadge-badge': {
                  color: 'white',
                  backgroundColor: '#FF1C00',
                },
              }}
              overlap="circular"
              badgeContent={
                activityNotifications.filter(
                  (notif) => notif.notificationDisplayed === false
                ).length
              }
            >
              <NotificationsIcon color="primary" />
            </Badge>
          </IconButton>
          <Menu
            id="activity-notification-menu"
            anchorEl={anchorElActivityNotif}
            open={Boolean(anchorElActivityNotif)}
            onClick={handleCloseActivityNotification}
            onClose={handleCloseActivityNotification}
            disableScrollLock={true}
            className={classes.activityNotificationMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {activityNotifications.map((activityNotification, index) => (
              <ListItem
                key={index}
                className={classes.activityNotificationItem}
                sx={{
                  borderBottom:
                    index + 1 < activityNotifications.length &&
                    '1px solid rgba(0, 0, 0, 0.4)',
                }}
                onClick={() =>
                  handleClickNotificationInfo(activityNotification)
                }
              >
                <div className={classes.activityNotificationItemInfo}>
                  <ListItemAvatar>
                    {activityNotification.notificationType !==
                      'ADDED_TO_GROUP' &&
                    activityNotification.notificationType !==
                      'INVITATION_TO_GROUP' ? (
                      <Avatar
                        src={
                          activityNotification.activityInitiator
                            .profilePhoto !== null
                            ? activityNotification.activityInitiator
                                .profilePhoto.url
                            : defaultUserPhoto
                        }
                        alt={
                          loggedUserProfile
                            ? activityNotification.activityInitiator.firstName +
                              ' ' +
                              activityNotification.activityInitiator.lastName
                            : 'Nazwa użytkownika'
                        }
                        className={classes.userPhoto}
                        sx={{ marginRight: '20px' }}
                      />
                    ) : (
                      <img
                        src={
                          activityNotification.details.image
                            ? activityNotification.details.image.url
                            : defaultImg
                        }
                        alt="Zdjęcie grupy"
                        className={classes.groupImage}
                      />
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      activityNotification.notificationType !==
                        'ADDED_TO_GROUP' &&
                      activityNotification.notificationType !==
                        'INVITATION_TO_GROUP' ? (
                        <Typography
                          noWrap
                          variant="subtitle2"
                          fontWeight="bold"
                        >
                          {activityNotification.activityInitiator.firstName +
                            ' ' +
                            activityNotification.activityInitiator.lastName}
                        </Typography>
                      ) : (
                        <Typography
                          noWrap
                          variant="subtitle2"
                          fontWeight="bold"
                        >
                          {activityNotification.details.name}
                        </Typography>
                      )
                    }
                    secondary={
                      <Typography variant="body1">
                        {generateActivityName(
                          activityNotification.notificationType
                        )}
                      </Typography>
                    }
                  />
                </div>
                <Typography
                  component="p"
                  variant="body2"
                  fontWeight={300}
                  width="32%"
                  marginLeft="10px"
                >
                  {formatActivityDate(
                    new Date(activityNotification.notificationDate)
                  )}
                </Typography>
              </ListItem>
            ))}
            {activityNotifications.length === 0 && (
              <Typography
                margin="10px 0px"
                textAlign="center"
                variant="subtitle2"
              >
                Brak powiadomień
              </Typography>
            )}
          </Menu>
          <IconButton
            onClick={handleClickChatNotification}
            className={classes.notificationBtn}
          >
            <Badge
              sx={{
                '& .MuiBadge-badge': {
                  color: 'white',
                  backgroundColor: '#07DCC0',
                },
              }}
              overlap="circular"
              badgeContent={
                location.pathname !== '/app/chat' && userChats.length > 0
                  ? userChats.filter(
                      (chat) =>
                        chat.newMessages > 0 &&
                        chat.members.find(
                          (member) => member.user.userId === loggedUser.userId
                        ).hasMutedChat === false
                    ).length
                  : 0
              }
            >
              <MessageIcon color="primary" />
            </Badge>
          </IconButton>
          <Menu
            id="chat-notification-menu"
            anchorEl={anchorElChatNotif}
            open={Boolean(anchorElChatNotif)}
            onClick={handleCloseChatNotification}
            onClose={handleCloseChatNotification}
            disableScrollLock={true}
            className={classes.chatNotificationMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {userChats.length > 0 &&
              userChats.map((chat, index) => {
                if (chat.lastMessage && chat.lastMessageAuthor) {
                  return (
                    <ListItem
                      key={chat.chatId}
                      className={classes.activityNotificationItem}
                      sx={{
                        borderBottom:
                          index + 1 < userChats.length &&
                          '1px solid rgba(0, 0, 0, 0.4)',
                      }}
                      onClick={() => handleClickChat(chat.chatId)}
                    >
                      <div className={classes.chatInformationContainer}>
                        <ListItemAvatar>
                          {chat.isPrivate ? (
                            <Avatar
                              src={
                                chat.members.find(
                                  (member) =>
                                    member.user.userId !== loggedUser.userId
                                ).user.profilePhoto !== null
                                  ? chat.members.find(
                                      (member) =>
                                        member.user.userId !== loggedUser.userId
                                    ).user.profilePhoto.url
                                  : defaultUserPhoto
                              }
                              alt={
                                loggedUserProfile
                                  ? chat.members.find(
                                      (member) =>
                                        member.user.userId !== loggedUser.userId
                                    ).user.firstName +
                                    ' ' +
                                    chat.members.find(
                                      (member) =>
                                        member.user.userId !== loggedUser.userId
                                    ).user.lastName
                                  : 'Nazwa użytkownika'
                              }
                              className={classes.userPhoto}
                              sx={{ marginRight: '20px' }}
                            />
                          ) : (
                            <img
                              src={
                                chat.image ? chat.image.url : defaultChatImage
                              }
                              alt="Zdjęcie czatu"
                              className={classes.chatImage}
                            />
                          )}
                        </ListItemAvatar>
                        <div style={{ width: '80%' }}>
                          <ListItemText
                            primary={
                              chat.isPrivate ? (
                                <Typography
                                  variant="subtitle2"
                                  fontWeight="bold"
                                  noWrap
                                >
                                  {chat.members.find(
                                    (member) =>
                                      member.user.userId !== loggedUser.userId
                                  ).user.firstName +
                                    ' ' +
                                    chat.members.find(
                                      (member) =>
                                        member.user.userId !== loggedUser.userId
                                    ).user.lastName}
                                </Typography>
                              ) : (
                                <Typography
                                  variant="subtitle2"
                                  fontWeight="bold"
                                  noWrap
                                >
                                  {chat.name}
                                </Typography>
                              )
                            }
                            secondary={
                              chat.isPrivate ? (
                                <Typography variant="body1" noWrap>
                                  {(chat.lastMessageAuthor.userId ===
                                  loggedUser.userId
                                    ? 'Ty: '
                                    : '') + chat.lastMessage}
                                </Typography>
                              ) : (
                                <Typography variant="body1" noWrap>
                                  {chat.lastMessageAuthor.firstName +
                                    ' ' +
                                    chat.lastMessageAuthor.lastName +
                                    ': ' +
                                    chat.lastMessage}
                                </Typography>
                              )
                            }
                          />
                          <Typography fontSize="11px">
                            {formatActivityDate(new Date(chat.activityDate))}
                          </Typography>
                        </div>
                      </div>
                      {chat.newMessages > 0 && (
                        <div className={classes.notificationNumberBox}>
                          <span className={classes.notificationNumber}>
                            {chat.newMessages}
                          </span>
                        </div>
                      )}
                    </ListItem>
                  );
                }
              })}
            {userChats.length === 0 && (
              <Typography
                margin="10px 0px"
                textAlign="center"
                variant="subtitle2"
              >
                Brak powiadomień
              </Typography>
            )}
          </Menu>
        </div>
        <div
          className={classes.userInfoBox}
          style={{ display: !isUserLoggedIn && 'none' }}
        >
          <Typography variant="h4" noWrap className={classes.nameAndSurname}>
            {loggedUserProfile &&
              loggedUserProfile.firstName + ' ' + loggedUserProfile.lastName}
          </Typography>
          <IconButton onClick={handleClickAccountMenu}>
            <Avatar
              src={
                loggedUserProfile && loggedUserProfile.profilePhoto !== null
                  ? loggedUserProfile.profilePhoto.url
                  : defaultUserPhoto
              }
              alt={
                loggedUserProfile
                  ? loggedUserProfile.firstName +
                    ' ' +
                    loggedUserProfile.lastName
                  : 'Nazwa użytkownika'
              }
              className={classes.userPhoto}
            />
          </IconButton>
          {loggedUserProfile && (
            <UserMenu
              userProfile={loggedUserProfile}
              userId={loggedUser.userId}
              anchorEl={anchorElAccountMenu}
              closeAccountMenu={handleCloseAccountMenu}
            />
          )}
        </div>
        {!isUserLoggedIn && (
          <div>
            <Link className={classes.createAccountLink} to="/auth/login">
              Zaloguj się
            </Link>
            <Link className={classes.createAccountLink} to="/auth/register">
              Załóż konto
            </Link>
          </div>
        )}
      </div>
      <div
        className={classes.friendListBtn}
        onClick={handleClickShowFriendList}
        style={{ display: !isUserLoggedIn && 'none' }}
      >
        <Typography>Lista znajomych</Typography>
      </div>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
