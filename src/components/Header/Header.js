import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './header-jss';
import { PropTypes } from 'prop-types';
import logoWhite from '../../assets/logo-white.png';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import Typography from '@mui/material/Typography';
import { Autocomplete, Badge, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';

const Header = (props) => {
  const { classes } = props;

  return (
    <div className={classes.headerContainer}>
      <Typography
        variant="h4"
        component="div"
        className={classes.logoContainer}
      >
        <img src={logoWhite} className={classes.logo} alt="Logo" />
        Social Network
      </Typography>

      <div className={classes.searchContainer}>
        <div className={classes.searchbar}>
          <Autocomplete
            fullWidth
            freeSolo
            id="searchbar"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Szukaj znajomych"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  type: 'search',
                  sx: {
                    borderRadius: '10px',
                    backgroundColor: '#FFB188',
                  },
                }}
              />
            )}
          />
        </div>
      </div>
      <div className={classes.actionContainer}>
        <div className={classes.actionIcons}>
          <Badge
            sx={{
              '& .MuiBadge-badge': {
                color: 'white',
                backgroundColor: '#1CCD16',
              },
            }}
            overlap="circular"
            badgeContent={1}
          >
            <PersonIcon
              color="primary"
              sx={{ fontSize: '45px', cursor: 'pointer' }}
            />
          </Badge>
          <Badge
            sx={{
              '& .MuiBadge-badge': {
                color: 'white',
                backgroundColor: '#FF1C00',
              },
            }}
            overlap="circular"
            badgeContent={4}
          >
            <NotificationsIcon
              color="primary"
              sx={{ fontSize: '45px', cursor: 'pointer' }}
            />
          </Badge>
          <Badge
            sx={{
              '& .MuiBadge-badge': {
                color: 'white',
                backgroundColor: '#07DCC0',
              },
            }}
            overlap="circular"
            badgeContent={4}
          >
            <MessageIcon
              color="primary"
              sx={{ fontSize: '45px', cursor: 'pointer' }}
            />
          </Badge>
        </div>
        <div className={classes.userInfoBox}>
          <Typography variant="h4" className={classes.nameAndSurname}>
            undefined undefined
          </Typography>
          <img
            src={defaultUserPhoto}
            alt="Zdjęcie użytkownika"
            className={classes.userPhoto}
          />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
