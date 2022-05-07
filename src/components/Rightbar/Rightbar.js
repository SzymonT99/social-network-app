import React, { useEffect } from 'react';
import { withStyles } from '@mui/styles';
import styles from './rightbar-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import FriendListItem from '../FriendListItem/FriendListItem';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFriends } from '../../redux/actions/friendAction';
import { useMediaQuery } from '@mui/material';

const Rightbar = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);
  const isTokenRefreshing = useSelector(
    (state) => state.auth.isTokenRefreshing
  );
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loggedUserFriends = useSelector((state) => state.friends.userFriends);

  useEffect(() => {
    if (isUserLoggedIn) {
      const isTokenExpired =
        new Date() > new Date(loggedUser.accessTokenExpirationDate);

      if (!isTokenExpired) {
        dispatch(getUserFriends(loggedUser.userId, true));
      }
    }
  }, [isTokenRefreshing]);

  const matchesBpLG = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <div
      id="rightbar"
      className={classes.rightbarContainer}
      style={{ display: matchesBpLG ? 'block' : 'none' }}
    >
      <div
        className={classes.rightbarWrapper}
        style={{ display: !isUserLoggedIn && 'none' }}
      >
        <Typography variant="h6" className={classes.friendListTitle}>
          Lista znajomych
        </Typography>
        {loggedUserFriends.map((friend) => (
          <FriendListItem
            key={friend.friendId}
            userFriendId={friend.user.userId}
            friendName={friend.user.firstName + ' ' + friend.user.lastName}
            friendPhoto={friend.user.profilePhoto}
            friendStatus={friend.user.activityStatus}
          />
        ))}
      </div>
    </div>
  );
};

Rightbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rightbar);
