import React from 'react';
import styles from './pageHeader-jss';
import { withStyles } from '@mui/styles';
import { PropTypes } from 'prop-types';
import { Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import EventIcon from '@mui/icons-material/Event';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PeopleIcon from '@mui/icons-material/People';

const PageHeader = (props) => {
  const { classes, heading, type } = props;

  const iconTypes = {
    settings: <SettingsIcon className={classes.headingIcon} />,
    events: <EventIcon className={classes.headingIcon} />,
    favourites: <BookmarkIcon className={classes.headingIcon} />,
    friends: <PeopleIcon className={classes.headingIcon} />,
  };

  return (
    <div className={classes.headingContainer}>
      {iconTypes[type]}
      <Typography className={classes.headingText} variant="h3">
        {heading}
      </Typography>
    </div>
  );
};

PageHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default withStyles(styles)(PageHeader);
