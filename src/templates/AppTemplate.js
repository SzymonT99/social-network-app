import React, { useRef } from 'react';
import styles from './template-jss';
import { withStyles } from '@mui/styles';
import Sidebar from '../components/Sidebar/Sidebar';
import Rightbar from '../components/Rightbar/Rightbar';
import Header from '../components/Header/Header';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Copyright from '../components/Copyright/Copyright';

const AppTemplate = (props) => {
  const { classes, children } = props;

  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header />
      <div className={classes.appContainer}>
        <Sidebar />
        <div className={classes.contentContainer}>
          <main
            className={
              location.pathname !== '/app/chat'
                ? classes.contentApp
                : classes.contentChatApp
            }
          >
            {children}
          </main>
          {/*<Copyright />*/}
        </div>
        <Rightbar />
      </div>
    </>
  );
};

export default withStyles(styles)(AppTemplate);
