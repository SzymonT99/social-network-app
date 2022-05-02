import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './friendsPage-jss';
import { PropTypes } from 'prop-types';
import { Button, Divider, Paper, Tab, Tabs, Typography } from '@mui/material';
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
import PageHeader from '../../components/PageHeader/PageHeader';

const TabPanel = (props) => {
  const { children, value, classes, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};

const FriendsPage = (props) => {
  const { classes } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const [friendsTabType, setFriendsTabType] = useState(0);

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
      <PageHeader heading="Znajomi" type="friends" />
      <Paper elevation={4} className={classes.friendsContainer}>
        <div className={classes.friendsNavContainer}>
          <Tabs
            value={friendsTabType}
            onChange={handleChangeFriendsTabType}
            className={classes.tabsContainer}
          >
            <Tab
              className={classes.tabItem}
              label="Propozycje znajomych"
              id="tab-friend-suggestions"
            />
            <Tab
              className={classes.tabItem}
              label="Otrzymane zaproszenia"
              id="tab-received-invitations"
            />
            <Tab
              className={classes.tabItem}
              label="Wysłane zaproszenia"
              id="tab-sent-Invitations"
            />
          </Tabs>
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
        <TabPanel classes={classes} value={friendsTabType} index={0}>
          <div className={classes.friendsListContent}>
            {friendsSuggestions.map((friendsSuggestion) => (
              <Friend
                suggestion
                key={friendsSuggestion.userId}
                userId={friendsSuggestion.userId}
                name={
                  friendsSuggestion.firstName + ' ' + friendsSuggestion.lastName
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
              <Typography variant="subtitle1" className={classes.noContent}>
                Brak propozycji znajomych
              </Typography>
            )}
          </div>
        </TabPanel>
        <TabPanel classes={classes} value={friendsTabType} index={1}>
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
              <Typography variant="subtitle1" className={classes.noContent}>
                Brak otrzymanych zaproszeń
              </Typography>
            )}
          </div>
        </TabPanel>
        <TabPanel classes={classes} value={friendsTabType} index={2}>
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
              <Typography variant="subtitle1" className={classes.noContent}>
                Brak wysłanych zaproszeń
              </Typography>
            )}
          </div>
        </TabPanel>
      </Paper>
    </div>
  );
};

FriendsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FriendsPage);
