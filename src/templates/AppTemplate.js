import React from 'react';
import styles from './template-jss';
import { withStyles } from '@mui/styles';
import Sidebar from '../components/Sidebar/Sidebar';
import Rightbar from '../components/Rightbar/Rightbar';
import Header from '../components/Header/Header';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AppTemplate = (props) => {
  const { classes, children } = props;

  const { isLoggedIn, isGuest } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isLoggedIn && !isGuest) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header />
      <div className={classes.appContainer}>
        <Sidebar />
        <div
          className={classes.contentContainer}
          style={{ flex: location.pathname === '/app/admin' && 10 }}
        >
          <main
            className={
              location.pathname !== '/app/chat' &&
              location.pathname !== '/app/admin'
                ? classes.contentApp
                : classes.extendsContentApp
            }
          >
            {children}
          </main>
        </div>
        {location.pathname !== '/app/admin' && <Rightbar />}
      </div>
    </>
  );
};

export default withStyles(styles)(AppTemplate);
