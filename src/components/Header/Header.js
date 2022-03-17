import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './header-jss';
import { PropTypes } from 'prop-types';
import logoWhite from '../../assets/logo-white.png';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import Typography from '@mui/material/Typography';
import {
  Autocomplete,
  Badge,
  Divider,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { Logout, Settings } from '@mui/icons-material';
import { logoutUser } from '../../redux/actions/authActions';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { changeUserStatus } from '../../redux/actions/userProfileActions';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import {
  getReceivedFriendInvitations,
  respondToFriendInvitation,
} from '../../redux/actions/friendAction';
import { getActivityNotification } from '../../redux/actions/userActivityActions';

const formatActivityTime = (createdDate) => {
  let diffInMs = (new Date().getTime() - createdDate.getTime()) / 1000;
  let minutes = Math.floor(diffInMs / 60);

  if (minutes < 30) {
    return 'kilka minut temu';
  } else if (minutes < 90) {
    return '1 godz. temu';
  } else if (minutes >= 90 && minutes < 150) {
    return '2 godz. temu';
  } else if (minutes >= 150 && minutes < 210) {
    return '3 godz. temu';
  } else if (minutes >= 210 && minutes < 270) {
    return '4 godz. temu';
  } else if (minutes >= 270 && minutes < 1440) {
    return 'kilka godz. temu';
  } else if (minutes >= 1440 && minutes < 1560) {
    return '1 dzień temu';
  } else if (minutes >= 1560 && minutes < 3000) {
    return '2 dni temu';
  } else if (minutes >= 3000 && minutes < 3100) {
    return '3 dni temu';
  } else {
    let day = createdDate.getDate();
    let month = createdDate.getMonth() + 1;
    let year = createdDate.getFullYear();
    let hour = createdDate.getHours();
    let minutes = createdDate.getMinutes();
    return (
      (day <= 9 ? '0' + day : day) +
      '.' +
      (month <= 9 ? '0' + month : month) +
      '.' +
      year +
      ' r. ' +
      (hour <= 9 ? '0' + hour : hour) +
      ':' +
      (minutes <= 9 ? '0' + minutes : minutes)
    );
  }
};

const activeStatus = {
  ONLINE: '#1CCD16',
  BE_RIGHT_BACK: '#de681d',
  BUSY: '#67207c',
  OFFLINE: '#FF1C00',
};

const Header = (props) => {
  const { classes } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);
  const isTokenRefreshing = useSelector(
    (state) => state.auth.isTokenRefreshing
  );
  const loggedUserProfile = useSelector((state) => state.auth.userProfile);
  const users = useSelector((state) => state.activity.users);
  const loggedUserFriendInvitations = useSelector(
    (state) => state.friends.receivedFriendInvitations
  );

  const activityNotifications = useSelector(
    (state) => state.activity.notifications
  );

  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [anchorElAccountMenu, setAnchorElAccountMenu] = useState(null);
  const [anchorElFriendsNotif, setAnchorElFriendsNotif] = useState(null);
  const [anchorElActivityNotif, setAnchorElActivityNotif] = useState(null);

  useEffect(() => {
    const isTokenExpired =
      new Date() > new Date(loggedUser.accessTokenExpirationDate);

    if (!isTokenExpired) {
      dispatch(getReceivedFriendInvitations(loggedUser.userId, true));
      dispatch(getActivityNotification());
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
    setAnchorElActivityNotif(event.currentTarget);
  };

  const handleCloseActivityNotification = () => {
    setAnchorElActivityNotif(null);
    dispatch(getActivityNotification(true));
  };

  const handleClickRespondToFriendInvitation = (inviterId, reaction) => {
    dispatch(respondToFriendInvitation(inviterId, reaction));
  };

  const generateActivityName = (type) => {
    if (type === 'INVITATION_TO_FRIENDS') {
      return 'Wysłał Ci zaproszenie do znajomych';
    } else if (type === 'ACCEPTANCE_INVITATION_TO_FRIENDS') {
      return 'Zaakceptował zaproszenie do znajomych';
    } else if (type === 'INVITATION_TO_EVENT') {
      return 'Zaprosił Cię na wydarzenie';
    } else if (type === 'LIKE_USER_POST') {
      return 'Polubił Twój post';
    } else if (type === 'COMMENT_USER_POST') {
      return 'Skomentował Twój post';
    } else if (type === 'SHARE_USER_POST') {
      return 'Udostępnił Twój post';
    } else if (type === 'INVITATION_TO_GROUP') {
      return 'Zaprosił Cię do grupy';
    } else if (type === 'POST_IN_GROUP') {
      return 'Dodał post na grupie';
    }
  };

  return (
    <div className={classes.headerContainer}>
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
                placeholder="Szukaj znajomych"
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
      <div className={classes.actionContainer}>
        <div className={classes.actionIcons}>
          <IconButton onClick={handleClickFriendNotification}>
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
              <PersonIcon
                color="primary"
                sx={{ fontSize: '45px', cursor: 'pointer' }}
              />
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
                      className={classes.activityAuthorName}
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
          <IconButton onClick={handleClickActivityNotification}>
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
              <NotificationsIcon
                color="primary"
                sx={{ fontSize: '45px', cursor: 'pointer' }}
              />
            </Badge>
          </IconButton>
          <Menu
            id="activity-notification-menu"
            anchorEl={anchorElActivityNotif}
            open={Boolean(anchorElActivityNotif)}
            onClick={handleCloseActivityNotification}
            disableScrollLock={true}
            className={classes.activityNotificationMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {activityNotifications.map((activityNotification, index) => (
              <ListItem
                key={index}
                sx={{
                  borderBottom:
                    index + 1 < activityNotifications.length &&
                    '1px solid rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '68%',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={
                        activityNotification.activityInitiator.profilePhoto !==
                        null
                          ? activityNotification.activityInitiator.profilePhoto
                              .url
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
                      onClick={() =>
                        history.push(
                          '/app/profile/' +
                            activityNotification.activityInitiator.userId
                        )
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        className={classes.activityAuthorName}
                        variant="subtitle2"
                        onClick={() =>
                          history.push(
                            '/app/profile/' +
                              activityNotification.activityInitiator.userId
                          )
                        }
                      >
                        {activityNotification.activityInitiator.firstName +
                          ' ' +
                          activityNotification.activityInitiator.lastName}
                      </Typography>
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
                  {formatActivityTime(
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
          <IconButton>
            <Badge
              sx={{
                '& .MuiBadge-badge': {
                  color: 'white',
                  backgroundColor: '#07DCC0',
                },
              }}
              overlap="circular"
              badgeContent={4}
            >
              <MessageIcon
                color="primary"
                sx={{ fontSize: '45px', cursor: 'pointer' }}
              />
            </Badge>
          </IconButton>
        </div>
        <div className={classes.userInfoBox}>
          <Typography
            variant="h4"
            component="div"
            noWrap
            className={classes.nameAndSurname}
          >
            {loggedUserProfile ? (
              loggedUserProfile.firstName + ' ' + loggedUserProfile.lastName
            ) : (
              <CircularProgress color="primary" />
            )}
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
          <Menu
            anchorEl={anchorElAccountMenu}
            id="account-menu"
            open={Boolean(anchorElAccountMenu)}
            onClose={handleCloseAccountMenu}
            onClick={handleCloseAccountMenu}
            disableScrollLock={true}
            PaperProps={{
              elevation: 2,
              className: classes.userMenu,
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem
              className={classes.userMenuItem}
              onClick={() =>
                history.push('/app/profile/' + loggedUserProfile.userProfileId)
              }
            >
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
                    : defaultUserPhoto
                }
              />
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="subtitle1" fontWeight={500}>
                    Mój profil
                  </Typography>
                }
              />
            </MenuItem>
            <Divider className={classes.divider} />
            <MenuItem className={classes.userMenuItem} disabled>
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="subtitle2" fontWeight="bold">
                    Ustaw status aktywności
                  </Typography>
                }
              />
            </MenuItem>
            <MenuItem
              className={classes.userMenuItem}
              onClick={() => dispatch(changeUserStatus('ONLINE'))}
            >
              <ListItemIcon>
                <FiberManualRecordIcon
                  style={{ color: activeStatus['ONLINE'] }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography variant="body1">Dostępny</Typography>}
              />
            </MenuItem>
            <MenuItem
              className={classes.userMenuItem}
              onClick={() => dispatch(changeUserStatus('BUSY'))}
            >
              <ListItemIcon>
                <FiberManualRecordIcon
                  style={{ color: activeStatus['BUSY'] }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography variant="body1">Zajęty</Typography>}
              />
            </MenuItem>
            <MenuItem
              className={classes.userMenuItem}
              onClick={() => dispatch(changeUserStatus('BE_RIGHT_BACK'))}
            >
              <ListItemIcon>
                <FiberManualRecordIcon
                  style={{ color: activeStatus['BE_RIGHT_BACK'] }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography variant="body1">Zaraz wracam</Typography>}
              />
            </MenuItem>
            <MenuItem
              className={classes.userMenuItem}
              onClick={() => dispatch(changeUserStatus('OFFLINE'))}
            >
              <ListItemIcon>
                <FiberManualRecordIcon
                  style={{ color: activeStatus['OFFLINE'] }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography variant="body1">Niedostępny</Typography>}
              />
            </MenuItem>
            <Divider className={classes.divider} />
            <MenuItem className={classes.userMenuItem}>
              <ListItemIcon>
                <Settings fontSize="medium" />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="subtitle2">Ustawienia konta</Typography>
                }
              />
            </MenuItem>
            <MenuItem
              className={classes.userMenuItem}
              onClick={() => {
                history.push('/auth/login');
                dispatch(logoutUser(loggedUser.userId));
              }}
            >
              <ListItemIcon>
                <Logout fontSize="medium" />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="subtitle2">Wyloguj się</Typography>
                }
              />
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
