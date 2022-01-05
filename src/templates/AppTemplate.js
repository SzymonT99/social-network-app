import React from 'react';
import styles from './template-jss';
import { withStyles } from '@mui/styles';
import Sidebar from '../components/Sidebar/Sidebar';
import Rightbar from '../components/Rightbar/Rightbar';
import Header from '../components/Header/Header';

const AppTemplate = (props) => {
  const { classes, children } = props;

  return (
    <>
      <Header />
      <div className={classes.appContainer}>
        <Sidebar />
        <div className={classes.contentContainer}>
          <main className={classes.contentApp}>{children}</main>
        </div>
        <Rightbar />
      </div>
    </>
  );
};

export default withStyles(styles)(AppTemplate);
