import React from 'react';
import styles from './template-jss';
import { withStyles } from '@mui/styles';
import background from '../assets/social-network-background.jpg';
import { Copyright } from '@mui/icons-material';

const AuthTemplate = (props) => {
  const { classes, children } = props;

  return (
    <div
      style={{ backgroundImage: `url('${background}')` }}
      className={classes.authContainer}
    >
      <main className={classes.authContent}>{children}</main>
    </div>
  );
};

export default withStyles(styles)(AuthTemplate);
