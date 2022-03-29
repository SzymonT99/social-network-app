import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './sidebar-jss';
import { PropTypes } from 'prop-types';
import List from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import { Link, useHistory, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EventIcon from '@mui/icons-material/Event';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import CircularProgress from '@mui/material/CircularProgress';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { changeProfileNav } from '../../redux/actions/userProfileActions';
import ChatIcon from '@mui/icons-material/Chat';

const ListItem = withStyles((theme) => ({
  root: {
    '&.Mui-selected': {
      color: theme.palette.secondary.light,
      '& .MuiListItemIcon-root': {
        color: theme.palette.secondary.light,
      },
      '& .MuiSvgIcon-root': {
        color: theme.palette.secondary.light,
      },
      '& .MuiTouchRipple-root': {
        backgroundColor: 'rgba(250, 99, 66, 0.26)',
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: 'white',
        '& .MuiListItemIcon-root': {
          color: 'white',
        },
        '& .MuiSvgIcon-root': {
          color: 'white',
        },
      },
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: 'white',
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
    },
  },
}))(MuiListItem);

const Sidebar = (props) => {
  const { classes } = props;
  const loggedUserProfile = useSelector((state) => state.auth.userProfile);
  const loggedUser = useSelector((state) => state.auth.user);
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [selectedItem, setSelectedItem] = useState(0);

  const location = useLocation();

  const dispatch = useDispatch();
  const history = useHistory();

  const handleListItemClick = (index) => {
    setSelectedItem(index);
    if (index === 0) {
      history.push('/app');
    } else if (index === 1) {
      history.push('/app/profile/' + loggedUserProfile.userProfileId);
    } else if (index === 2) {
      dispatch(changeProfileNav(3));
      history.push('/app/friends');
    } else if (index === 3) {
      history.push('/app/groups');
    } else if (index === 4) {
      history.push('/app/chat');
    } else if (index === 5) {
      history.push('/app/events');
    } else if (index === 6) {
      history.push('/app/favourite-posts');
    } else if (index === 7) {
      history.push('/app/settings');
    } else if (index === 8) {
      history.push('/app/public');
    }
  };

  const setNavByLocation = (location) => {
    const pathDetails = location.pathname.substr(4, location.pathname.length);

    if (pathDetails === '') {
      setSelectedItem(0);
    } else if (
      pathDetails.includes('/profile/' + loggedUserProfile.userProfileId)
    ) {
      setSelectedItem(1);
    } else if (pathDetails.includes('/friends')) {
      setSelectedItem(2);
    } else if (pathDetails.includes('/groups')) {
      setSelectedItem(3);
    } else if (pathDetails.includes('/chat')) {
      setSelectedItem(4);
    } else if (pathDetails.includes('/events')) {
      setSelectedItem(5);
    } else if (pathDetails.includes('/favourite-posts')) {
      setSelectedItem(6);
    } else if (pathDetails.includes('/settings')) {
      setSelectedItem(7);
    } else {
      setSelectedItem(null);
    }
  };

  useEffect(() => {
    setNavByLocation(location);
  }, [location]);

  return (
    <div className={classes.sidebarContainer}>
      <div className={classes.sidebarWrapper}>
        {loggedUserProfile ? (
          <Link
            className={classes.userProfile}
            to={'/app/profile/' + loggedUserProfile.userProfileId}
          >
            <img
              src={
                loggedUserProfile.profilePhoto !== null
                  ? loggedUserProfile.profilePhoto.url
                  : defaultUserPhoto
              }
              alt="Zdjęcie użytkownika"
              className={classes.userPhoto}
            />
            <Typography
              variant="h4"
              textAlign="center"
              className={classes.nameAndSurname}
            >
              {loggedUserProfile.firstName + ' ' + loggedUserProfile.lastName}
            </Typography>
          </Link>
        ) : (
          <CircularProgress color="secondary" />
        )}
        <Divider color="white" className={classes.divider} />
        <nav>
          <List>
            {isUserLoggedIn && (
              <ListItem
                disablePadding
                style={{ margin: '10px 0' }}
                selected={selectedItem === 0}
                onClick={() => {
                  handleListItemClick(0);
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon fontSize="large" className={classes.iconItem} />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography fontWeight="bold" variant="h6">
                        Tablica aktywności
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )}
            {!isUserLoggedIn && (
              <ListItem
                disablePadding
                style={{ margin: '10px 0' }}
                selected={selectedItem === 8}
                onClick={() => {
                  handleListItemClick(8);
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <ChatIcon fontSize="large" className={classes.iconItem} />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography fontWeight="bold" variant="h6">
                        Publiczne posty
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )}
            {isUserLoggedIn && (
              <ListItem
                disablePadding
                style={{ margin: '10px 0' }}
                selected={selectedItem === 1}
                onClick={() => handleListItemClick(1)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleIcon
                      fontSize="large"
                      className={classes.iconItem}
                    />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography fontWeight="bold" variant="h6">
                        Profil użytkownika
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )}
            {isUserLoggedIn && (
              <ListItem
                disablePadding
                style={{ margin: '10px 0' }}
                selected={selectedItem === 2}
                onClick={() => handleListItemClick(2)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <PeopleIcon fontSize="large" className={classes.iconItem} />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography fontWeight="bold" variant="h6">
                        Znajomi
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem
              disablePadding
              style={{ margin: '10px 0' }}
              selected={selectedItem === 3}
              onClick={() => handleListItemClick(3)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <GroupsIcon fontSize="large" className={classes.iconItem} />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography fontWeight="bold" variant="h6">
                      Grupy tematyczne
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            {isUserLoggedIn && (
              <ListItem
                disablePadding
                style={{ margin: '10px 0' }}
                selected={selectedItem === 4}
                onClick={() => handleListItemClick(4)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <ChatBubbleIcon
                      fontSize="large"
                      className={classes.iconItem}
                    />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography fontWeight="bold" variant="h6">
                        Czat
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem
              disablePadding
              style={{ margin: '10px 0' }}
              selected={selectedItem === 5}
              onClick={() => handleListItemClick(5)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <EventIcon fontSize="large" className={classes.iconItem} />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography fontWeight="bold" variant="h6">
                      Wydarzenia
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            {isUserLoggedIn && (
              <ListItem
                disablePadding
                style={{ margin: '10px 0' }}
                selected={selectedItem === 6}
                onClick={() => handleListItemClick(6)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <BookmarkIcon
                      fontSize="large"
                      className={classes.iconItem}
                    />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography fontWeight="bold" variant="h6">
                        Ulubione posty
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )}
            {isUserLoggedIn && (
              <ListItem
                disablePadding
                style={{ margin: '10px 0' }}
                selected={selectedItem === 7}
                onClick={() => handleListItemClick(7)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon
                      fontSize="large"
                      className={classes.iconItem}
                    />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography fontWeight="bold" variant="h6">
                        Ustawienia konta
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )}
            {isUserLoggedIn && (
              <ListItem disablePadding style={{ marginTop: '75px' }}>
                <ListItemButton
                  onClick={() => {
                    dispatch(logoutUser(loggedUser.userId));
                    history.push('/auth/login');
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon fontSize="large" className={classes.iconItem} />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography fontWeight="bold" variant="h6">
                        Wyloguj się
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </nav>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);
