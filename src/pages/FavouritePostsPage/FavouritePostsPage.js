import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './favouritePostsPage-jss';
import { PropTypes } from 'prop-types';
import EventIcon from '@mui/icons-material/Event';
import { Typography } from '@mui/material';
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';
import PageHeader from '../../components/PageHeader/PageHeader';

const FavouritePostsPage = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);
  const isUserRemember = useSelector((state) => state.auth.remember);

  useEffect(() => {
    (async () => {
      if (
        isUserRemember &&
        new Date() > new Date(loggedUser.accessTokenExpirationDate)
      ) {
        dispatch(setTokenRefreshing(true));
        await dispatch(refreshUserToken(loggedUser.refreshToken)).then(() => {
          dispatch(setTokenRefreshing(false));
        });
      }
      //...
    })();
  }, []);

  return (
    <div className={classes.wrapper}>
      <PageHeader heading="Ulubione posty" type="favourites" />
      <div className={classes.favouritesContainer}>
        <div className={classes.favouritesContent}></div>
      </div>
    </div>
  );
};

FavouritePostsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FavouritePostsPage);
