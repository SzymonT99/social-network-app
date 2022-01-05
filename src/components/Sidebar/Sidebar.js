import React, { useEffect, useState } from 'react';
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
import { Link, useHistory } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EventIcon from '@mui/icons-material/Event';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { endpoints } from '../../services/endpoints/endpoints';
import { logoutUser } from '../../redux/actions/authActions';

const ListItem = withStyles((theme) => ({
  root: {
    '&$:selected': {
      backgroundColor: 'rgba(250, 99, 66, 0.3)',
      color: theme.palette.secondary.dark,
      '& .MuiListItemIcon-root': {
        color: theme.palette.secondary.dark,
      },
    },
    '&$selected:hover': {
      backgroundColor: theme.palette.primary.light,
      color: 'white',
      '& .MuiListItemIcon-root': {
        color: 'white',
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
  selected: {},
}))(MuiListItem);

const Sidebar = (props) => {
  const { classes } = props;
  const [selectedItem, setSelectedItem] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const [userDetails, setUserDetails] = useState({});

  let userId = useSelector((state) => state.auth.user.userId);
  let accessToken = useSelector((state) => state.auth.user.accessToken);

  useEffect(() => {
    (async () => {
      await getUserProfileDetails();
    })();
  }, [userId]);

  const getUserProfileDetails = () => {
    fetch(endpoints.userProfile.replace('{userId}', userId), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            console.log(data);
            setUserDetails(data);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleListItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <div className={classes.sidebarContainer}>
      <div className={classes.sidebarWrapper}>
        <Link className={classes.userProfile} to="/app/profile/">
          <img
            src={defaultUserPhoto}
            alt="Zdjęcie użytkownika"
            className={classes.userPhoto}
          />
          <Typography
            variant="h4"
            component="div"
            className={classes.nameAndSurname}
          >
            {userDetails.firstName + ' ' + userDetails.lastName}
          </Typography>
        </Link>
        <Divider color="white" className={classes.divider} />
        <nav>
          <List>
            <ListItem
              disablePadding
              style={{ margin: '10px 0' }}
              selected={selectedItem === 0}
              onClick={() => handleListItemClick(0)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon fontSize="large" className={classes.iconItem} />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="h6">Tablica aktywności</Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              style={{ margin: '10px 0' }}
              selected={selectedItem === 1}
              onClick={() => handleListItemClick(1)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon fontSize="large" className={classes.iconItem} />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={<Typography variant="h6">Znajomi</Typography>}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              style={{ margin: '10px 0' }}
              selected={selectedItem === 2}
              onClick={() => handleListItemClick(2)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <GroupsIcon fontSize="large" className={classes.iconItem} />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="h6">Grupy tematyczne</Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              style={{ margin: '10px 0' }}
              selected={selectedItem === 3}
              onClick={() => handleListItemClick(3)}
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
                  primary={<Typography variant="h6">Czat</Typography>}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              style={{ margin: '10px 0' }}
              selected={selectedItem === 4}
              onClick={() => handleListItemClick(4)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <EventIcon fontSize="large" className={classes.iconItem} />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={<Typography variant="h6">Wydarzenia</Typography>}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              style={{ margin: '10px 0' }}
              selected={selectedItem === 5}
              onClick={() => handleListItemClick(5)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <BookmarkIcon fontSize="large" className={classes.iconItem} />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={<Typography variant="h6">Ulubione posty</Typography>}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              style={{ margin: '10px 0' }}
              selected={selectedItem === 6}
              onClick={() => handleListItemClick(6)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon fontSize="large" className={classes.iconItem} />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="h6">Ustawienia konta</Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding style={{ marginTop: '140px' }}>
              <ListItemButton
                onClick={() => {
                  dispatch(logoutUser());
                  history.push('/auth/login');
                }}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="large" className={classes.iconItem} />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={<Typography variant="h6">Wyloguj się</Typography>}
                />
              </ListItemButton>
            </ListItem>
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
