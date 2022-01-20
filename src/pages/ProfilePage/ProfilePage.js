import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './profilePage-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import {
  IconButton,
  Input,
  List,
  ListItem,
  TextField,
  Tooltip,
} from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import { PhotoCamera } from '@mui/icons-material';

const ProfilePage = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);

  useEffect(() => {}, []);

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
    </div>
  );
};

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePage);
