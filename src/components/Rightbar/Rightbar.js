import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './rightbar-jss';
import { PropTypes } from 'prop-types';

const Rightbar = (props) => {
  const { classes } = props;

  return (
    <div className={classes.rightbarContainer}>
      <div className={classes.rightbarWrapper}>Rightbar</div>
    </div>
  );
};

Rightbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rightbar);
