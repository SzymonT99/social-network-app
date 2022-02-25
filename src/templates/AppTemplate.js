import React from 'react';
import styles from './template-jss';
import { withStyles } from '@mui/styles';
import Sidebar from '../components/Sidebar/Sidebar';
import Rightbar from '../components/Rightbar/Rightbar';
import Header from '../components/Header/Header';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AppTemplate = (props) => {
  const { classes, children } = props;

  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

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
