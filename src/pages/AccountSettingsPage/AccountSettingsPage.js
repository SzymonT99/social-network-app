import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './accountSettingsPage-jss';
import { PropTypes } from 'prop-types';
import SettingsIcon from '@mui/icons-material/Settings';
import { Paper, Tab, Tabs, Typography } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeEmailForm from '../../components/Forms/AccountSettings/ChangeEmailForm';
import ChangeUsernameForm from '../../components/Forms/AccountSettings/ChangeUsernameForm';
import ChangePhoneNumberForm from '../../components/Forms/AccountSettings/ChangePhoneNumberForm';
import ChangePasswordForm from '../../components/Forms/AccountSettings/ChangePasswordForm';
import DeleteAccountForm from '../../components/Forms/AccountSettings/DeleteAccountForm';
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';
import PageHeader from '../../components/PageHeader/PageHeader';

const TabPanel = (props) => {
  const { children, value, index } = props;
  return <div>{value === index && <div>{children}</div>}</div>;
};

const AccountSettingsPage = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();

  const [settingsNavValue, setSettingsNavValue] = useState(0);

  const userProfile = useSelector((state) => state.auth.userProfile);
  const loggedUser = useSelector((state) => state.auth.user);
  const isUserRemember = useSelector((state) => state.auth.remember);

  const handleChangeSettingsNav = (event, newValue) => {
    setSettingsNavValue(newValue);
  };

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
    })();
  }, []);

  return (
    <div className={classes.wrapper}>
      <PageHeader heading="Ustawienia konta" type="settings" />
      <Paper elevation={4} className={classes.settingsContainer}>
        <div className={classes.settingsNav}>
          <Tabs
            value={settingsNavValue}
            onChange={handleChangeSettingsNav}
            className={classes.settingsTabList}
            TabIndicatorProps={{
              style: {
                display: 'none',
              },
            }}
          >
            <Tab label="Adres email" icon={<AlternateEmailIcon />} />
            <Tab label="Nazwa użytkownika" icon={<ManageAccountsIcon />} />
            <Tab label="Hasło" icon={<LockIcon />} />
            <Tab label="Numer telefonu" icon={<PhoneIcon />} />
            <Tab label="Usuwanie konta" icon={<DeleteIcon />} />
          </Tabs>
        </div>
        <div className={classes.settingsContent}>
          <TabPanel value={settingsNavValue} index={0}>
            <Typography variant="h5" fontWeight="bold">
              Zmiana adresu email
            </Typography>
            <Typography variant="subtitle1" marginTop="10px">
              {'Aktualny adres email: '}
              <span className={classes.currentValueText}>
                {userProfile.email}
              </span>
            </Typography>
            <ChangeEmailForm currentEmail={userProfile.email} />
          </TabPanel>
          <TabPanel value={settingsNavValue} index={1}>
            <Typography variant="h5" fontWeight="bold">
              Zmiana nazwy użytkownika
            </Typography>
            <Typography variant="subtitle1" marginTop="10px">
              {'Aktualna nazwa użytkownika: '}
              <span className={classes.currentValueText}>
                {userProfile.username}
              </span>
            </Typography>
            <ChangeUsernameForm currentUsername={userProfile.username} />
          </TabPanel>
          <TabPanel value={settingsNavValue} index={2}>
            <Typography variant="h5" fontWeight="bold">
              Zmiana hasła
            </Typography>
            <ChangePasswordForm />
          </TabPanel>
          <TabPanel value={settingsNavValue} index={3}>
            <Typography variant="h5" fontWeight="bold">
              Zmiana numeru telefonu
            </Typography>
            <Typography variant="subtitle1" marginTop="10px">
              {'Aktualny numer telefonu: '}
              <span className={classes.currentValueText}>
                {userProfile.phoneNumber}
              </span>
            </Typography>
            <ChangePhoneNumberForm
              currentPhoneNumber={userProfile.phoneNumber}
            />
          </TabPanel>
          <TabPanel value={settingsNavValue} index={4}>
            <Typography variant="h5" fontWeight="bold">
              Usuwanie konta
            </Typography>
            <DeleteAccountForm />
          </TabPanel>
        </div>
      </Paper>
    </div>
  );
};

AccountSettingsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountSettingsPage);
