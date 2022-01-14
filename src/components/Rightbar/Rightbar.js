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
        <Typography variant="h6">Lista znajomych</Typography>
        <FriendListItem name="Dawid Dawidowski" status="online" />
        <FriendListItem name="Celina Celinowska" status="offline" />
        <FriendListItem name="Grzegorz Grzegowicz" status="beRightBack" />
        <FriendListItem name="Piotr Piotrowski" status="online" />
        <FriendListItem name="Patryk Patrykowski" status="online" />
        <FriendListItem name="Rafał Rafałowski" status="busy" />
      </div>
    </div>
  );
};

Rightbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rightbar);
