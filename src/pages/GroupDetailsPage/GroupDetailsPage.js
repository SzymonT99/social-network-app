import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './groupDetailsPage-jss';
import { PropTypes } from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import defaultImgLandscape from '../../assets/default-image-landscape.png';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  AvatarGroup,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Pagination,
  Select,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ForumIcon from '@mui/icons-material/Forum';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';
import {
  deleteGroup,
  deleteGroupInterest,
  deleteGroupMember,
  deleteGroupRule,
  getGroupDetails,
  getGroupForumThreads,
  getGroupInvitations,
  getGroups,
  getPublicGroupDetails,
  getUsersWantedJoinGroup,
  leaveGroup,
  requestToJoinGroup,
  respondToGroupInvitation,
  setGroupMemberPermission,
} from '../../redux/actions/groupActions';
import InfoIcon from '@mui/icons-material/Info';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import PhotoIcon from '@mui/icons-material/Photo';
import Popup from '../../components/Popup/Popup';
import PostForm from '../../components/Forms/PostForm';
import PersonIcon from '@mui/icons-material/Person';
import Post from '../../components/Post/Post';
import SearchIcon from '@mui/icons-material/Search';
import UserInformation from '../../components/Profile/UserInformation';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InformationItem from '../../components/Profile/ProfileInformationItem';
import GroupForm from '../../components/Forms/GroupForm';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AddInterestForm from '../../components/Forms/AddInterestForm';
import GroupRuleForm from '../../components/Forms/GroupRuleForm';
import { getAllUsersInformation } from '../../redux/actions/userActivityActions';
import SentInvitation from '../../components/SentInvitation/SentInvitation';
import ReceivedInvitation from '../../components/ReceivedInvitation/ReceivedInvitation';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import ActionConfirmation from '../../components/ActionConfirmation/ActionConfirmation';
import GroupForum from '../../components/GroupForum/GroupForum';
import { formatDateWithTime } from '../../utils/formatDateWithTime';
import ExpandListButton from '../../components/ExpandListButton/ExpandListButton';
import PostCreationBox from '../../components/PostCreationBox/PostCreationBox';

const TabPanel = (props) => {
  const { children, value, classes, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <div className={classes && classes.tabContent}>{children}</div>
      )}
    </div>
  );
};

const groupPermissions = {
  ADMINISTRATOR: 'Administrator',
  ASSISTANT: 'Zastępca',
  MODERATOR: 'Moderator',
  MEMBER: 'Członek',
};

