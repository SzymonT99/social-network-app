import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './postComment-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import { Badge, TextField } from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';

const formatTime = (createdDate) => {
  let diffInMs = (new Date().getTime() - createdDate) / 1000;
  let minutes = Math.floor(diffInMs / 60);

  if (minutes < 30) {
    return 'kilka minut temu';
  } else if (minutes < 90) {
    return '1 godz. temu';
  } else if (minutes >= 90 && minutes < 150) {
    return '2 godz. temu';
  } else if (minutes >= 150 && minutes < 210) {
    return '3 godz. temu';
  } else if (minutes >= 210 && minutes < 270) {
    return '4 godz. temu';
  } else if (minutes >= 270 && minutes < 1440) {
    return 'kilka godz. temu';
  } else if (minutes >= 1440 && minutes < 1560) {
    return '1 dzień temu';
  } else if (minutes >= 1560 && minutes < 3000) {
    return '2 dni temu';
  } else if (minutes >= 3000 && minutes < 4440) {
    return '3 dni temu';
  } else {
    return 'kilka dni temu';
  }
};

const activeStatus = {
  ONLINE: '#1CCD16',
  BE_RIGHT_BACK: 'orange',
  BUSY: 'purple',
  OFFLINE: '#FF1C00',
};

const PostComment = (props) => {
  const { classes, content, authorName, createdDate, userStatus } = props;

  return (
    <div className={classes.commentContainer}>
      <div className={classes.authorContainer}>
        <Badge
          variant="dot"
          overlap="circular"
          sx={{
            marginRight: '20px',
            '& .MuiBadge-badge': {
              backgroundColor: activeStatus[userStatus],
            },
          }}
        >
          <img
            src={defaultUserPhoto}
            alt="Zdjęcie użytkownika"
            className={classes.userPhoto}
          />
        </Badge>
        <div>
          <Typography variant="subtitle1" component="div" fontWeight="bold">
            {authorName}
            <span className={classes.actionName}> dodał komentarz</span>
          </Typography>
          <Typography variant="body2" component="div">
            {formatTime(createdDate)}
          </Typography>
        </div>
      </div>
      <TextField
        fullWidth
        multiline
        maxRows={5}
        className={classes.commentInput}
        value={content}
      />
    </div>
  );
};

PostComment.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  createdDate: PropTypes.number.isRequired,
  userStatus: PropTypes.string.isRequired,
};

export default withStyles(styles)(PostComment);
