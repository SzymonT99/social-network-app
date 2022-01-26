import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './activityHeading-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import { Badge } from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';

import Avatar from '@mui/material/Avatar';

const formatPostTime = (createdDate) => {
  let diffInMs = (new Date().getTime() - createdDate.getTime()) / 1000;
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
  } else if (minutes >= 3000 && minutes < 3100) {
    return '3 dni temu';
  } else {
    let day = createdDate.getDate();
    let month = createdDate.getMonth() + 1;
    let year = createdDate.getFullYear();
    let hour = createdDate.getHours();
    let minutes = createdDate.getMinutes();
    return (
      (day <= 9 ? '0' + day : day) +
      '.' +
      (month <= 9 ? '0' + month : month) +
      '.' +
      year +
      ' r. ' +
      (hour <= 9 ? '0' + hour : hour) +
      ':' +
      (minutes <= 9 ? '0' + minutes : minutes)
    );
  }
};

const ActivityHeading = (props) => {
  const {
    classes,
    authorName,
    profilePhoto,
    userStatus,
    activityTitle,
    isEdited,
    createdDate,
    editionDate,
    children,
  } = props;

  const activeStatus = {
    ONLINE: '#1CCD16',
    BE_RIGHT_BACK: 'orange',
    BUSY: 'purple',
    OFFLINE: '#FF1C00',
  };

  return (
    <div className={classes.headingBox}>
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
          <Avatar
            src={profilePhoto ? profilePhoto.url : defaultUserPhoto}
            alt={authorName}
            className={classes.userPhoto}
          />
        </Badge>
        <div>
          <Typography variant="subtitle1" fontWeight="bold">
            {authorName}
            <span className={classes.actionName}>{activityTitle}</span>
            {isEdited && (
              <Typography component="span" variant="body2" fontWeight="bold">
                {' - edytowano ' +
                  editionDate.substring(0, editionDate.length - 3)}
              </Typography>
            )}
          </Typography>
          <Typography variant="body2">{formatPostTime(createdDate)}</Typography>
        </div>
      </div>
      {children}
    </div>
  );
};

ActivityHeading.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  authorName: PropTypes.string.isRequired,
  profilePhoto: PropTypes.object,
  userStatus: PropTypes.string.isRequired,
  activityTitle: PropTypes.string.isRequired,
  createdDate: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActivityHeading);
