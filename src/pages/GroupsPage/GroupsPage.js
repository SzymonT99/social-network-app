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
import {
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  Tab,
  TextField,
  Typography,
} from '@mui/material';
import TabPanelMUI from '@mui/lab/TabPanel';
import SearchIcon from '@mui/icons-material/Search';
import {
  getGroupInvitations,
  getGroups,
  getUserInterestingGroups,
} from '../../redux/actions/groupActions';
import CircularProgress from '@mui/material/CircularProgress';
import Group from '../../components/Group/Group';
import Popup from '../../components/Popup/Popup';
import GroupForm from '../../components/Forms/GroupForm';

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

  const [groupTabType, setGroupTabType] = useState('1');
  const [openGroupCreation, setOpenGroupCreation] = useState(false);
  const [searchedGroupText, setSearchedGroupText] = useState('');
  const [groupsOrder, setGroupsOrder] = useState(1);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [groupsPageNumber, setGroupsPageNumber] = useState(1);
  const [interestingGroupsPageNumber, setInterestingGroupsPageNumber] =
    useState(1);

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
      dispatch(getGroups()).then((data) => {
        setFilteredGroups(data);
      });
      dispatch(getUserInterestingGroups());
      dispatch(getGroupInvitations());
    })();
  }, []);

  const handleChangeGroupTabType = (event, newValue) => {
    setGroupTabType(newValue);
  };

  const handleCloseGroupCreation = () => {
    setOpenGroupCreation(false);
  };

  const handleChangeSearchedGroup = (group) => {
    const typedText = group.target.value;
    setSearchedGroupText(typedText);

    setFilteredGroups(
      groups.filter((group) =>
        group.name.toUpperCase().includes(typedText.toUpperCase())
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
        return y.membersNumber - x.membersNumber;
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
        {groupTabType === '1' && (
          <Paper elevation={4} className={classes.groupSearchbarContainer}>
            <TextField
              id="group-searchbar"
              placeholder="Szukaj grupy"
              className={classes.groupSearchbar}
              value={searchedGroupText}
              onChange={handleChangeSearchedGroup}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <div className={classes.groupOrderBox}>
              <Typography
                component="p"
                variant="subtitle1"
                fontWeight="bold"
                marginRight="10px"
              >
                Sortuj według:
              </Typography>
              <FormControl>
                <Select
                  className={classes.groupOrderSelect}
                  value={groupsOrder}
                  onChange={handleChangeGroupsOrder}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <MenuItem value={1}>Daty założenia</MenuItem>
                  <MenuItem value={2}>Ilości członków</MenuItem>
                  <MenuItem value={3}>Aktywności</MenuItem>
                  <MenuItem value={4}>Kolejności alfabetycznej</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Paper>
        )}
        <TabPanelMUI value="1" sx={{ padding: 0 }}>
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
                    membersNumber={group.membersNumber}
                    members={group.members}
                    postsNumber={group.postsNumber}
                    groupImage={group.image}
                  />
                ))
            ) : (
              <div className={classes.loadingContainer}>
                <CircularProgress color="secondary" />
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
        </TabPanelMUI>
        <TabPanelMUI value="2" sx={{ padding: 0 }}>
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
                    membersNumber={interestingGroup.membersNumber}
                    members={interestingGroup.members}
                    postsNumber={interestingGroup.postsNumber}
                    groupImage={interestingGroup.image}
                  />
                ))
            ) : (
              <div className={classes.loadingContainer}>
                <CircularProgress color="secondary" />
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
        </TabPanelMUI>
        <TabPanelMUI value="3" sx={{ padding: 0 }}>
          <div className={classes.groupsListContainer}>
            {groupInvitations ? (
              groupInvitations.map((groupInvitation) => (
                <Group
                  key={groupInvitation.groupId}
                  groupId={groupInvitation.groupId}
                  name={groupInvitation.groupName}
                  interests={groupInvitation.groupInterests}
                  groupCreationDate={groupInvitation.groupCreatedAt}
                  membersNumber={groupInvitation.groupMembersNumber}
                  members={groupInvitation.groupMembers}
                  postsNumber={groupInvitation.groupPostsNumber}
                  groupImage={groupInvitation.groupImage}
                  invitation
                  invitationDate={groupInvitation.invitationDate}
                />
              ))
            ) : (
              <div className={classes.loadingContainer}>
                <CircularProgress color="secondary" />
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
        </TabPanelMUI>
      </TabContext>
    </div>
  );
};

GroupsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupsPage);
