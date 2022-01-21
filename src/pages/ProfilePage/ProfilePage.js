import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './profilePage-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import { PhotoCamera } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import TabPanelMUI from '@mui/lab/TabPanel';
import PhotoIcon from '@mui/icons-material/Photo';
import Popup from '../../components/Popup/Popup';
import PostForm from '../../components/Forms/PostForm';

const TabPanel = (props) => {
  const { children, value, classes, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className={classes.tabContent}>{children}</div>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const ProfilePage = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);

  const [profileNav, setProfileNav] = useState(0);
  const [activityValue, setActivityValue] = useState('a1');
  const [openPostCreation, setOpenPostCreation] = useState(false);

  useEffect(() => {}, []);

  const handleChangeProfileNav = (event, newValue) => {
    setProfileNav(newValue);
  };

  const handleChangeActivityValue = (event, newValue) => {
    setActivityValue(newValue);
  };

  const handleClosePostCreation = () => {
    setOpenPostCreation(false);
  };

  return (
    <div className={classes.wrapper}>
      <Paper
        elevation={4}
        sx={{ borderRadius: '10px' }}
        className={classes.profileHeadingContainer}
      >
        <div className={classes.profileCoverImage}>
          {userProfile.coverImage && (
            <img alt="Cover image" src={userProfile.coverImage} />
          )}
          <label
            htmlFor="icon-button-file"
            className={classes.uploadCoverImageBtn}
          >
            <Input
              accept="image/*"
              style={{ display: 'none' }}
              id="icon-button-file"
              type="file"
            />
            <Tooltip title="Edytuj tło" placement="top">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                size="large"
              >
                <PhotoCamera />
              </IconButton>
            </Tooltip>
          </label>
        </div>
        <div className={classes.profileInfoBox}>
          <div className={classes.userProfilePhotoBox}>
            <img
              src={
                userProfile && userProfile.profilePhoto !== null
                  ? userProfile.profilePhoto.url
                  : defaultUserPhoto
              }
              alt="Zdjęcie użytkownika"
              className={classes.userPhoto}
            />
            <label
              htmlFor="icon-button-file"
              className={classes.uploadCoverImageBtn}
            >
              <Input
                accept="image/*"
                style={{ display: 'none' }}
                id="icon-button-file"
                type="file"
              />
              <Tooltip title="Zmień zdjęcie profilowe" placement="top">
                <IconButton
                  aria-label="upload picture"
                  component="span"
                  size="large"
                >
                  <PhotoCamera />
                </IconButton>
              </Tooltip>
            </label>
          </div>
          <div className={classes.profileInfoText}>
            <div>
              <Typography fontSize="37px" fontWeight={400}>
                {userProfile.firstName + ' ' + userProfile.lastName}
              </Typography>
              <Typography variant="h6">{userProfile.email}</Typography>
            </div>
            <List
              className={classes.profileInfoList}
              style={{ borderLeft: '1px solid black' }}
            >
              <ListItem className={classes.profileInfoListItem}>
                <Typography variant="subtitle2">{'Znajomi: 123'}</Typography>
              </ListItem>
              <ListItem className={classes.profileInfoListItem}>
                <Typography variant="subtitle2">{'Posty: 123'}</Typography>
              </ListItem>
              <ListItem className={classes.profileInfoListItem}>
                <Typography variant="subtitle2">{'Komentarze: 123'}</Typography>
              </ListItem>
              <ListItem className={classes.profileInfoListItem}>
                <Typography variant="subtitle2">{'Polubienia: 123'}</Typography>
              </ListItem>
            </List>
          </div>
        </div>
      </Paper>
      <Paper elevation={4} sx={{ borderRadius: '10px' }}>
        <Tabs
          value={profileNav}
          onChange={handleChangeProfileNav}
          className={classes.tabsContainer}
          TabIndicatorProps={{
            style: {
              display: 'none',
            },
          }}
        >
          <Tab
            className={classes.tabItem}
            {...a11yProps(0)}
            label="Aktywność"
          />
          <Tab
            className={classes.tabItem}
            {...a11yProps(1)}
            label="Informacje"
          />
          <Tab className={classes.tabItem} {...a11yProps(2)} label="Zdjęcia" />
          <Tab className={classes.tabItem} {...a11yProps(3)} label="Znajomi" />
          <Tab className={classes.tabItem} {...a11yProps(4)} label="Grupy" />
        </Tabs>
      </Paper>
      <TabPanel classes={classes} value={profileNav} index={0}>
        <div className={classes.leftActivityContent}>
          <Paper elevation={4} sx={{ borderRadius: '10px' }}>
            Test left
          </Paper>
        </div>
        <div className={classes.rightActivityContent}>
          <TabContext value={activityValue}>
            <Paper
              elevation={4}
              sx={{ borderRadius: '10px', padding: '0px 15px' }}
            >
              <TabList onChange={handleChangeActivityValue}>
                <Tab
                  className={classes.activityTabItem}
                  label="Posty"
                  value="a1"
                />
                <Tab
                  className={classes.activityTabItem}
                  label="Polubione posty"
                  value="a2"
                />
                <Tab
                  className={classes.activityTabItem}
                  label="Udostępnione posty"
                  value="a3"
                />
                <Tab
                  className={classes.activityTabItem}
                  label="Komentarze"
                  value="a4"
                />
              </TabList>
            </Paper>
            <TabPanelMUI value="a1" sx={{ padding: '15px 0px 0px' }}>
              <Paper
                elevation={4}
                sx={{ borderRadius: '10px' }}
                className={classes.postCreateBox}
              >
                <Typography fontWeight="bold" variant="h6">
                  Utwórz post
                </Typography>
                <Divider className={classes.divider} />
                <div className={classes.postCreateContent}>
                  <Avatar
                    src={
                      userProfile
                        ? userProfile.profilePhoto.url
                        : defaultUserPhoto
                    }
                    alt={
                      userProfile
                        ? userProfile.firstName + ' ' + userProfile.lastName
                        : 'Zalogowany użytkownik'
                    }
                    className={classes.postCreationUserPhoto}
                  />
                  <TextField
                    fullWidth
                    placeholder="Napisz coś tutaj..."
                    multiline
                    rows={2}
                    className={classes.postInput}
                    onClick={() => setOpenPostCreation(true)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PhotoIcon className={classes.photoIcon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </Paper>
              <Popup
                open={openPostCreation}
                type="post"
                title="Utwórz post"
                onClose={handleClosePostCreation}
              >
                <PostForm closePopup={handleClosePostCreation} />
              </Popup>
            </TabPanelMUI>
            <TabPanelMUI value="a2">Polubienia</TabPanelMUI>
            <TabPanelMUI value="a3">Udostępnienia</TabPanelMUI>
            <TabPanelMUI value="a4">Komentarze</TabPanelMUI>
          </TabContext>
        </div>
      </TabPanel>
      <TabPanel classes={classes} value={profileNav} index={1}>
        Zdjęcia
      </TabPanel>
      <TabPanel classes={classes} value={profileNav} index={2}>
        Znajomi
      </TabPanel>
      <TabPanel classes={classes} value={profileNav} index={2}>
        Grupy
      </TabPanel>
    </div>
  );
};

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePage);
