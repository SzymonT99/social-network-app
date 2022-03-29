import React from 'react';
import { makeStyles, withStyles } from '@mui/styles';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import logoWhite from '../../assets/logo-white.png';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    padding: '30px',
    borderRadius: '20px',
    marginBottom: '100px',
  },
  appName: {
    '&.MuiTypography-root': {
      display: 'flex',
      alignItems: 'center',
      lineHeight: 1,
      color: theme.palette.secondary.main,
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  logo: {
    width: '122px',
    height: '105px',
    marginRight: '40px',
  },
  codeText: {
    '&.MuiTypography-root': {
      marginTop: '50px',
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: '200px',
    },
  },
  warningInfo: {
    lineHeight: 0,
    color: theme.palette.secondary.dark,
    fontWeight: 'bold',
  },
}));

const NotFoundPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.container}
        style={{
          backgroundColor: !location.pathname.includes('/app') && 'transparent',
        }}
      >
        <Typography
          variant="h1"
          className={classes.appName}
          onClick={() => history.push('/auth/login')}
        >
          <img src={logoWhite} className={classes.logo} alt="Logo" />
          Social Network
        </Typography>
        <Typography className={classes.codeText}>404</Typography>
        <Typography variant="h3" className={classes.warningInfo}>
          Nie znaleziono strony
        </Typography>
      </div>
    </div>
  );
};

NotFoundPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default NotFoundPage;
