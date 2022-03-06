import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './groupsPage-jss';
import { PropTypes } from 'prop-types';
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';
import PageHeader from '../../components/PageHeader/PageHeader';
import { TabContext, TabList } from '@mui/lab';
import Paper from '@mui/material/Paper';
import { Button, Tab } from '@mui/material';
import TabPanelMUI from '@mui/lab/TabPanel';

const GroupsPage = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);
  const isUserRemember = useSelector((state) => state.auth.remember);

  const [groupTabType, setGroupTabType] = useState('1');
  const [openGroupCreation, setOpenGroupCreation] = useState(false);

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
      // ...
    })();
  }, []);

  const handleChangeGroupTabType = (event, newValue) => {
    setGroupTabType(newValue);
  };

  const handleCloseGroupCreation = () => {
    setOpenGroupCreation(false);
  };

  return (
    <div className={classes.wrapper}>
      <PageHeader heading="Grupy tematyczne" type="groups" />
      <TabContext value={groupTabType}>
        <Paper elevation={4} className={classes.groupsTopContainer}>
          <TabList
            onChange={handleChangeGroupTabType}
            className={classes.tabsContainer}
          >
            <Tab
              className={classes.tabItem}
              label="Dostępne grupy"
              value={'1'}
            />
            <Tab
              className={classes.tabItem}
              label="Propozycje grup"
              value={'2'}
            />
            <Tab
              className={classes.tabItem}
              label="Zaproszenia do grup"
              value={'3'}
            />
          </TabList>
          <Button
            variant="contained"
            color="primary"
            className={classes.addGroupBtn}
            onClick={() => setOpenGroupCreation(true)}
          >
            Utwórz nową grupę
          </Button>
          {/*<Popup*/}
          {/*  open={openGroupCreation}*/}
          {/*  type="group"*/}
          {/*  title="Utwórz grupę"*/}
          {/*  onClose={handleCloseGroupCreation}*/}
          {/*>*/}
          {/*  <GroupForm*/}
          {/*    closePopup={handleCloseGroupCreation}*/}
          {/*    updateEvents={updateGroups}*/}
          {/*  />*/}
          {/*</Popup>*/}
        </Paper>
        <TabPanelMUI value="1" sx={{ padding: 0 }}></TabPanelMUI>
      </TabContext>
    </div>
  );
};

GroupsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupsPage);
