import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './activityBoard-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import { Divider, TextField } from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import PhotoIcon from '@mui/icons-material/Photo';
import FriendInvitation from '../../components/FriendInvitation/FriendInvitation';
import Post from '../../components/Post/Post';
import { endpoints } from '../../services/endpoints/endpoints';
import { Redirect } from 'react-router-dom';

const ActivityBoard = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({});

  let userId = useSelector((state) => state.auth.user.userId);
  let accessToken = useSelector((state) => state.auth.user.accessToken);
  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
                id="createPostInput"
                variant="filled"
                placeholder="Napisz coś tutaj"
                className={classes.postCreateInput}
                InputProps={{
                  disableUnderline: true,
                  underline: {
                    borderBottom: 'none',
                  },
                  endAdornment: <PhotoIcon />,
                  style: {
                    fontSize: 17,
                    height: '100px',
                    borderRadius: '20px',
                    verticalAlign: 'center',
                  },
                }}
              />
            </div>
          </Paper>
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
