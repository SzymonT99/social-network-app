import React from 'react';
import styles from './profile-jss';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';

const ProfileInformationItem = (props) => {
  const { classes, title, content } = props;

  return (
    <div className={classes.profileInformationItemContainer}>
      <Typography
        variant="subtitle1"
        noWrap
        className={classes.profileInformationItemTitle}
      >
        {title + ':'}
      </Typography>
      <Typography
        variant="subtitle1"
        noWrap
        className={classes.profileInformationItemContent}
      >
        {content}
      </Typography>
    </div>
  );
};

ProfileInformationItem.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default withStyles(styles)(ProfileInformationItem);
