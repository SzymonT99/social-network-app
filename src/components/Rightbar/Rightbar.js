import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './rightbar-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import FriendListItem from '../FriendsListItem/FriendListItem';

const Rightbar = (props) => {
  const { classes } = props;

  return (
    <div className={classes.rightbarContainer}>
      <div className={classes.rightbarWrapper}>
        <Typography variant="h6" className={classes.friendsHeading}>
          Lista znajomych
        </Typography>
        <FriendListItem name="Tester Tester" status="online" />
        <FriendListItem name="Tester Tester" status="offline" />
        <FriendListItem name="Tester Tester" status="beRightBack" />
        <FriendListItem name="Tester Tester" status="online" />
        <FriendListItem name="Tester Tester" status="online" />
        <FriendListItem name="Tester Tester" status="busy" />
      </div>
    </div>
  );
};

Rightbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rightbar);
