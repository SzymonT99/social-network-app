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
import Paper from '@mui/material/Paper';
import { Button, Pagination, Tab, Tabs, Typography } from '@mui/material';
import {
  getGroupInvitations,
  getGroups,
  getUserInterestingGroups,
} from '../../redux/actions/groupActions';
import CircularProgress from '@mui/material/CircularProgress';
import Group from '../../components/Group/Group';
import Popup from '../../components/Popup/Popup';
import GroupForm from '../../components/Forms/GroupForm';
import { getPossibleInterests } from '../../redux/actions/userProfileActions';
import SearchItemsBox from '../../components/SearchItemsBox/SearchItemsBox';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

const GroupsPage = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();

  const groups = useSelector((state) => state.groups.publicGroups);
  const interestingGroups = useSelector(
    (state) => state.groups.userInterestingGroups
  );
  const groupInvitations = useSelector(
    (state) => state.groups.groupInvitations
  );

  const loggedUser = useSelector((state) => state.auth.user);
  const isUserRemember = useSelector((state) => state.auth.remember);
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [groupTabType, setGroupTabType] = useState(0);
  const [openGroupCreation, setOpenGroupCreation] = useState(false);
  const [groupsOrder, setGroupsOrder] = useState(1);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [groupsPageNumber, setGroupsPageNumber] = useState(1);
  const [interestingGroupsPageNumber, setInterestingGroupsPageNumber] =
    useState(1);

  useEffect(() => {
    (async () => {
      if (
        isUserLoggedIn &&
        isUserRemember &&
        new Date() > new Date(loggedUser.accessTokenExpirationDate)
      ) {
        dispatch(setTokenRefreshing(true));
        await dispatch(refreshUserToken(loggedUser.refreshToken)).then(() => {
          dispatch(setTokenRefreshing(false));
        });
      }
      dispatch(getGroups()).then((data) => {
        setFilteredGroups(data);
      });
      if (isUserLoggedIn) {
        dispatch(getUserInterestingGroups());
        dispatch(getGroupInvitations());
        dispatch(getPossibleInterests());
      }
    })();
  }, []);

  const handleChangeGroupTabType = (event, newValue) => {
    setGroupTabType(newValue);
  };

  const handleCloseGroupCreation = () => {
    setOpenGroupCreation(false);
  };

  const renderGroupsByName = (value) => {
    setFilteredGroups(
      groups.filter((group) =>
        group.name.toUpperCase().includes(value.toUpperCase())
      )
    );
  };

  const sortGroups = (groupOrderType) => {
    if (groupOrderType === 1) {
      filteredGroups.sort(
        (x, y) => new Date(y.createdAt) - new Date(x.createdAt)
      );
    } else if (groupOrderType === 2) {
      filteredGroups.sort((x, y) => {
        return y.members.length - x.members.length;
      });
    } else if (groupOrderType === 3) {
      filteredGroups.sort((x, y) => {
        return y.postsNumber - x.postsNumber;
      });
    } else if (groupOrderType === 4) {
      filteredGroups.sort((a, b) => {
        let x = a.name.toUpperCase(),
          y = b.name.toUpperCase();
        return x === y ? 0 : x > y ? 1 : -1;
      });
    }
    return filteredGroups;
  };

  const handleChangeGroupsOrder = (event) => {
    setGroupsOrder(event.target.value);
  };

  const handleChangeGroupsPageNumber = (event, value) => {
    setGroupsPageNumber(value);
  };

  const handleChangeInterestingGroupsPageNumber = (event, value) => {
    setInterestingGroupsPageNumber(value);
  };

  const updateGroups = (updatedEvents) => {
    setFilteredGroups(updatedEvents);
  };

  return (
    <div className={classes.wrapper}>
      <PageHeader heading="Grupy tematyczne" type="groups" />
      {isUserLoggedIn && (
        <Paper elevation={4} className={classes.groupsTopContainer}>
          <Tabs
            value={groupTabType}
            onChange={handleChangeGroupTabType}
            className={classes.tabsContainer}
          >
            <Tab
              className={classes.tabItem}
              label="Dostępne grupy"
              id="tab-public-groups"
            />
            <Tab
              className={classes.tabItem}
              label="Propozycje grup"
              id="tab-proposal-groups"
            />
            <Tab
              className={classes.tabItem}
              label="Zaproszenia do grup"
              id="tab-group-invitations"
            />
          </Tabs>
          <Button
            variant="contained"
            color="primary"
            className={classes.addGroupBtn}
            onClick={() => setOpenGroupCreation(true)}
          >
            Utwórz nową grupę
          </Button>
          <Popup
            open={openGroupCreation}
            type="group"
            title="Utwórz grupę"
            onClose={handleCloseGroupCreation}
          >
            <GroupForm
              closePopup={handleCloseGroupCreation}
              updateGroups={updateGroups}
            />
          </Popup>
        </Paper>
      )}
      {groupTabType === 0 && (
        <Paper elevation={4} className={classes.groupSearchbarContainer}>
          <SearchItemsBox
            searchbarPlaceholder="Szukaj grupy"
            updateList={renderGroupsByName}
            itemsOrder={groupsOrder}
            handleChangeItemsOrder={handleChangeGroupsOrder}
            orderOptions={[
              'Daty założenia',
              'Ilości członków',
              'Aktywności',
              'Kolejności alfabetycznej',
            ]}
          />
        </Paper>
      )}
      <TabPanel value={groupTabType} index={0}>
        <div className={classes.groupsListContainer}>
          {groups ? (
            sortGroups(groupsOrder)
              .slice((groupsPageNumber - 1) * 6, groupsPageNumber * 6)
              .map((group) => (
                <Group
                  key={group.groupId}
                  groupId={group.groupId}
                  name={group.name}
                  interests={group.interests}
                  groupCreationDate={group.createdAt}
                  membersNumber={group.members.length}
                  members={group.members}
                  postsNumber={group.postsNumber}
                  groupImage={group.image}
                  asInformation={!isUserLoggedIn}
                />
              ))
          ) : (
            <div className={classes.loadingContainer}>
              <CircularProgress color="secondary" size="150px" />
            </div>
          )}
        </div>
        {filteredGroups.length > 6 && (
          <Paper elevation={4} className={classes.paginationContainer}>
            <Pagination
              className={classes.groupsPagination}
              count={groups && Math.ceil(groups.length / 6)}
              color="secondary"
              size="large"
              showFirstButton
              showLastButton
              page={groupsPageNumber}
              onChange={handleChangeGroupsPageNumber}
            />
          </Paper>
        )}
        {filteredGroups.length === 0 && (
          <div className={classes.noContent}>
            <Typography variant="h6" fontWeight="bold">
              Brak grup
            </Typography>
          </div>
        )}
      </TabPanel>
      <TabPanel value={groupTabType} index={1}>
        <div className={classes.groupsListContainer}>
          {interestingGroups ? (
            interestingGroups
              .slice(
                (interestingGroupsPageNumber - 1) * 6,
                interestingGroupsPageNumber * 6
              )
              .map((interestingGroup) => (
                <Group
                  key={interestingGroup.groupId}
                  groupId={interestingGroup.groupId}
                  name={interestingGroup.name}
                  interests={interestingGroup.interests}
                  groupCreationDate={interestingGroup.createdAt}
                  membersNumber={interestingGroup.members.length}
                  members={interestingGroup.members}
                  postsNumber={interestingGroup.postsNumber}
                  groupImage={interestingGroup.image}
                />
              ))
          ) : (
            <div className={classes.loadingContainer}>
              <CircularProgress color="secondary" size="150px" />
            </div>
          )}
        </div>
        {interestingGroups.length > 6 && (
          <Paper elevation={4} className={classes.paginationContainer}>
            <Pagination
              className={classes.groupsPagination}
              count={
                interestingGroups && Math.ceil(interestingGroups.length / 6)
              }
              color="secondary"
              size="large"
              showFirstButton
              showLastButton
              page={interestingGroupsPageNumber}
              onChange={handleChangeInterestingGroupsPageNumber}
            />
          </Paper>
        )}
        {interestingGroups.length === 0 && (
          <div className={classes.noContent}>
            <Typography variant="h6" fontWeight="bold">
              Brak grup o podobnej dziedzinie zainteresowań
            </Typography>
          </div>
        )}
      </TabPanel>
      <TabPanel value={groupTabType} index={2}>
        <div className={classes.groupsListContainer}>
          {groupInvitations ? (
            groupInvitations.map((groupInvitation) => (
              <Group
                key={groupInvitation.groupId}
                groupId={groupInvitation.groupId}
                name={groupInvitation.groupName}
                interests={groupInvitation.groupInterests}
                groupCreationDate={groupInvitation.groupCreatedAt}
                membersNumber={groupInvitation.groupMembers.length}
                members={groupInvitation.groupMembers}
                postsNumber={groupInvitation.groupPostsNumber}
                groupImage={groupInvitation.groupImage}
                invitation
                invitationDate={groupInvitation.invitationDate}
              />
            ))
          ) : (
            <div className={classes.loadingContainer}>
              <CircularProgress color="secondary" size="150px" />
            </div>
          )}
        </div>
        {groupInvitations.length === 0 && (
          <div className={classes.noContent}>
            <Typography variant="h6" fontWeight="bold">
              Brak zaproszeń
            </Typography>
          </div>
        )}
      </TabPanel>
    </div>
  );
};

GroupsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupsPage);
