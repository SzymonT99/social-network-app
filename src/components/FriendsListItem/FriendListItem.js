import React, { useEffect, useState } from 'react';
import styles from './friendListItem-jss';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import { PropTypes } from 'prop-types';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const activeStatus = {
  online: '#1CCD16',
  beRightBack: 'orange',
  busy: 'purple',
  offline: '#FF1C00',
};

const FriendsListItem = (props) => {
  const { classes, image, name, status } = props;

  return (
    <div className={classes.friendBox}>
      <img
        src={defaultUserPhoto}
        alt="Zdjęcie użytkownika"
        className={image ? image : classes.userPhoto}
      />
      <Typography variant="subtitle1">{name}</Typography>
      <FiberManualRecordIcon style={{ color: activeStatus[status] }} />
    </div>
  );
};

FriendsListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FriendsListItem);
