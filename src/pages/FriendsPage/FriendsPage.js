import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './friendsPage-jss';
import { PropTypes } from 'prop-types';
import PeopleIcon from '@mui/icons-material/People';
import { Button, Divider, Paper, Tab, Typography } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import TabPanelMUI from '@mui/lab/TabPanel';
import {
  getReceivedFriendInvitations,
  getSentFriendInvitations,
  getUserFriendsSuggestions,
} from '../../redux/actions/friendAction';
import Friend from '../../components/Friend/Friend';
import { useHistory } from 'react-router-dom';
import { changeProfileNav } from '../../redux/actions/userProfileActions';
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';

const FriendsPage = (props) => {
  const { classes } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const [friendsTabType, setFriendsTabType] = useState('1');

  const loggedUser = useSelector((state) => state.auth.user);
  const isUserRemember = useSelector((state) => state.auth.remember);
  const receivedFriendInvitations = useSelector(
    (state) => state.friends.receivedFriendInvitations
  );
  const sentFriendInvitations = useSelector(
    (state) => state.friends.sentFriendInvitations
  );
  const friendsSuggestions = useSelector(
    (state) => state.friends.friendsSuggestions
  );

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
      dispatch(getUserFriendsSuggestions());
      dispatch(getReceivedFriendInvitations(loggedUser.userId, true));
      dispatch(getSentFriendInvitations(loggedUser.userId));
    })();
  }, []);

  const handleChangeFriendsTabType = (event, newValue) => {
    setFriendsTabType(newValue);
  };

  const handleClickUserFriends = () => {
    dispatch(changeProfileNav(3));
    history.push('/app/profile/' + loggedUser.userId);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.headingFriendsBox}>
        <PeopleIcon className={classes.friendIcon} />
        <Typography className={classes.friendHeadingText} variant="h3">
          Znajomi
        </Typography>
      </div>
      <Paper elevation={4} className={classes.friendsContainer}>
        <TabContext value={friendsTabType}>
          <div className={classes.friendsNavContainer}>
            <TabList
              onChange={handleChangeFriendsTabType}
              className={classes.tabsContainer}
            >
              <Tab
                className={classes.tabItem}
                label="Propozycje znajomych"
                value={'1'}
              />
              <Tab
                className={classes.tabItem}
                label="Otrzymane zaproszenia"
                value={'2'}
              />
              <Tab
                className={classes.tabItem}
                label="Wysłane zaproszenia"
                value={'3'}
              />
            </TabList>
            <Button
              variant="contained"
              color="primary"
              className={classes.userFriendsListBtn}
              onClick={handleClickUserFriends}
            >
              Moja lista znajomych
            </Button>
          </div>
          <Divider />
          <TabPanelMUI value="1" sx={{ padding: 0 }}>
            <div className={classes.friendsListContent}>
              {friendsSuggestions.map((friendsSuggestion) => (
                <Friend
                  suggestion
                  key={friendsSuggestion.userId}
                  userId={friendsSuggestion.userId}
                  name={
                    friendsSuggestion.firstName +
                    ' ' +
                    friendsSuggestion.lastName
                  }
                  photo={friendsSuggestion.profilePhoto}
                  city={
                    friendsSuggestion.address
                      ? friendsSuggestion.address.city
                      : null
                  }
                  friendList={friendsSuggestion.userFriends}
                  mutualFriendList={friendsSuggestion.mutualFriends}
                />
              ))}
              {friendsSuggestions.length === 0 && (
                <Typography
                  variant="subtitle1"
                  width="100%"
                  textAlign="center"
                  marginTop="15px"
                >
                  Brak propozycji znajomych
                </Typography>
              )}
            </div>
          </TabPanelMUI>
          <TabPanelMUI value="2" sx={{ padding: 0 }}>
            <div className={classes.friendsListContent}>
              {receivedFriendInvitations.map((receivedInvitation) => (
                <Friend
                  receivedInvitation
                  key={receivedInvitation.invitingUser.userId}
                  userId={receivedInvitation.invitingUser.userId}
                  name={
                    receivedInvitation.invitingUser.firstName +
                    ' ' +
                    receivedInvitation.invitingUser.lastName
                  }
                  photo={receivedInvitation.invitingUser.profilePhoto}
                  friendList={receivedInvitation.invitingUserFriends}
                  invitationDate={receivedInvitation.invitationDate}
                />
              ))}
              {receivedFriendInvitations.length === 0 && (
                <Typography
                  variant="subtitle1"
                  width="100%"
                  textAlign="center"
                  marginTop="15px"
                >
                  Brak otrzymanych zaproszeń
                </Typography>
              )}
            </div>
          </TabPanelMUI>
          <TabPanelMUI value="3" sx={{ padding: 0 }}>
            <div className={classes.friendsListContent}>
              {sentFriendInvitations.map((sentInvitation) => (
                <Friend
                  sentInvitation
                  key={sentInvitation.friendId}
                  userId={sentInvitation.invitedUser.userId}
                  invitingFriendId={sentInvitation.friendId}
                  name={
                    sentInvitation.invitedUser.firstName +
                    ' ' +
                    sentInvitation.invitedUser.lastName
                  }
                  photo={sentInvitation.invitedUser.profilePhoto}
                  friendList={sentInvitation.invitedUserFriends}
                  invitationDate={sentInvitation.invitationDate}
                />
              ))}
              {sentFriendInvitations.length === 0 && (
                <Typography
                  variant="subtitle1"
                  width="100%"
                  textAlign="center"
                  marginTop="15px"
                >
                  Brak wysłanych zaproszeń
                </Typography>
              )}
            </div>
          </TabPanelMUI>
        </TabContext>
      </Paper>
    </div>
  );
};

FriendsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FriendsPage);