const GroupDetailsPage = (props) => {
  const { classes } = props;

  let { groupId } = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);
  const loggedUserProfile = useSelector((state) => state.auth.userProfile);
  const isUserRemember = useSelector((state) => state.auth.remember);
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const isAppAdmin = loggedUser && loggedUser.roles.indexOf('ROLE_ADMIN') > -1;

  const group = useSelector((state) => state.groups.groupDetails);
  const threads = useSelector((state) => state.groups.groupForum.threads);
  const userGroupJoinRequests = useSelector(
    (state) => state.groups.userGroupJoinRequests
  );
  const groupInvitations = useSelector(
    (state) => state.groups.groupInvitations
  );
  const users = useSelector((state) => state.activity.users);

  const [groupNavIndex, setGroupNavIndex] = useState(0);
  const [numberPostsShown, setNumberPostsShown] = useState(5);
  const [searchedMember, setSearchedMember] = useState('');
  const [membersOrder, setMembersOrder] = useState(1);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [membersPageNumber, setMembersPageNumber] = useState(1);
  const [groupSettingsNavValue, setGroupSettingsNavValue] = useState(0);
  const [openGroupEditionPopup, setOpenGroupEditionPopup] = useState(false);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [openRuleAddFormPopup, setOpenRuleAddFormPopup] = useState(false);
  const [openEditionGroupRulePopup, setOpenEditionGroupRulePopup] =
    useState(false);
  const [searchedUserText, setSearchedUserText] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [openDeleteGroupPopup, setOpenDeleteGroupPopup] = useState(false);
  const [memberTableRows, setMemberTableRows] = useState([]);
  const [memberStatusOfUser, setMemberStatusOfUser] = useState(null);

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
      if (isUserLoggedIn) {
        dispatch(getGroupDetails(groupId)).then((data) => {
          const userMember = data.members.find(
            (member) => member.user.userId === loggedUser.userId
          );

          if (isAppAdmin) {
            setMemberStatusOfUser('ADMINISTRATOR');
          } else if (userMember) {
            setMemberStatusOfUser(userMember.groupPermissionType);
            dispatch(getGroupForumThreads(groupId));
          } else {
            setMemberStatusOfUser('NOT_MEMBER');
          }

          setFilteredMembers(
            data.members.filter(
              (member) => member.groupPermissionType === 'MEMBER'
            )
          );
          const tableRows = data.members.map((member, index) => ({
            id: member.groupMemberId,
            orderNumber: index + 1,
            firstName: member.user.firstName,
            lastName: member.user.lastName,
            joinDate: new Date(member.addedIn),
            permission: groupPermissions[member.groupPermissionType],
          }));
          setMemberTableRows(tableRows);
        });

        dispatch(getUsersWantedJoinGroup(groupId));
        dispatch(getGroupInvitations());
        dispatch(getAllUsersInformation());
      } else {
        setGroupNavIndex(1);
        dispatch(getPublicGroupDetails(groupId));
      }
    })();
  }, [groupId]);

  const handleClickDeleteGroupMember = useCallback(
    (id) => () => {
      setTimeout(() => {
        dispatch(deleteGroupMember(parseInt(groupId), id));
        setMemberTableRows((prevRows) =>
          prevRows.filter((row) => row.id !== id)
        );
      });
    },
    []
  );

  const tableColumns = useMemo(
    () => [
      { field: 'orderNumber', headerName: 'Nr.', type: 'number', width: 30 },
      {
        field: 'firstName',
        headerName: 'Imię',
        width: 130,
      },
      {
        field: 'lastName',
        headerName: 'Nazwisko',
        width: 130,
      },
      {
        field: 'joinDate',
        headerName: 'Data dołączenia',
        type: 'dateTime',
        width: 160,
      },
      {
        field: 'permission',
        headerName: 'Uprawnienie',
        width: 130,
        editable: memberStatusOfUser !== 'ASSISTANT',
        type: 'singleSelect',
        valueOptions: ['Administrator', 'Zastępca', 'Moderator', 'Członek'],
        renderHeader: () => {
          if (memberStatusOfUser !== 'ASSISTANT') {
            return (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
              >
                Uprawnienie
                <EditIcon sx={{ fontSize: '20px', marginLeft: '12px' }} />
              </div>
            );
          }
        },
      },
      {
        field: 'action',
        headerName: 'Usuń',
        width: 60,
        type: 'actions',
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Usuń"
            onClick={handleClickDeleteGroupMember(params.id)}
            disabled={
              memberStatusOfUser === 'ASSISTANT'
                ? group.members.filter(
                    (member) =>
                      (member.groupPermissionType !== 'MEMBER' ||
                        member.groupPermissionType !== 'MODERATOR') &&
                      member.groupMemberId === params.id
                  ).length !== 0
                : group.members.filter(
                    (member) =>
                      member.groupPermissionType === 'ADMINISTRATOR' &&
                      member.groupMemberId === params.id
                  ).length !== 0
            }
          />,
        ],
      },
    ],
    [group && group.members, handleClickDeleteGroupMember, memberStatusOfUser]
  );

  const handleRowEditCommit = React.useCallback((params) => {
    let permission;
    for (let type in groupPermissions) {
      if (params.value === groupPermissions[type]) {
        permission = type;
      }
    }
    dispatch(
      setGroupMemberPermission(parseInt(groupId), params.id, permission)
    );
  }, []);

  const generateGroupActionBtn = () => {
    if (
      groupInvitations.filter(
        (groupInvitation) => groupInvitation.groupId === parseInt(groupId)
      ).length !== 0
    ) {
      return (
        <Button
          variant="contained"
          className={classes.groupActionBtn}
          onClick={() => dispatch(respondToGroupInvitation(groupId, true))}
        >
          <CheckCircleOutlineIcon />
          Akceptuj zaproszenie
        </Button>
      );
    } else if (
      userGroupJoinRequests.filter(
        (requestingUser) => requestingUser.userId === loggedUser.userId
      ).length !== 0
    ) {
      return (
        <Button variant="contained" className={classes.groupActionBtn} disabled>
          Wysłano prośbę o dodanie
        </Button>
      );
    } else if (
      group.members.filter((member) => member.user.userId === loggedUser.userId)
        .length === 0 &&
      userGroupJoinRequests.filter(
        (requestingUser) => requestingUser.userId === loggedUser.userId
      ).length === 0
    ) {
      return (
        <Button
          variant="contained"
          className={classes.groupActionBtn}
          onClick={() => dispatch(requestToJoinGroup(groupId))}
        >
          <AddCircleOutlineIcon />
          Dołącz do grupy
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          className={classes.groupActionBtn}
          onClick={() => dispatch(leaveGroup(groupId))}
        >
          <HighlightOffIcon />
          Opuść grupę
        </Button>
      );
    }
  };

  const getNewMembers = () => {
    let currentDate = new Date();
    let currentDateMinusTwoWeek = currentDate.setDate(
      currentDate.getDate() - 14
    );
    const newMembers = group.members.filter(
      (member) => new Date(member.addedIn) > currentDateMinusTwoWeek
    );
    return newMembers.sort((x, y) => new Date(y.addedIn) - new Date(x.addedIn));
  };

  const handleChangeGroupNav = (event, newValue) => {
    setGroupNavIndex(newValue);
  };

  const generateGroupMemberNames = () => {
    let names = '';
    let groupMembersNumber = group.members.length;
    group.members.map((member, index) => {
      if (index < 4) {
        names += member.user.firstName + ' ' + member.user.lastName + ', ';
        groupMembersNumber--;
      }
    });

    names = names.substring(0, names.length - 2);

    if (groupMembersNumber !== 0) {
      names += ' oraz ' + groupMembersNumber;
    }

    names += ' innych użytkowników należy do grupy';

    return names;
  };

  const handleChangeSearchedMember = (event) => {
    let searchedMemberName = event.target.value;

    setSearchedMember(searchedMemberName);

    setFilteredMembers(
      group.members.filter(
        (member) =>
          (member.user.firstName + member.user.lastName)
            .toUpperCase()
            .includes(searchedMemberName.toUpperCase()) &&
          member.groupPermissionType === 'MEMBER'
      )
    );
  };

  const handleChangeMembersOrder = (event) => {
    setMembersOrder(event.target.value);
  };

  const sortMembers = (memberOrderType) => {
    if (memberOrderType === 1) {
      filteredMembers.sort((a, b) => {
        let x = a.user.firstName.toUpperCase();
        let y = b.user.firstName.toUpperCase();
        return x === y ? 0 : x > y ? 1 : -1;
      });
    } else if (memberOrderType === 2) {
      filteredMembers.sort((x, y) => new Date(y.addedIn) - new Date(x.addedIn));
    } else if (memberOrderType === 3) {
      filteredMembers.sort((a, b) => {
        let x = a.address ? a.address.city.toUpperCase() : '';
        let y = b.address ? b.address.city.toUpperCase() : '';
        return x === y ? 0 : x > y ? 1 : -1;
      });
    }
    return filteredMembers;
  };

  const handleChangeMembersPageNumber = (event, value) => {
    setMembersPageNumber(value);
  };

  const handleChangeGroupSettingsNav = (event, newValue) => {
    setGroupSettingsNavValue(newValue);
  };

  const handleCloseGroupEditionPopup = () => {
    setOpenGroupEditionPopup(false);
  };

  const handleCloseRuleAddFormPopup = () => {
    setOpenRuleAddFormPopup(false);
  };

  const handleCloseEditionGroupRulePopup = () => {
    setOpenEditionGroupRulePopup(false);
  };

  const handleClickDeleteGroupInterest = (interestId) => {
    dispatch(deleteGroupInterest(parseInt(groupId), interestId));
  };

  const handleClickEditGroupRule = (event) => {
    setOpenEditionGroupRulePopup(true);
    event.stopPropagation();
  };

  const handleClickDeleteGroupRule = (event, ruleId) => {
    dispatch(deleteGroupRule(parseInt(groupId), ruleId));
    event.stopPropagation();
  };

  const handleChangeSearchedUser = (event) => {
    const typedText = event.target.value;
    setSearchedUserText(typedText);

    if (typedText !== '') {
      setSearchedUsers(
        users.filter((user) => {
          let userName = user.firstName + ' ' + user.lastName;
          return (
            userName.toUpperCase().includes(typedText.toUpperCase()) &&
            group.members.filter((member) => member.user.userId === user.userId)
              .length === 0
          );
        })
      );
    } else {
      setSearchedUsers([]);
    }
  };

  const handleCloseGroupDeletePopup = () => {
    setOpenDeleteGroupPopup(false);
  };

  const handleDeleteGroup = () => {
    dispatch(deleteGroup(parseInt(groupId))).then(() => {
      dispatch(getGroups());
    });
    handleCloseGroupDeletePopup();
    history.push('/app/groups');
  };

  return (
    <>
      {group ? (
        <div className={classes.wrapper}>
          <Paper elevation={4} className={classes.groupHeadingContainer}>
            <Button
              variant="contained"
              className={classes.backToGroupsBtn}
              onClick={() => history.push('/app/groups')}
            >
              <ArrowBackIcon />
              Wróć do listy grup
            </Button>
            <img
              src={group.image ? group.image.url : defaultImgLandscape}
              alt="Zdjęcie grupy"
              className={classes.groupImage}
            />
            <div className={classes.groupHeadingContent}>
              <Typography
                variant="h3"
                className={classes.groupNameText}
                onClick={() => setGroupNavIndex(0)}
              >
                {group.name}
              </Typography>
              <Divider sx={{ margin: '10px 0px' }} />
              <div className={classes.groupHeadingDetails}>
                <div>
                  <Typography variant="h6" marginTop="5px">
                    {group.isPublic ? (
                      <span className={classes.alignCenterRowInfo}>
                        <PublicIcon /> Grupa publiczna
                      </span>
                    ) : (
                      <span className={classes.alignCenterRowInfo}>
                        <LockIcon /> Grupa prywatna
                      </span>
                    )}
                  </Typography>
                  <Typography
                    variant="h6"
                    marginTop="5px"
                    className={classes.alignCenterRowInfo}
                  >
                    <PeopleIcon />{' '}
                    {group.members &&
                      'Liczba członków: ' + group.members.length}
                  </Typography>
                </div>
                <div className={classes.alignCenterRowInfo}>
                  <AvatarGroup
                    max={10}
                    className={classes.memberPhotosHover}
                    onClick={() => setGroupNavIndex(2)}
                  >
                    {group.members &&
                      group.members.map((groupMember) => (
                        <Avatar
                          key={groupMember.groupMemberId}
                          alt={
                            groupMember.user.firstName +
                            ' ' +
                            groupMember.user.lastName
                          }
                          src={
                            groupMember.user.profilePhoto &&
                            groupMember.user.profilePhoto.url
                          }
                        />
                      ))}
                  </AvatarGroup>
                  {isUserLoggedIn && (
                    <>
                      {group.groupCreator.userId !== loggedUser.userId ? (
                        generateGroupActionBtn()
                      ) : (
                        <Button
                          variant="contained"
                          className={classes.groupActionBtn}
                          onClick={() => {
                            setGroupNavIndex(4);
                            setGroupSettingsNavValue(1);
                          }}
                        >
                          <AddCircleOutlineIcon />
                          Dodaj członków
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </Paper>
          {isUserLoggedIn && memberStatusOfUser !== 'NOT_MEMBER' && (
            <Paper elevation={4} className={classes.groupNavContainer}>
              <Tabs
                value={groupNavIndex}
                onChange={handleChangeGroupNav}
                className={classes.tabsContainer}
                TabIndicatorProps={{
                  style: {
                    display: 'none',
                  },
                }}
              >
                <Tab
                  className={classes.tabItem}
                  id="tab-activity"
                  label="Aktywność"
                />
                <Tab
                  className={classes.tabItem}
                  id="tab-information"
                  label="Informacje"
                />
                <Tab
                  className={classes.tabItem}
                  id="tab-members"
                  label="Członkowie"
                />
                <Tab className={classes.tabItem} id="tab-forum" label="Forum" />
                <Tab
                  className={classes.tabItem}
                  id="tab-managment"
                  label="Zarządzanie"
                  disabled={memberStatusOfUser === 'MEMBER'}
                />
              </Tabs>
            </Paper>
          )}
          <TabPanel classes={classes} value={groupNavIndex} index={0}>
            <div className={classes.leftActivityContent}>
              <Paper elevation={4} sx={{ borderRadius: '10px' }}>
                <div className={classes.groupInfoBoxHeading}>
                  <Typography variant="h6">Informacje o grupie</Typography>
                  {memberStatusOfUser !== 'NOT_MEMBER' && (
                    <Link
                      component="button"
                      variant="subtitle1"
                      onClick={() => {
                        setGroupNavIndex(1);
                      }}
                    >
                      Zobacz więcej
                    </Link>
                  )}
                </div>
                <div className={classes.groupInfoBoxContent}>
                  <Typography variant="subtitle1">
                    {group.description}
                  </Typography>
                  {group.isPublic ? (
                    <div>
                      <Typography
                        variant="subtitle1"
                        className={classes.groupBasicInfoItem}
                        sx={{ marginTop: '5px' }}
                      >
                        <PublicIcon fontSize="medium" /> Grupa puliczna
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.groupInfoDescription}
                      >
                        Każda użytkownik może sprawdzić posty grupy, a także
                        podstawowe informacje oraz członków grupy.
                      </Typography>
                    </div>
                  ) : (
                    <div>
                      <Typography
                        variant="subtitle1"
                        className={classes.groupBasicInfoItem}
                        sx={{ marginTop: '5px' }}
                      >
                        <LockIcon fontSize="medium" /> Grupa prywatna
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.groupInfoDescription}
                      >
                        Dostęp do zawartości grupy jest ograniczony
                      </Typography>
                    </div>
                  )}
                  <Typography
                    variant="subtitle1"
                    className={classes.groupBasicInfoItem}
                  >
                    <AddCircleIcon fontSize="medium" />{' '}
                    {'Data utworzenia: ' +
                      new Date(group.createdAt).getDate() +
                      ' ' +
                      new Date(group.createdAt).toLocaleString('default', {
                        month: 'long',
                      }) +
                      ' ' +
                      new Date(group.createdAt).getFullYear() +
                      'r.'}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={classes.groupBasicInfoItem}
                  >
                    <PersonIcon fontSize="medium" /> {'Założyciel: '}
                    <Tooltip title="Zobacz profil" placement="right">
                      <span
                        onClick={() =>
                          history.push(
                            '/app/profile/' + group.groupCreator.userId
                          )
                        }
                        className={classes.groupCreatorLink}
                      >
                        {group.groupCreator.firstName +
                          ' ' +
                          group.groupCreator.lastName}
                      </span>
                    </Tooltip>
                  </Typography>
                  <div>
                    <Typography
                      variant="subtitle1"
                      className={classes.groupBasicInfoItem}
                      marginTop="5px"
                    >
                      <InfoIcon fontSize="medium" /> Tematyka grupy:
                    </Typography>
                    {group.interests.map((interest) => (
                      <Typography
                        key={interest.interestId}
                        variant="body1"
                        className={classes.groupInfoDescription}
                      >
                        {'• ' + interest.name}
                      </Typography>
                    ))}
                    {group.interests.length === 0 && (
                      <Typography variant="body1" marginLeft="32px">
                        Nie określono
                      </Typography>
                    )}
                  </div>
                </div>
              </Paper>
              <Paper elevation={4} sx={{ borderRadius: '10px' }}>
                <div className={classes.groupInfoBoxHeading}>
                  <Typography variant="h6">Członkowie</Typography>
                  <Link
                    component="button"
                    variant="subtitle1"
                    onClick={() => {
                      setGroupNavIndex(2);
                    }}
                  >
                    Zobacz wszystkich
                  </Link>
                </div>
                <div className={classes.groupInfoNewMemberBoxContent}>
                  {getNewMembers().map((newMember) => (
                    <div
                      key={newMember.groupMemberId}
                      className={classes.newMemberBox}
                      style={{
                        borderBottom:
                          getNewMembers().length > 1 &&
                          '1px solid rgba(0, 0, 0, 0.22)',
                      }}
                    >
                      <Avatar
                        src={
                          newMember.user.profilePhoto
                            ? newMember.user.profilePhoto.url
                            : defaultUserPhoto
                        }
                        alt={
                          newMember.user
                            ? newMember.user.firstName +
                              ' ' +
                              newMember.user.lastName
                            : 'Zalogowany użytkownik'
                        }
                        className={classes.userPhotoSmall}
                        onClick={() =>
                          history.push('/app/profile/' + newMember.user.userId)
                        }
                      />
                      <Typography variant="subtitle2" marginLeft="20px">
                        <span
                          className={classes.newMemberName}
                          onClick={() =>
                            history.push(
                              '/app/profile/' + newMember.user.userId
                            )
                          }
                        >
                          {newMember.user.firstName +
                            ' ' +
                            newMember.user.lastName}
                        </span>
                        <span className={classes.newMemberAddedDate}>
                          {'dołączył(a) do grupy: ' +
                            formatDateWithTime(newMember.addedIn)}
                        </span>
                      </Typography>
                    </div>
                  ))}
                  {getNewMembers().length === 0 && (
                    <Typography marginTop="10px" variant="subtitle2">
                      Brak nowych członków
                    </Typography>
                  )}
                </div>
              </Paper>
            </div>
            <div className={classes.rightActivityContent}>
              {memberStatusOfUser !== 'NOT_MEMBER' && (
                <PostCreationBox
                  profilePhoto={loggedUserProfile.profilePhoto}
                  userNameAndSurname={
                    loggedUserProfile.firstName +
                    ' ' +
                    loggedUserProfile.lastName
                  }
                  groupId={parseInt(groupId)}
                />
              )}
              {group.posts.map((post, index) => {
                if (index < numberPostsShown) {
                  return (
                    <Post
                      key={post.postId}
                      isGroupPost
                      groupId={parseInt(groupId)}
                      postId={post.postId}
                      authorId={post.postAuthor.userId}
                      authorName={
                        post.postAuthor.firstName +
                        ' ' +
                        post.postAuthor.lastName
                      }
                      profilePhoto={post.postAuthor.profilePhoto}
                      createdDate={new Date(post.createdAt)}
                      images={post.images}
                      likesNumber={post.likes.length}
                      sharesNumber={post.sharing.length}
                      commentsNumber={post.comments.length}
                      comments={post.comments}
                      content={post.text}
                      userStatus={post.postAuthor.activityStatus}
                      likes={post.likes}
                      isEdited={post.isEdited}
                      isPublic={post.isPublic}
                      isCommentingBlocked={
                        memberStatusOfUser === 'NOT_MEMBER' ||
                        memberStatusOfUser === null
                          ? true
                          : post.isCommentingBlocked
                      }
                      editionDate={post.editedAt}
                      accessToManagement={
                        memberStatusOfUser !== 'MEMBER' &&
                        memberStatusOfUser !== 'NOT_MEMBER'
                      }
                    />
                  );
                }
              })}
              {numberPostsShown < group.posts.length && (
                <ExpandListButton
                  fetchMore={() => setNumberPostsShown(numberPostsShown + 5)}
                />
              )}
              {group.posts.length === 0 && (
                <div className={classes.noContent}>
                  <Typography variant="h6" fontWeight="bold">
                    Brak postów
                  </Typography>
                </div>
              )}
            </div>
          </TabPanel>
          <TabPanel classes={classes} value={groupNavIndex} index={1}>
            <Paper elevation={4} className={classes.informationSectionElement}>
              <div className={classes.groupInfoBoxHeading}>
                <Typography variant="h6">Informacje o grupie</Typography>
              </div>
              <div className={classes.groupInfoBoxContent}>
                <Typography variant="subtitle1">{group.description}</Typography>
                {group.isPublic ? (
                  <div>
                    <Typography
                      variant="subtitle1"
                      className={classes.groupBasicInfoItem}
                      sx={{ marginTop: '5px' }}
                    >
                      <PublicIcon fontSize="medium" /> Grupa publiczna
                    </Typography>
                    <Typography
                      variant="body1"
                      className={classes.groupInfoDescription}
                    >
                      Każda użytkownik może sprawdzić posty grupy, a także
                      podstawowe informacje oraz członków grupy.
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography
                      variant="subtitle1"
                      className={classes.groupBasicInfoItem}
                      sx={{ marginTop: '5px' }}
                    >
                      <LockIcon fontSize="medium" /> Grupa prywatna
                    </Typography>
                    <Typography
                      variant="body1"
                      className={classes.groupInfoDescription}
                    >
                      Dostęp do zawartości grupy jest ograniczony
                    </Typography>
                  </div>
                )}
                <Typography
                  variant="subtitle1"
                  className={classes.groupBasicInfoItem}
                >
                  <AddCircleIcon fontSize="medium" />{' '}
                  {'Data utworzenia: ' +
                    new Date(group.createdAt).getDate() +
                    ' ' +
                    new Date(group.createdAt).toLocaleString('default', {
                      month: 'long',
                    }) +
                    ' ' +
                    new Date(group.createdAt).getFullYear() +
                    'r.'}
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.groupBasicInfoItem}
                >
                  <PersonIcon fontSize="medium" /> {'Założyciel: '}
                  <Tooltip title="Zobacz profil" placement="right">
                    <span
                      onClick={() =>
                        history.push(
                          '/app/profile/' + group.groupCreator.userId
                        )
                      }
                      className={classes.groupCreatorLink}
                    >
                      {group.groupCreator.firstName +
                        ' ' +
                        group.groupCreator.lastName}
                    </span>
                  </Tooltip>
                </Typography>
                <div>
                  <Typography
                    variant="subtitle1"
                    className={classes.groupBasicInfoItem}
                    sx={{ marginTop: '5px' }}
                  >
                    <InfoIcon fontSize="medium" /> Tematyka grupy:
                  </Typography>
                  {group.interests.map((interest) => (
                    <Typography
                      key={interest.interestId}
                      variant="body1"
                      className={classes.groupInfoDescription}
                    >
                      {'• ' + interest.name}
                    </Typography>
                  ))}
                  {group.interests.length === 0 && (
                    <Typography variant="body1" marginLeft="32px">
                      Nie określono
                    </Typography>
                  )}
                </div>
              </div>
            </Paper>
            <Paper elevation={4} className={classes.informationSectionElement}>
              <div className={classes.groupInfoBoxHeading}>
                <Typography variant="h6">Członkowie grupy</Typography>
                <Link
                  component="button"
                  variant="subtitle1"
                  onClick={() => {
                    setGroupNavIndex(2);
                  }}
                >
                  Zobacz wszystkich
                </Link>
              </div>
              <div className={classes.groupInfoContainer}>
                <AvatarGroup
                  max={6}
                  className={classes.memberPhotoGroup}
                  onClick={() => setGroupNavIndex(2)}
                >
                  {group.members &&
                    group.members.map((groupMember) => (
                      <Avatar
                        key={groupMember.groupMemberId}
                        alt={
                          groupMember.user.firstName +
                          ' ' +
                          groupMember.user.lastName
                        }
                        src={
                          groupMember.user.profilePhoto &&
                          groupMember.user.profilePhoto.url
                        }
                      />
                    ))}
                </AvatarGroup>
                <Typography variant="subtitle2">
                  {generateGroupMemberNames()}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  className={classes.groupBasicInfoItem}
                >
                  <GroupsIcon fontSize="medium" /> Podział na uprawnienia:
                </Typography>
                <Typography variant="subtitle2" marginLeft="30px">
                  {'Administratorzy: ' +
                    group.members.filter(
                      (member) => member.groupPermissionType === 'ADMINISTRATOR'
                    ).length}
                </Typography>
                <Typography variant="subtitle2" marginLeft="30px">
                  {'Zastępcy: ' +
                    group.members.filter(
                      (member) => member.groupPermissionType === 'ASSISTANT'
                    ).length}
                </Typography>
                <Typography variant="subtitle2" marginLeft="30px">
                  {'Moderatorzy: ' +
                    group.members.filter(
                      (member) => member.groupPermissionType === 'MODERATOR'
                    ).length}
                </Typography>
                <Typography variant="subtitle2" marginLeft="30px">
                  {'Członkowie: ' +
                    group.members.filter(
                      (member) => member.groupPermissionType === 'MEMBER'
                    ).length}
                </Typography>
              </div>
            </Paper>
            <Paper elevation={4} className={classes.informationSectionElement}>
              <div className={classes.groupInfoBoxHeading}>
                <Typography variant="h6">Aktywność grupy</Typography>
              </div>
              <div className={classes.groupInfoContainer}>
                <Typography
                  variant="subtitle1"
                  className={classes.groupBasicInfoItem}
                >
                  <GroupsIcon fontSize="medium" />
                  {group.members.length +
                    (group.members.length === 1
                      ? ' członek grupy'
                      : ' członków grupy')}
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.groupBasicInfoItem}
                >
                  <MessageIcon fontSize="medium" />
                  {group.posts.length +
                    (group.posts.length === 1
                      ? ' utworzony post na grupie'
                      : ' utworzonych postów na grupie')}
                </Typography>
                {threads && (
                  <Typography
                    variant="subtitle1"
                    className={classes.groupBasicInfoItem}
                  >
                    <ForumIcon fontSize="medium" />
                    {threads.length +
                      (threads.length === 1
                        ? ' utworzony wątek na forum'
                        : ' utworzonych wątków na forum')}
                  </Typography>
                )}
              </div>
            </Paper>
            <Paper elevation={4} className={classes.informationSectionElement}>
              <div className={classes.groupInfoBoxHeading}>
                <Typography variant="h6">Regulamin grupy</Typography>
              </div>
              <div className={classes.groupInfoContainer}>
                {group.rules.map((rule, index) => (
                  <Accordion key={rule.ruleId}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      id={'accordion-header-' + index}
                      className={classes.ruleItemHeading}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {index + 1 + '. ' + rule.name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="subtitle2">
                        {rule.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
                {group.rules.length === 0 && (
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    Nie ustalono regulaminu
                  </Typography>
                )}
              </div>
            </Paper>
          </TabPanel>
          <TabPanel classes={classes} value={groupNavIndex} index={2}>
            <Paper elevation={4} className={classes.memberSectionContainer}>
              <div>
                <Typography variant="h4" className={classes.memberSectionTitle}>
                  Zarząd grupy
                  <span className={classes.membersNumber}>
                    {
                      group.members.filter(
                        (member) => member.groupPermissionType !== 'MEMBER'
                      ).length
                    }
                  </span>
                </Typography>
                <Divider />
              </div>
              <Typography variant="h6" fontWeight="bold" marginTop="15px">
                Administratorzy
              </Typography>
              <div className={classes.memberItemsContainer}>
                {group.members
                  .filter(
                    (member) => member.groupPermissionType === 'ADMINISTRATOR'
                  )
                  .map((groupMember) => (
                    <UserInformation
                      key={groupMember.groupMemberId}
                      name={
                        groupMember.user.firstName +
                        ' ' +
                        groupMember.user.lastName
                      }
                      city={groupMember.address && groupMember.address.city}
                      userId={groupMember.user.userId}
                      profilePhoto={groupMember.user.profilePhoto}
                      groupAddedIn={groupMember.addedIn}
                    />
                  ))}
              </div>
              <Typography variant="h6" fontWeight="bold" marginTop="10px">
                Zastępcy
              </Typography>
              <div className={classes.memberItemsContainer}>
                {group.members
                  .filter(
                    (member) => member.groupPermissionType === 'ASSISTANT'
                  )
                  .map((groupMember) => (
                    <UserInformation
                      key={groupMember.groupMemberId}
                      name={
                        groupMember.user.firstName +
                        ' ' +
                        groupMember.user.lastName
                      }
                      city={groupMember.address && groupMember.address.city}
                      userId={groupMember.user.userId}
                      profilePhoto={groupMember.user.profilePhoto}
                      groupAddedIn={groupMember.addedIn}
                    />
                  ))}
                {group.members.filter(
                  (member) => member.groupPermissionType === 'ASSISTANT'
                ).length === 0 && (
                  <Typography textAlign="center" variant="subtitle2">
                    Nie wybrano
                  </Typography>
                )}
              </div>
              <Typography variant="h6" fontWeight="bold" marginTop="10px">
                Moderatorzy
              </Typography>
              <div className={classes.memberItemsContainer}>
                {group.members
                  .filter(
                    (member) => member.groupPermissionType === 'MODERATOR'
                  )
                  .map((groupMember) => (
                    <UserInformation
                      key={groupMember.groupMemberId}
                      name={
                        groupMember.user.firstName +
                        ' ' +
                        groupMember.user.lastName
                      }
                      city={groupMember.address && groupMember.address.city}
                      userId={groupMember.user.userId}
                      profilePhoto={groupMember.user.profilePhoto}
                      groupAddedIn={groupMember.addedIn}
                    />
                  ))}
                {group.members.filter(
                  (member) => member.groupPermissionType === 'MODERATOR'
                ).length === 0 && (
                  <Typography textAlign="center" variant="subtitle2">
                    Nie wybrano
                  </Typography>
                )}
              </div>
            </Paper>
            <Paper elevation={4} className={classes.memberSectionContainer}>
              <div>
                <Typography variant="h4" className={classes.memberSectionTitle}>
                  Pozostali członkowie
                  <span className={classes.membersNumber}>
                    {
                      group.members.filter(
                        (member) => member.groupPermissionType === 'MEMBER'
                      ).length
                    }
                  </span>
                </Typography>
                <Divider />
                <div className={classes.membersActionContainer}>
                  <TextField
                    id="member-searchbar"
                    placeholder="Wyszukaj członka"
                    className={classes.memberSearchbar}
                    value={searchedMember}
                    onChange={handleChangeSearchedMember}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div className={classes.membersOrderBox}>
                    <Typography
                      component="p"
                      variant="subtitle1"
                      fontWeight="bold"
                      marginRight="10px"
                    >
                      Sortuj według:
                    </Typography>
                    <FormControl sx={{ margin: 0 }}>
                      <Select
                        className={classes.memberOrderSelect}
                        value={membersOrder}
                        onChange={handleChangeMembersOrder}
                        MenuProps={{ disableScrollLock: true }}
                      >
                        <MenuItem value={1}>Kolejności alfabetycznej</MenuItem>
                        <MenuItem value={2}>Daty dołączenia</MenuItem>
                        <MenuItem value={3}>Miejsca zamieszkania</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <Divider />
              </div>
              <div
                className={classes.memberItemsContainer}
                style={{ marginTop: '10px' }}
              >
                {sortMembers(membersOrder)
                  .slice((membersPageNumber - 1) * 6, membersPageNumber * 6)
                  .map((groupMember) => (
                    <UserInformation
                      key={groupMember.groupMemberId}
                      name={
                        groupMember.user.firstName +
                        ' ' +
                        groupMember.user.lastName
                      }
                      city={groupMember.address && groupMember.address.city}
                      userId={groupMember.user.userId}
                      profilePhoto={groupMember.user.profilePhoto}
                      groupAddedIn={groupMember.addedIn}
                    />
                  ))}
                {group.members.filter(
                  (member) => member.groupPermissionType === 'MEMBER'
                ).length === 0 && (
                  <Typography variant="h6" className={classes.noGroupMembers}>
                    Brak innych członków
                  </Typography>
                )}
              </div>
              {group.members.filter(
                (member) => member.groupPermissionType === 'MEMBER'
              ).length > 6 && (
                <Pagination
                  className={classes.membersPagination}
                  count={Math.ceil(
                    group.members.filter(
                      (member) => member.groupPermissionType === 'MEMBER'
                    ).length / 6
                  )}
                  color="secondary"
                  size="medium"
                  showFirstButton
                  showLastButton
                  page={membersPageNumber}
                  onChange={handleChangeMembersPageNumber}
                />
              )}
            </Paper>
          </TabPanel>
          <TabPanel classes={classes} value={groupNavIndex} index={3}>
            <GroupForum
              groupId={parseInt(groupId)}
              memberStatusOfUser={memberStatusOfUser}
            />
          </TabPanel>
          <TabPanel classes={classes} value={groupNavIndex} index={4}>
            <Paper elevation={4} className={classes.settingsContainer}>
              <div className={classes.groupSettingsNav}>
                <Tabs
                  value={groupSettingsNavValue}
                  onChange={handleChangeGroupSettingsNav}
                  className={classes.settingsTabList}
                  TabIndicatorProps={{
                    style: {
                      display: 'none',
                    },
                  }}
                >
                  <Tab label="Ustawienia grupy" icon={<SettingsIcon />} />
                  <Tab
                    label="Dodawanie członków"
                    icon={<AddCircleIcon />}
                    disabled={memberStatusOfUser === 'MODERATOR'}
                  />
                  <Tab
                    label="Prośby o dołączenie"
                    icon={<EmailIcon />}
                    disabled={memberStatusOfUser === 'MODERATOR'}
                  />
                  <Tab
                    label="Zarządzanie członkami"
                    icon={<PeopleIcon />}
                    disabled={memberStatusOfUser === 'MODERATOR'}
                  />
                  <Tab
                    label="Usuwanie grupy"
                    icon={<DeleteIcon />}
                    disabled={
                      memberStatusOfUser === 'ASSISTANT' ||
                      memberStatusOfUser === 'MODERATOR'
                    }
                  />
                </Tabs>
              </div>
              <div className={classes.settingsContent}>
                <TabPanel value={groupSettingsNavValue} index={0}>
                  <div className={classes.settingsInformationHeadingWithAction}>
                    <Typography variant="h5">Informacje o grupie</Typography>
                    {memberStatusOfUser !== 'MODERATOR' && (
                      <Tooltip title="Edytuj informacje" placement="left">
                        <IconButton
                          className={classes.editGroupInformationBtn}
                          onClick={() => setOpenGroupEditionPopup(true)}
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Popup
                      open={openGroupEditionPopup}
                      type="groups"
                      title="Zaaktualizuj grupę"
                      onClose={handleCloseGroupEditionPopup}
                    >
                      <GroupForm
                        closePopup={handleCloseGroupEditionPopup}
                        edition
                        groupId={group.groupId}
                        groupName={group.name}
                        groupDescription={group.description}
                        groupImage={group.image}
                        groupAccess={group.isPublic}
                        groupInterests={group.interests}
                      />
                    </Popup>
                  </div>
                  <InformationItem title="Nazwa grupy" content={group.name} />
                  <InformationItem
                    title="Opis grupy"
                    content={group.description}
                  />
                  <Typography
                    variant="h5"
                    marginTop="15px"
                    className={classes.settingsInformationHeading}
                  >
                    Tematyka grupy
                  </Typography>
                  {group.interests.length > 0 && (
                    <List className={classes.interestList}>
                      {group.interests
                        .sort((x, y) => {
                          let a = x.name.toUpperCase(),
                            b = y.name.toUpperCase();
                          return a === b ? 0 : a > b ? 1 : -1;
                        })
                        .map((groupInterest) => (
                          <ListItem
                            key={groupInterest.interestId}
                            disableGutters
                            secondaryAction={
                              <IconButton
                                onClick={() =>
                                  handleClickDeleteGroupInterest(
                                    groupInterest.interestId
                                  )
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <FiberManualRecordIcon
                              color="secondary"
                              fontSize="14px"
                            />
                            <ListItemText
                              disableTypography
                              primary={
                                <Typography noWrap variant="subtitle2">
                                  {groupInterest.name}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ))}
                    </List>
                  )}
                  <Button
                    color="secondary"
                    variant="text"
                    className={classes.addGroupInfoItemBtn}
                    onClick={() => setShowInterestForm(!showInterestForm)}
                  >
                    <AddCircleOutlineIcon />
                    <Typography variant="subtitle1" marginLeft="10px">
                      Dodaj zainteresowanie
                    </Typography>
                  </Button>
                  {showInterestForm && (
                    <AddInterestForm
                      forGroup
                      groupId={group.groupId}
                      currentInterests={group.interests}
                      onCloseForm={() => setShowInterestForm(false)}
                    />
                  )}
                  <Typography
                    variant="h5"
                    marginTop="10px"
                    className={classes.settingsInformationHeadingWithAction}
                  >
                    Regulamin grupy
                  </Typography>
                  <div className={classes.rulesContainer}>
                    {group.rules.map((rule, index) => (
                      <Accordion key={rule.ruleId}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          id={'accordion-header-' + index}
                          className={classes.ruleItemHeading}
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            {index + 1 + '. ' + rule.name}
                          </Typography>
                          {memberStatusOfUser !== 'MODERATOR' && (
                            <div>
                              <IconButton
                                onClick={(event) =>
                                  handleClickEditGroupRule(event)
                                }
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={(event) =>
                                  handleClickDeleteGroupRule(event, rule.ruleId)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          )}
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="subtitle2">
                            {rule.description}
                          </Typography>
                        </AccordionDetails>
                        <Popup
                          open={openEditionGroupRulePopup}
                          type="groupRule"
                          title="Edytuj zasadę w grupie"
                          onClose={handleCloseEditionGroupRulePopup}
                        >
                          <GroupRuleForm
                            closePopup={handleCloseEditionGroupRulePopup}
                            edition
                            groupId={parseInt(groupId)}
                            ruleId={rule.ruleId}
                            ruleName={rule.name}
                            ruleDescription={rule.description}
                          />
                        </Popup>
                      </Accordion>
                    ))}
                    {group.rules.length === 0 && (
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        textAlign="center"
                      >
                        Nie ustalono regulaminu
                      </Typography>
                    )}
                  </div>
                  {memberStatusOfUser !== 'MODERATOR' && (
                    <Button
                      color="secondary"
                      variant="text"
                      className={classes.addGroupInfoItemBtn}
                      onClick={() => setOpenRuleAddFormPopup(true)}
                    >
                      <AddCircleOutlineIcon />
                      <Typography variant="subtitle1" marginLeft="10px">
                        Dodaj zasadę
                      </Typography>
                    </Button>
                  )}
                  <Popup
                    open={openRuleAddFormPopup}
                    type="groupRule"
                    title="Dodaj nową zasadę w grupie"
                    onClose={handleCloseRuleAddFormPopup}
                  >
                    <GroupRuleForm
                      closePopup={handleCloseRuleAddFormPopup}
                      groupId={parseInt(groupId)}
                    />
                  </Popup>
                </TabPanel>
                <TabPanel value={groupSettingsNavValue} index={1}>
                  <Typography
                    variant="h5"
                    className={classes.settingsInformationHeading}
                  >
                    Zapraszanie nowych członków
                  </Typography>
                  <TextField
                    id="user-searchbar"
                    fullWidth
                    sx={{ marginTop: '10px' }}
                    placeholder="Szukaj osób"
                    value={searchedUserText}
                    onChange={handleChangeSearchedUser}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div className={classes.groupInvitationsContainer}>
                    {searchedUsers.map((searchedUser) => (
                      <SentInvitation
                        key={searchedUser.userId}
                        groupInvitation
                        groupId={parseInt(groupId)}
                        userId={searchedUser.userId}
                        name={
                          searchedUser.firstName + ' ' + searchedUser.lastName
                        }
                        avatar={searchedUser.profilePhoto}
                      />
                    ))}
                  </div>
                </TabPanel>
                <TabPanel value={groupSettingsNavValue} index={2}>
                  <Typography
                    variant="h5"
                    className={classes.settingsInformationHeading}
                  >
                    Decydowanie o prośbach dołączenia
                  </Typography>
                  <div className={classes.groupInvitationsContainer}>
                    {userGroupJoinRequests.map((request) => (
                      <ReceivedInvitation
                        key={request.userId}
                        groupInvitation
                        groupId={parseInt(groupId)}
                        inviterId={request.userId}
                        inviterName={request.firstName + ' ' + request.lastName}
                        inviterPhoto={request.profilePhoto}
                      />
                    ))}
                    {userGroupJoinRequests.length === 0 && (
                      <Typography marginTop="10px" variant="subtitle2">
                        Brak próśb o dołączenie
                      </Typography>
                    )}
                  </div>
                </TabPanel>
                <TabPanel value={groupSettingsNavValue} index={3}>
                  <Typography
                    variant="h5"
                    className={classes.settingsInformationHeading}
                  >
                    Zarządzanie członkami grupy
                  </Typography>
                  <div style={{ height: 400, width: '100%' }}>
                    {
                      <DataGrid
                        columns={tableColumns}
                        rows={memberTableRows}
                        rowsPerPageOptions={[10, 15, 20]}
                        pagination
                        disableSelectionOnClick
                        onCellEditCommit={handleRowEditCommit}
                      />
                    }
                  </div>
                </TabPanel>
                <TabPanel value={groupSettingsNavValue} index={4}>
                  <Typography
                    variant="h5"
                    className={classes.settingsInformationHeading}
                  >
                    Usuwanie grupy
                  </Typography>
                  <div className={classes.deleteGroupContainer}>
                    <Typography variant="subtitle1">
                      Usunięcie grupy spowoduje utratę całej zawartości w tym
                      utworzonych postów, wątków oraz komentarzy, a także usunie
                      wszystkich jej członków.
                    </Typography>
                    <Button
                      color="secondary"
                      variant="contained"
                      className={classes.deleteGroupBtn}
                      onClick={() => setOpenDeleteGroupPopup(true)}
                    >
                      Usuń grupę
                    </Button>
                  </div>
                  <Popup
                    open={openDeleteGroupPopup}
                    type="confirmation"
                    title="Usuwanie grupy"
                    onClose={handleCloseGroupDeletePopup}
                  >
                    <ActionConfirmation
                      title="Czy napewno chcesz usunąć grupę?"
                      confirmationAction={handleDeleteGroup}
                      rejectionAction={handleCloseGroupDeletePopup}
                    />
                  </Popup>
                </TabPanel>
              </div>
            </Paper>
          </TabPanel>
        </div>
      ) : (
        <div className={classes.loadingContainer}>
          <CircularProgress color="secondary" size="240px" />
        </div>
      )}
    </>
  );
};

GroupDetailsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupDetailsPage);
