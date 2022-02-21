import React, { useEffect, useState } from 'react';
import styles from './accountActivatePage-jss';
import { withStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory, useParams } from 'react-router-dom';
import logoWhite from '../../assets/logo-white.png';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { activateAccount } from '../../redux/actions/authActions';
import Popup from '../../components/Popup/Popup';
import ResendActivationLinkForm from '../../components/Forms/AccountSettings/ResendActivationLinkForm';

const AccountActivatePage = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const [message, setMessage] = useState('');
  const [accountInfo, setAccountInfo] = useState(null);
  const [isLinkExpired, setIsLinkExpired] = useState(false);
  const [openResendActivationLinkPopup, setOpenResendActivationLinkPopup] =
    useState(false);

  let { token } = useParams();

  useEffect(() => {
    dispatch(activateAccount(token)).then((response) => {
      return response.json().then((json) => {
        console.log(json);
        if (response.status === 200) {
          setMessage('Konto użytkownika zostało pomyślnie aktywowane');
          setAccountInfo(json);
        } else if (response.status === 400) {
          setMessage('Konto zostało już wcześniej aktywowane');
        } else if (response.status === 410) {
          setMessage('Link aktywujący konto wygasł');
          setIsLinkExpired(true);
        }
      });
    });
  }, [token]);

  const handleCloseActivationLinkPopup = () => {
    setOpenResendActivationLinkPopup(false);
  };

  return (
    <div className={classes.activateAccountContainer}>
      <div className={classes.appInfoBox}>
        <Typography
          variant="h1"
          gutterBottom
          className={classes.appName}
          onClick={() => history.push('/auth/login')}
        >
          <img src={logoWhite} className={classes.logo} alt="Logo" />
          Social Network
        </Typography>
      </div>
      <Paper elevation={4} className={classes.activateAccountContent}>
        <Typography variant="h4" className={classes.activateAccountHeading}>
          Aktywacja konta
        </Typography>

        <div className={classes.activateInfoBox}>
          <Typography variant="h6" marginBottom={!accountInfo && '20px'}>
            {message}
          </Typography>
          {accountInfo !== null && (
            <Typography variant="subtitle1">
              Nazwa użytkownika:{' '}
              <span className={classes.activateUserText}>
                {accountInfo.username}
              </span>
              <br />
              Adres email:{' '}
              <span className={classes.activateUserText}>
                {accountInfo.userEmail}
              </span>
            </Typography>
          )}
        </div>

        <Button
          variant="contained"
          color="primary"
          className={classes.activateAccountBtn}
          onClick={() => history.push('/auth/login')}
        >
          Przedź do logowania
        </Button>
        {isLinkExpired && (
          <Button
            variant="contained"
            color="secondary"
            className={classes.activateAccountBtn}
            onClick={() => setOpenResendActivationLinkPopup(true)}
          >
            Wyślij nowy link aktywacyjny
          </Button>
        )}
        <Popup
          open={openResendActivationLinkPopup}
          type="resendAccountLink"
          title="Wyślij nowy link aktywacyjny"
          onClose={handleCloseActivationLinkPopup}
        >
          <ResendActivationLinkForm
            closePopup={handleCloseActivationLinkPopup}
          />
        </Popup>
      </Paper>
    </div>
  );
};

AccountActivatePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountActivatePage);
