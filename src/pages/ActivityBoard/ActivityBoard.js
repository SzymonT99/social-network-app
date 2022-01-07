import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './activityBoard-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import { Button, Divider, InputAdornment, TextField } from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import PhotoIcon from '@mui/icons-material/Photo';
import FriendInvitation from '../../components/FriendInvitation/FriendInvitation';
import Post from '../../components/Post/Post';
import Popup from '../../components/Popup/Popup';
import PostForm from '../../components/Forms/PostForm';

const ActivityBoard = (props) => {
  const { classes } = props;

  const [openPostCreation, setOpenPostCreation] = useState(false);

  const handleClosePostCreation = () => {
    setOpenPostCreation(false);
  };

  const dispatch = useDispatch();

  return (
    <div className={classes.boardContainer}>
      <div className={classes.activityContent}>
        <div className={classes.activityWrapper}>
          <Paper
            elevation={7}
            sx={{ borderRadius: '10px' }}
            className={classes.postCreateBox}
          >
            <Typography variant="h6"> Utwórz post</Typography>
            <Divider className={classes.divider} />
            <div className={classes.postCreateContent}>
              <img
                src={defaultUserPhoto}
                alt="Zdjęcie użytkownika"
                className={classes.userPhoto}
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
            type="createPost"
            title="Utwórz post"
            handleClose={handleClosePostCreation}
          >
            <PostForm />
          </Popup>
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
      <div className={classes.infoContent}>
        <div className={classes.infoWrapper}>
          <Paper
            elevation={7}
            sx={{ borderRadius: '10px' }}
            style={{ padding: '15px' }}
          >
            <Typography variant="h6">Zaproszenia do znajomych</Typography>
            <FriendInvitation name="Tester Tester" />
            <FriendInvitation name="Tester Tester" />
            <FriendInvitation name="Tester Tester" />
            <FriendInvitation name="Tester Tester" />
            <FriendInvitation name="Tester Tester" />
          </Paper>
        </div>
      </div>
    </div>
  );
};

ActivityBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActivityBoard);
