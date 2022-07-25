import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './boardItems-jss';
import { PropTypes } from 'prop-types';
import { Divider, Paper } from '@mui/material';
import ActivityHeading from '../ActivityHeading/ActivityHeading';

const ActivityBoardItem = (props) => {
  const {
    classes,
    authorId,
    authorName,
    authorStatus,
    profilePhoto,
    activityTitle,
    activityDate,
    children,
  } = props;

  return (
    <Paper elevation={4} className={classes.boardItemContainer}>
      <ActivityHeading
        authorId={authorId}
        authorName={authorName}
        profilePhoto={profilePhoto}
        createdDate={activityDate}
        activityTitle={activityTitle}
        userStatus={authorStatus}
      />
      <Divider className={classes.divider} />
      <div className={classes.activityContent}>{children}</div>
    </Paper>
  );
};

ActivityBoardItem.propTypes = {
  classes: PropTypes.object.isRequired,
  authorId: PropTypes.number.isRequired,
  authorName: PropTypes.string.isRequired,
  authorStatus: PropTypes.string.isRequired,
  profilePhoto: PropTypes.object,
  activityDate: PropTypes.object.isRequired,
  activityTitle: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default withStyles(styles)(ActivityBoardItem);
