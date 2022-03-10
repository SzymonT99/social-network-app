import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './profilePage-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Input,
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
} from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import { PhotoCamera, Work } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import TabPanelMUI from '@mui/lab/TabPanel';
import PhotoIcon from '@mui/icons-material/Photo';
import Popup from '../../components/Popup/Popup';
import PostForm from '../../components/Forms/PostForm';
import {
  changeProfileNav,
  changeProfilePhoto,
  deleteProfilePhoto,
  deleteUserInterests,
  getUserActivity,
  getUserFavouriteItems,
  getUserImages,
  getUserInterests,
  getUserProfile,
} from '../../redux/actions/userProfileActions';
import Post from '../../components/Post/Post';
import CircularProgress from '@mui/material/CircularProgress';
import SharedPost from '../../components/SharedPost/SharedPost';
import ProfileInformationItem from '../../components/Profile/ProfileInformationItem';
import SchoolInfoItem from '../../components/Profile/SchoolInfoItem';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddSchoolForm from '../../components/Forms/AddSchoolForm';
import { useHistory } from 'react-router-dom';
import WorkPlaceInfoItem from '../../components/Profile/WorkPlaceInfoItem';
import AddWorkPlaceForm from '../../components/Forms/AddWorkPlaceForm';
import EditIcon from '@mui/icons-material/Edit';
import AddUserFavouriteForm from '../../components/Forms/AddUserFavouriteForm';
import UserFavouriteItemList from '../../components/Profile/UserFavouriteItemList';
import AddUserInterestForm from '../../components/Forms/AddUserInterestForm';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ProfileEditionForm from '../../components/Forms/ProfileEditionForm';
import AddressForm from '../../components/Forms/AddressForm';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonIcon from '@mui/icons-material/Person';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import {
  deleteFriend,
  getReceivedFriendInvitations,
  getUserFriends,
  inviteToFriend,
  respondToFriendInvitation,
} from '../../redux/actions/friendAction';
import { setLoading } from '../../redux/actions/userActivityActions';
import FriendInformation from '../../components/Profile/FriendInformation';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CakeIcon from '@mui/icons-material/Cake';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';

const TabPanel = (props) => {
  const { children, value, classes, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <div className={classes.tabContent}>{children}</div>}
    </div>
  );
};

const relationshipStatusTypes = {
  SINGLE: 'Bez związku',
  IN_RELATIONSHIP: 'W związku',
  ENGAGED: 'Zaręczony(a)',
  MARRIED: 'W związku małżeńskim',
};

const ProfilePage = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();

  const profileNavIndex = useSelector(
    (state) => state.selectedProfile.selectedProfileNavIndex
  );
  const loggedUser = useSelector((state) => state.auth.user);
  const isLoggedUserRemember = useSelector((state) => state.auth.remember);
  const userProfile = useSelector((state) => state.selectedProfile.userProfile);
  const userActivity = useSelector(
    (state) => state.selectedProfile.userActivity
  );
  const userFavourites = useSelector(
    (state) => state.selectedProfile.userFavourites
  );
  const userInterests = useSelector(
    (state) => state.selectedProfile.userInterests
  );
  const userImages = useSelector((state) => state.selectedProfile.images);
  const userFriends = useSelector((state) => state.selectedProfile.friends);
  const userFriendInvitations = useSelector(
    (state) => state.selectedProfile.friendInvitations
  );
  const loggedUserFriendInvitations = useSelector(
    (state) => state.friends.receivedFriendInvitations
  );
  const isLoading = useSelector((state) => state.activity.isLoading);

  const history = useHistory();

  let { selectedUserId } = useParams();

  const [activityValue, setActivityValue] = useState('a1');
  const [profileInfoNav, setProfileInfoNav] = useState('i1');
  const [openPostCreation, setOpenPostCreation] = useState(false);
  const [numberItemsShown, setNumberItemsShown] = useState({
    posts: 5,
    sharedPosts: 5,
    likePosts: 5,
    comments: 5,
  });
  const [openAddSchoolPopup, setOpenAddSchoolPopup] = useState(false);
  const [openAddWorkPopup, setOpenAddWorkPopup] = useState(false);
  const [showFavouriteForm, setShowFavouriteForm] = useState(false);
  const [imagesPageNumber, setImagesPageNumber] = useState(1);
  const [openProfileEdition, setOpenProfileEdition] = useState(false);
  const [openAddAddressFormPopup, setOpenAddAddressFormPopup] = useState(false);
  const [openEditAddressFormPopup, setOpenEditAddressFormPopup] =
    useState(false);
  const [isUserFriend, setIsUserFriend] = useState(false);
  const [isInvitedToFriend, setIsInvitedToFriend] = useState(false);
  const [friendBtnHover, setFriendBtnHover] = useState(false);
  const [searchedFriend, setSearchedFriend] = useState('');
  const [friendsOrder, setFriendsOrder] = useState(1);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [friendsPageNumber, setFriendsPageNumber] = useState(1);

  useEffect(() => {
    (async () => {
      if (
        isLoggedUserRemember &&
        new Date() > new Date(loggedUser.accessTokenExpirationDate)
      ) {
        dispatch(setTokenRefreshing(true));
        await dispatch(refreshUserToken(loggedUser.refreshToken)).then(() => {
          dispatch(setTokenRefreshing(false));
        });
      }
      dispatch(setLoading(true));
      dispatch(getUserProfile(selectedUserId));
      dispatch(getUserActivity(selectedUserId));
      dispatch(getUserFavouriteItems(selectedUserId));
      dispatch(getUserInterests(selectedUserId));
      dispatch(getUserImages(selectedUserId));

      dispatch(getUserFriends(selectedUserId)).then((friends) => {
        setFilteredFriends(friends);
        if (
          loggedUser.userId !== parseInt(selectedUserId) &&
          friends.filter(
            (friend) =>
              friend.user.userId === loggedUser.userId &&
              friend.isInvitationAccepted === true
          ).length > 0
        ) {
          setIsUserFriend(true);
        } else if (loggedUser.userId === parseInt(selectedUserId)) {
          setIsUserFriend(null);
        } else {
          setIsUserFriend(false);
        }
      });

      dispatch(getReceivedFriendInvitations(selectedUserId)).then(
        (friendInvitations) => {
          dispatch(setLoading(false));
          if (
            loggedUser.userId !== parseInt(selectedUserId) &&
            friendInvitations.filter(
              (friend) => friend.invitingUser.userId === loggedUser.userId
            ).length > 0
          ) {
            setIsInvitedToFriend(true);
          } else if (loggedUser.userId === parseInt(selectedUserId)) {
            setIsInvitedToFriend(null);
          } else {
            setIsInvitedToFriend(false);
          }
        }
      );
    })();

    return () => {
      dispatch(changeProfileNav(0));
    };
  }, [selectedUserId]);

  const handleCloseAddSchoolPopup = () => {
    setOpenAddSchoolPopup(false);
  };

  const handleCloseAddWorkPopup = () => {
    setOpenAddWorkPopup(false);
  };

  const handleChangeProfileNav = (event, newValue) => {
    dispatch(changeProfileNav(newValue));
  };

  const handleChangeActivityValue = (event, newValue) => {
    setActivityValue(newValue);
  };

  const handleChangeProfileInfoNav = (event, newValue) => {
    setProfileInfoNav(newValue);
  };

  const handleClosePostCreation = () => {
    setOpenPostCreation(false);
  };

  const updateShownItems = (type) => {
    setNumberItemsShown((prevState) => ({
      ...prevState,
      [type]: numberItemsShown[type] + 5,
    }));
  };

  const handleClickDeleteUserInterest = (interestId) => {
    dispatch(deleteUserInterests(interestId));
  };

  const handleClickChangeProfilePhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      const form = new FormData();
      form.append('photo', file);
      dispatch(changeProfilePhoto(loggedUser.userId, form));
    }
  };

  const handleClickDeleteProfilePhoto = () => {
    dispatch(deleteProfilePhoto(loggedUser.userId));
  };

  const handleChangeImagesPageNumber = (event, value) => {
    setImagesPageNumber(value);
  };

  const handleCloseProfileEditionForm = () => {
    setOpenProfileEdition(false);
  };

  const handleCloseAddAddressFormPopup = () => {
    setOpenAddAddressFormPopup(false);
  };

  const handleCloseEditAddressFormPopup = () => {
    setOpenEditAddressFormPopup(false);
  };

  const handleManageFriend = () => {
    if (
      loggedUserFriendInvitations.filter(
        (invitation) =>
          invitation.invitingUser.userId === parseInt(selectedUserId)
      ).length > 0
    ) {
      dispatch(respondToFriendInvitation(parseInt(selectedUserId), 'accept'));
      setIsUserFriend(true);
      setIsInvitedToFriend(false);
    } else if (!isUserFriend && !isInvitedToFriend) {
      dispatch(inviteToFriend(selectedUserId));
      setIsInvitedToFriend(true);
    } else if (!isUserFriend && isInvitedToFriend) {
      const invitedFriend = userFriendInvitations.find(
        (friend) => friend.invitingUser.userId === loggedUser.userId
      );
      dispatch(deleteFriend(invitedFriend.friendId, true));
      setIsInvitedToFriend(false);
    } else if (isUserFriend && !isInvitedToFriend) {
      const friend = userFriends.find(
        (friend) => friend.user.userId === loggedUser.userId
      );
      dispatch(deleteFriend(friend.friendId));
      setIsUserFriend(false);
      setIsInvitedToFriend(false);
    }
  };

  const generateFriendBtn = () => {
    if (
      loggedUserFriendInvitations.filter(
        (invitation) =>
          invitation.invitingUser.userId === parseInt(selectedUserId)
      ).length > 0
    ) {
      return (
        <Typography
          variant="subtitle1"
          className={classes.friendManageBtnContent}
        >
          <CheckCircleOutlineIcon sx={{ marginRight: '7px' }} /> Akceptuj
          zaproszenie
        </Typography>
      );
    } else if (!isUserFriend && !isInvitedToFriend) {
      return (
        <Typography
          variant="subtitle1"
          className={classes.friendManageBtnContent}
        >
          <PersonAddIcon sx={{ marginRight: '7px' }} /> Dodaj do znajomych
        </Typography>
      );
    } else if (!isUserFriend && isInvitedToFriend) {
      return (
        <Typography
          variant="subtitle1"
          className={classes.friendManageBtnContent}
        >
          <DoNotDisturbIcon sx={{ marginRight: '7px' }} />
          Anuluj zaproszenie
        </Typography>
      );
    } else if (isUserFriend && !isInvitedToFriend) {
      return (
        <Typography
          variant="subtitle1"
          className={classes.friendManageBtnContent}
        >
          <PersonIcon sx={{ marginRight: '7px' }} />
          Znajomy
        </Typography>
      );
    }
  };

  const handleChangeSearchedFriend = (event) => {
    let searchedFriendName = event.target.value;

    setSearchedFriend(searchedFriendName);

    setFilteredFriends(
      userFriends.filter((friend) =>
        (friend.user.firstName + friend.user.lastName)
          .toUpperCase()
          .includes(searchedFriendName.toUpperCase())
      )
    );
  };

  const handleChangeFriendsOrder = (event) => {
    setFriendsOrder(event.target.value);
  };

  const handleChangeFriendsPageNumber = (event, value) => {
    setFriendsPageNumber(value);
  };

  const sortFriends = (friendOrderType) => {
    if (friendOrderType === 1) {
      filteredFriends.sort((a, b) => {
        let x = a.user.firstName.toUpperCase();
        let y = b.user.firstName.toUpperCase();
        return x === y ? 0 : x > y ? 1 : -1;
      });
    } else if (friendOrderType === 2) {
      filteredFriends.sort(
        (x, y) => new Date(y.friendFromDate) - new Date(x.friendFromDate)
      );
    } else if (friendOrderType === 3) {
      filteredFriends.sort((x, y) => {
        return y.userFriends.length - x.userFriends.length;
      });
    } else if (friendOrderType === 4) {
      filteredFriends.sort((a, b) => {
        let x = a.address.city.toUpperCase();
        let y = b.address.city.toUpperCase();
        return x === y ? 0 : x > y ? 1 : -1;
      });
    }
    return filteredFriends;
  };

  const updateFriendList = (updatedFriendList) => {
    setFilteredFriends(updatedFriendList);
  };

  return (
    <>
      {!isLoading ? (
        <div className={classes.wrapper}>
          <Paper
            elevation={4}
            sx={{ borderRadius: '10px' }}
            className={classes.profileHeadingContainer}
          >
            <div className={classes.profileCoverImage}>
              {userProfile && userProfile.coverImage && (
                <img alt="Cover image" src={userProfile.coverImage} />
              )}
            </div>
            <div className={classes.profileInfoBox}>
              <div className={classes.userProfilePhotoBox}>
                <img
                  src={
                    userProfile && userProfile.profilePhoto !== null
                      ? userProfile.profilePhoto.url
                      : defaultUserPhoto
                  }
                  alt="Zdjęcie użytkownika"
                  className={classes.userPhoto}
                />
                {parseInt(selectedUserId) === loggedUser.userId && (
                  <label
                    htmlFor="icon-button-file"
                    className={classes.uploadCoverImageBtn}
                  >
                    <Input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="icon-button-file"
                      type="file"
                      onChange={handleClickChangeProfilePhoto}
                    />
                    <Tooltip title="Zmień zdjęcie profilowe" placement="left">
                      <IconButton
                        aria-label="upload picture"
                        component="span"
                        size="large"
                      >
                        <PhotoCamera fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                  </label>
                )}
                {parseInt(selectedUserId) === loggedUser.userId &&
                  userProfile &&
                  userProfile.profilePhoto !== null && (
                    <div className={classes.deleteProfileImageBtn}>
                      <Tooltip title="Usuń zdjęcie profilowe" placement="left">
                        <IconButton
                          size="small"
                          onClick={handleClickDeleteProfilePhoto}
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  )}
              </div>
              <div className={classes.profileHeadingInfo}>
                {userProfile ? (
                  <div className={classes.profileHeadingInfoContent}>
                    <div>
                      <Typography
                        fontSize="37px"
                        className={classes.profileHeadingText}
                        fontWeight={400}
                        variant="h2"
                      >
                        {userProfile.firstName + ' ' + userProfile.lastName}
                      </Typography>
                      <Typography
                        className={classes.profileHeadingText}
                        variant="h6"
                      >
                        {userProfile.email}
                      </Typography>
                    </div>
                    {parseInt(selectedUserId) !== loggedUser.userId && (
                      <Button
                        onMouseOver={() => setFriendBtnHover(true)}
                        onMouseOut={() => setFriendBtnHover(false)}
                        className={
                          isUserFriend && !isInvitedToFriend
                            ? classes.friendDeleteBtn
                            : classes.friendManageBtn
                        }
                        variant="contained"
                        color="secondary"
                        onClick={handleManageFriend}
                      >
                        {isUserFriend &&
                        !isInvitedToFriend &&
                        friendBtnHover ? (
                          <Typography
                            variant="subtitle1"
                            className={classes.friendManageBtnContent}
                          >
                            <PersonRemoveIcon sx={{ marginRight: '7px' }} />
                            Usuń ze znajomych
                          </Typography>
                        ) : (
                          generateFriendBtn()
                        )}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className={classes.loadingContainer}>
                    <CircularProgress color="secondary" />
                  </div>
                )}
                <List
                  className={classes.profileInfoList}
                  style={{ borderLeft: '1px solid black' }}
                >
                  <ListItem className={classes.profileInfoListItem}>
                    <Typography variant="subtitle2">
                      {'Znajomi: ' +
                        (userActivity ? userActivity.friends.length : 0)}
                    </Typography>
                  </ListItem>
                  <ListItem className={classes.profileInfoListItem}>
                    <Typography variant="subtitle2">
                      {'Posty: ' +
                        (userActivity ? userActivity.createdPosts.length : 0)}
                    </Typography>
                  </ListItem>
                  <ListItem className={classes.profileInfoListItem}>
                    <Typography variant="subtitle2">
                      {'Komentarze: ' +
                        (userActivity ? userActivity.comments.length : 0)}
                    </Typography>
                  </ListItem>
                  <ListItem className={classes.profileInfoListItem}>
                    <Typography variant="subtitle2">
                      {'Polubienia: ' +
                        (userActivity ? userActivity.likes.length : 0)}
                    </Typography>
                  </ListItem>
                </List>
              </div>
            </div>
          </Paper>
          <Paper elevation={4} sx={{ borderRadius: '10px' }}>
            <Tabs
              value={profileNavIndex}
              onChange={handleChangeProfileNav}
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
                id="tab-images"
                label="Zdjęcia"
              />
              <Tab
                className={classes.tabItem}
                id="tab-friends"
                label="Znajomi"
              />
              <Tab className={classes.tabItem} id="tab-groups" label="Grupy" />
            </Tabs>
          </Paper>
          <TabPanel classes={classes} value={profileNavIndex} index={0}>
            <div className={classes.leftActivityContent}>
              <Paper elevation={4} sx={{ borderRadius: '10px' }}>
                <div className={classes.profileInfoBoxHeading}>
                  <Typography variant="h6">Informacje</Typography>
                  <Link
                    component="button"
                    variant="subtitle1"
                    onClick={() => {
                      dispatch(changeProfileNav(1));
                    }}
                  >
                    Zobacz więcej
                  </Link>
                </div>
                {userProfile && userFriends && (
                  <div style={{ padding: '10px 15px', marginBottom: '15px' }}>
                    {userProfile.isPublic ? (
                      <Typography
                        variant="subtitle1"
                        className={classes.profileBasicInfoItem}
                      >
                        <PublicIcon /> Profil publiczny
                      </Typography>
                    ) : (
                      <Typography
                        variant="subtitle1"
                        className={classes.profileBasicInfoItem}
                      >
                        <LockIcon /> Profil prywatny
                      </Typography>
                    )}
                    {userProfile.address && (
                      <Typography
                        variant="subtitle1"
                        className={classes.profileBasicInfoItem}
                      >
                        <LocationOnIcon />
                        {userProfile.address.country +
                          ', ' +
                          userProfile.address.city}
                      </Typography>
                    )}
                    <Typography
                      variant="subtitle1"
                      className={classes.profileBasicInfoItem}
                    >
                      <CakeIcon />
                      {userProfile.dateOfBirth}
                    </Typography>
                    {userProfile.job !== null && (
                      <Typography
                        variant="subtitle1"
                        className={classes.profileBasicInfoItem}
                      >
                        <WorkIcon />
                        {userProfile.job}
                      </Typography>
                    )}
                    {userProfile.schools.length > 0 && (
                      <Typography
                        variant="subtitle1"
                        className={classes.profileBasicInfoItem}
                      >
                        <SchoolIcon />{' '}
                        {'Uczęszczał(a) do ' +
                          userProfile.schools[userProfile.schools.length - 1]
                            .name}
                      </Typography>
                    )}
                    {userProfile.relationshipStatus !== null && (
                      <Typography
                        variant="subtitle1"
                        className={classes.profileBasicInfoItem}
                      >
                        <FavoriteIcon />
                        {
                          relationshipStatusTypes[
                            userProfile.relationshipStatus
                          ]
                        }
                      </Typography>
                    )}
                    <Typography
                      variant="subtitle1"
                      className={classes.profileBasicInfoItem}
                    >
                      <PeopleIcon /> {'Liczba znajomych: ' + userFriends.length}
                    </Typography>
                  </div>
                )}
              </Paper>
              {userFriends.length > 0 && (
                <Paper elevation={4} sx={{ borderRadius: '10px' }}>
                  <div className={classes.profileInfoBoxHeading}>
                    <Typography variant="h6">Znajomi użytkownika</Typography>
                    <Link
                      component="button"
                      variant="subtitle1"
                      onClick={() => {
                        dispatch(changeProfileNav(3));
                      }}
                    >
                      Zobacz więcej
                    </Link>
                  </div>
                  <div className={classes.profileInfoBoxContent}>
                    <ImageList
                      cols={3}
                      rowHeight={120}
                      sx={{ margin: 0, paddingBottom: '50px' }}
                      gap={3}
                      variant="quilted"
                    >
                      {userFriends &&
                        userFriends.map((friend, index) => {
                          if (index < 9) {
                            return (
                              <ImageListItem
                                key={friend.friendId}
                                className={classes.imageListItemBox}
                                onClick={() =>
                                  history.push(
                                    '/app/profile/' + friend.user.userId
                                  )
                                }
                              >
                                <img
                                  src={
                                    friend.user.profilePhoto !== null
                                      ? friend.user.profilePhoto.url
                                      : defaultUserPhoto
                                  }
                                  alt={
                                    friend.user.firstName + friend.user.lastName
                                  }
                                  loading="lazy"
                                />
                                <ImageListItemBar
                                  title={
                                    <Typography
                                      variant="body1"
                                      className={classes.imageListItemTitle}
                                    >
                                      {friend.user.firstName}
                                      <br />
                                      {friend.user.lastName}
                                    </Typography>
                                  }
                                  position="below"
                                />
                              </ImageListItem>
                            );
                          }
                        })}
                    </ImageList>
                  </div>
                </Paper>
              )}
              {userImages.length > 0 && (
                <Paper elevation={4} sx={{ borderRadius: '10px' }}>
                  <div className={classes.profileInfoBoxHeading}>
                    <Typography variant="h6">Dodane zdjęcia</Typography>
                    <Link
                      component="button"
                      variant="subtitle1"
                      onClick={() => {
                        dispatch(changeProfileNav(2));
                      }}
                    >
                      Zobacz więcej
                    </Link>
                  </div>
                  <div className={classes.profileInfoBoxContent}>
                    <ImageList
                      cols={3}
                      rowHeight={120}
                      sx={{ margin: 0 }}
                      gap={6}
                      variant="quilted"
                    >
                      {userImages &&
                        userImages.map((item, index) => {
                          if (index < 9) {
                            return (
                              <ImageListItem key={item.url}>
                                <img
                                  src={item.url}
                                  alt={item.filename}
                                  loading="lazy"
                                />
                              </ImageListItem>
                            );
                          }
                        })}
                    </ImageList>
                  </div>
                </Paper>
              )}
            </div>
            <div className={classes.rightActivityContent}>
              {userActivity ? (
                <TabContext value={activityValue}>
                  <Paper
                    elevation={4}
                    sx={{ borderRadius: '10px', padding: '0px 15px' }}
                  >
                    <TabList onChange={handleChangeActivityValue}>
                      <Tab
                        className={classes.activityTabItem}
                        label="Posty"
                        value="a1"
                      />
                      <Tab
                        className={classes.activityTabItem}
                        label="Polubione posty"
                        value="a2"
                      />
                      <Tab
                        className={classes.activityTabItem}
                        label="Udostępnione posty"
                        value="a3"
                      />
                      <Tab
                        className={classes.activityTabItem}
                        label="Komentarze"
                        value="a4"
                      />
                    </TabList>
                  </Paper>
                  <TabPanelMUI
                    value="a1"
                    className={classes.tabPanelActivityContainer}
                  >
                    {parseInt(selectedUserId) === loggedUser.userId && (
                      <Paper
                        elevation={4}
                        sx={{ borderRadius: '10px' }}
                        className={classes.postCreateBox}
                      >
                        <Typography fontWeight="bold" variant="h6">
                          Utwórz post
                        </Typography>
                        <Divider className={classes.divider} />
                        <div className={classes.postCreateContent}>
                          <Avatar
                            src={
                              userProfile && userProfile.profilePhoto !== null
                                ? userProfile.profilePhoto.url
                                : defaultUserPhoto
                            }
                            alt={
                              userProfile
                                ? userProfile.firstName +
                                  ' ' +
                                  userProfile.lastName
                                : 'Zalogowany użytkownik'
                            }
                            className={classes.postCreationUserPhoto}
                          />
                          <TextField
                            fullWidth
                            placeholder="Napisz coś tutaj..."
                            multiline
                            rows={2}
                            className={classes.postInput}
                            onClick={() => setOpenPostCreation(true)}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <PhotoIcon className={classes.photoIcon} />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                      </Paper>
                    )}
                    <Popup
                      open={openPostCreation}
                      type="post"
                      title="Utwórz post"
                      onClose={handleClosePostCreation}
                    >
                      <PostForm closePopup={handleClosePostCreation} />
                    </Popup>
                    {userActivity.createdPosts.map((post, index) => {
                      if (index < numberItemsShown.posts) {
                        return (
                          <Post
                            key={post.postId}
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
                            isCommentingBlocked={post.isCommentingBlocked}
                            editionDate={post.editedAt}
                          />
                        );
                      }
                    })}
                    {numberItemsShown.posts <
                      userActivity.createdPosts.length && (
                      <div className={classes.moreItemsContainer}>
                        <Link
                          component="button"
                          variant="subtitle2"
                          onClick={() => updateShownItems('posts')}
                          className={classes.moreContentLink}
                        >
                          Zobacz więcej
                        </Link>
                      </div>
                    )}
                  </TabPanelMUI>
                  <TabPanelMUI
                    value="a2"
                    className={classes.tabPanelActivityContainer}
                  >
                    {userActivity.likes.map((post, index) => {
                      if (index < numberItemsShown.likePosts) {
                        return (
                          <Post
                            key={post.postId}
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
                            isCommentingBlocked={post.isCommentingBlocked}
                            editionDate={post.editedAt}
                          />
                        );
                      }
                    })}
                    {numberItemsShown.likePosts < userActivity.likes.length && (
                      <div className={classes.moreItemsContainer}>
                        <Link
                          component="button"
                          variant="subtitle2"
                          onClick={() => updateShownItems('likePosts')}
                          className={classes.moreContentLink}
                        >
                          Zobacz więcej
                        </Link>
                      </div>
                    )}
                  </TabPanelMUI>
                  <TabPanelMUI
                    value="a3"
                    className={classes.tabPanelActivityContainer}
                  >
                    {userActivity.sharedPosts.map((item, index) => {
                      if (index < numberItemsShown.sharedPosts) {
                        return (
                          <SharedPost
                            key={item.sharedPostId}
                            sharedPostId={item.sharedPostId}
                            sharedPost={item.sharedPost}
                            sharingId={item.sharingId}
                            sharingAuthorId={item.authorOfSharing.userId}
                            authorName={
                              item.authorOfSharing.firstName +
                              ' ' +
                              item.authorOfSharing.lastName
                            }
                            profilePhoto={item.authorOfSharing.profilePhoto}
                            userStatus={item.authorOfSharing.activityStatus}
                            text={item.sharingText}
                            date={new Date(item.sharingDate)}
                            isPublic={item.isPublic}
                            isCommentingBlocked={item.isCommentingBlocked}
                            likes={item.sharingLikes}
                            comments={item.sharingComments}
                          />
                        );
                      }
                    })}
                    {numberItemsShown.sharedPosts <
                      userActivity.sharedPosts.length && (
                      <div className={classes.moreItemsContainer}>
                        <Link
                          component="button"
                          variant="subtitle2"
                          onClick={() => updateShownItems('sharedPosts')}
                          className={classes.moreContentLink}
                        >
                          Zobacz więcej
                        </Link>
                      </div>
                    )}
                  </TabPanelMUI>
                  <TabPanelMUI
                    value="a4"
                    className={classes.tabPanelActivityContainer}
                  >
                    {userActivity.comments.map((comment, index) => {
                      if (index < numberItemsShown.comments) {
                        if (
                          comment.commentedPost !== null &&
                          comment.commentedSharedPost === null
                        ) {
                          return (
                            <Post
                              highlightCommentById={comment.commentId}
                              key={comment.commentId}
                              postId={comment.commentedPost.postId}
                              authorId={comment.commentedPost.postAuthor.userId}
                              authorName={
                                comment.commentedPost.postAuthor.firstName +
                                ' ' +
                                comment.commentedPost.postAuthor.lastName
                              }
                              profilePhoto={
                                comment.commentedPost.postAuthor.profilePhoto
                              }
                              createdDate={
                                new Date(comment.commentedPost.createdAt)
                              }
                              images={comment.commentedPost.images}
                              likesNumber={comment.commentedPost.likes.length}
                              sharesNumber={
                                comment.commentedPost.sharing.length
                              }
                              commentsNumber={
                                comment.commentedPost.comments.length
                              }
                              comments={comment.commentedPost.comments}
                              content={comment.commentedPost.text}
                              userStatus={
                                comment.commentedPost.postAuthor.activityStatus
                              }
                              likes={comment.commentedPost.likes}
                              isEdited={comment.commentedPost.isEdited}
                              isPublic={comment.commentedPost.isPublic}
                              isCommentingBlocked={
                                comment.commentedPost.isCommentingBlocked
                              }
                              editionDate={comment.commentedPost.editedAt}
                            />
                          );
                        } else {
                          return (
                            <SharedPost
                              highlightCommentById={comment.commentId}
                              key={comment.commentId}
                              sharedPostId={
                                comment.commentedSharedPost.sharedPostId
                              }
                              sharedPost={
                                comment.commentedSharedPost.sharedPost
                              }
                              sharingId={comment.commentedSharedPost.sharingId}
                              sharingAuthorId={
                                comment.commentedSharedPost.authorOfSharing
                                  .userId
                              }
                              authorName={
                                comment.commentedSharedPost.authorOfSharing
                                  .firstName +
                                ' ' +
                                comment.commentedSharedPost.authorOfSharing
                                  .lastName
                              }
                              profilePhoto={
                                comment.commentedSharedPost.authorOfSharing
                                  .profilePhoto
                              }
                              userStatus={
                                comment.commentedSharedPost.authorOfSharing
                                  .activityStatus
                              }
                              text={comment.commentedSharedPost.sharingText}
                              date={
                                new Date(
                                  comment.commentedSharedPost.sharingDate
                                )
                              }
                              isPublic={comment.commentedSharedPost.isPublic}
                              isCommentingBlocked={
                                comment.commentedSharedPost.isCommentingBlocked
                              }
                              likes={comment.commentedSharedPost.sharingLikes}
                              comments={
                                comment.commentedSharedPost.sharingComments
                              }
                            />
                          );
                        }
                      }
                    })}
                    {numberItemsShown.sharedPosts <
                      userActivity.sharedPosts.length && (
                      <div className={classes.moreItemsContainer}>
                        <Link
                          component="button"
                          variant="subtitle2"
                          onClick={() => updateShownItems('comments')}
                          className={classes.moreContentLink}
                        >
                          Zobacz więcej
                        </Link>
                      </div>
                    )}
                  </TabPanelMUI>
                </TabContext>
              ) : (
                <div className={classes.loadingContainer}>
                  <CircularProgress
                    color="secondary"
                    sx={{ width: '300px', height: '300px' }}
                  />
                </div>
              )}
            </div>
          </TabPanel>
          <TabPanel classes={classes} value={profileNavIndex} index={1}>
            <Paper
              elevation={4}
              className={classes.profileInformationContainer}
            >
              <TabContext value={profileInfoNav}>
                <div className={classes.profileInformationTabs}>
                  <TabList
                    onChange={handleChangeProfileInfoNav}
                    className={classes.profileInformationTabList}
                    TabIndicatorProps={{
                      style: {
                        display: 'none',
                      },
                    }}
                  >
                    <Tab label="Podstawowe informacje" value="i1" />
                    <Tab label="Dane kontaktowe" value="i2" />
                    <Tab label="Praca i wykształcenie" value="i3" />
                    <Tab label="Zainteresowania" value="i4" />
                    <Tab label="Ulubione" value="i5" />
                  </TabList>
                </div>
                {userProfile ? (
                  <div className={classes.profileInformationContent}>
                    <TabPanelMUI
                      value="i1"
                      className={classes.profileInformationTabItem}
                    >
                      <div
                        className={classes.profileInformationHeadingWithAction}
                      >
                        <Typography variant="h5">
                          Podstawowe informacje
                        </Typography>
                        {parseInt(selectedUserId) === loggedUser.userId && (
                          <Tooltip title="Edytuj informacje" placement="left">
                            <IconButton
                              className={classes.editBaseInformationBtn}
                              onClick={() => setOpenProfileEdition(true)}
                            >
                              <EditIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Popup
                          open={openProfileEdition}
                          type="profileForm"
                          title="Zaaktualizuj informacje"
                          onClose={handleCloseProfileEditionForm}
                        >
                          <ProfileEditionForm
                            closePopup={handleCloseProfileEditionForm}
                            editedFirstName={userProfile.firstName}
                            editedLastName={userProfile.lastName}
                            editedAccess={userProfile.isPublic}
                            editedGender={userProfile.gender}
                            editedRelationship={userProfile.relationshipStatus}
                            editedDateOfBirth={userProfile.dateOfBirth}
                            editedJob={userProfile.job}
                            editedSkills={userProfile.skills}
                            editedAboutUser={userProfile.aboutUser}
                          />
                        </Popup>
                      </div>
                      <ProfileInformationItem
                        title="Imię i nazwisko"
                        content={
                          userProfile.firstName + ' ' + userProfile.lastName
                        }
                      />
                      <ProfileInformationItem
                        title="Dzień urodzenia"
                        content={
                          new Date(userProfile.dateOfBirth).getDate() +
                          ' ' +
                          new Date(userProfile.dateOfBirth).toLocaleString(
                            'default',
                            { month: 'long' }
                          )
                        }
                      />
                      <ProfileInformationItem
                        title="Rok urodzenia"
                        content={new Date(userProfile.dateOfBirth)
                          .getFullYear()
                          .toString()}
                      />
                      <ProfileInformationItem
                        title="Wiek"
                        content={userProfile.age.toString()}
                      />
                      <ProfileInformationItem
                        title="Płeć"
                        content={
                          userProfile.gender === 'MALE'
                            ? 'Mężczyzna'
                            : userProfile.gender === 'FEMALE'
                            ? 'Kobieta'
                            : 'Nieokreślona'
                        }
                      />
                      <ProfileInformationItem
                        title="Zawód"
                        content={
                          userProfile.job !== null ? userProfile.job : '-'
                        }
                      />
                      <ProfileInformationItem
                        title="Związek"
                        content={
                          userProfile.relationshipStatus !== null
                            ? relationshipStatusTypes[
                                userProfile.relationshipStatus
                              ]
                            : '-'
                        }
                      />
                      <ProfileInformationItem
                        title="Dostępność profilu"
                        content={
                          userProfile.isPublic ? 'Publiczny' : 'Prywatny'
                        }
                      />
                      <Typography
                        variant="h5"
                        sx={{ marginTop: '15px' }}
                        className={classes.profileInformationHeading}
                      >
                        O mnie
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        className={classes.profileInformationItemTitle}
                      >
                        {userProfile.aboutUser !== null
                          ? userProfile.aboutUser
                          : 'Brak opisu'}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ marginTop: '15px' }}
                        className={classes.profileInformationHeading}
                      >
                        Umiejętności
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        className={classes.profileInformationItemTitle}
                      >
                        {userProfile.skills !== null
                          ? userProfile.skills
                          : 'Brak opisu umiejętności'}
                      </Typography>
                    </TabPanelMUI>
                    <TabPanelMUI
                      value="i2"
                      className={classes.profileInformationTabItem}
                    >
                      <div
                        className={classes.profileInformationHeadingWithAction}
                      >
                        <Typography variant="h5">Dane kontaktowe</Typography>
                        {parseInt(selectedUserId) === loggedUser.userId && (
                          <Tooltip
                            title="Edytuj dane kontaktowe"
                            placement="left"
                          >
                            <IconButton
                              className={classes.editBaseInformationBtn}
                              onClick={() => history.push('/app/settings')}
                            >
                              <EditIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </div>
                      <ProfileInformationItem
                        title="Adres email"
                        content={userProfile.email}
                      />
                      <ProfileInformationItem
                        title="Numer telefonu"
                        content={userProfile.phoneNumber}
                      />
                      <div
                        style={{ marginTop: '15px' }}
                        className={classes.profileInformationHeadingWithAction}
                      >
                        <Typography variant="h5">Adres zamieszkania</Typography>
                        {parseInt(selectedUserId) === loggedUser.userId &&
                          (userProfile.address !== null ? (
                            <Tooltip title="Edytuj Adres" placement="left">
                              <IconButton
                                className={classes.editBaseInformationBtn}
                                onClick={() =>
                                  setOpenEditAddressFormPopup(true)
                                }
                              >
                                <EditIcon color="primary" />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Dodaj Adres" placement="left">
                              <IconButton
                                className={classes.editBaseInformationBtn}
                                onClick={() => setOpenAddAddressFormPopup(true)}
                              >
                                <AddIcon color="primary" fontWeight="bold" />
                              </IconButton>
                            </Tooltip>
                          ))}
                      </div>
                      {userProfile.address && (
                        <>
                          <ProfileInformationItem
                            title="Państwo"
                            content={
                              userProfile.address.country
                                ? userProfile.address.country
                                : '-'
                            }
                          />
                          <ProfileInformationItem
                            title="Miasto"
                            content={
                              userProfile.address.city
                                ? userProfile.address.city
                                : '-'
                            }
                          />
                          <ProfileInformationItem
                            title="Ulica"
                            content={
                              userProfile.address.street
                                ? userProfile.address.street
                                : '-'
                            }
                          />
                          <ProfileInformationItem
                            title="Kod pocztowy"
                            content={
                              userProfile.address.zipCode
                                ? userProfile.address.zipCode
                                : '-'
                            }
                          />
                          <Popup
                            open={openEditAddressFormPopup}
                            type="addressForm"
                            title=" Edytuj adres"
                            onClose={handleCloseEditAddressFormPopup}
                          >
                            <AddressForm
                              edition
                              addressId={userProfile.address.addressId}
                              editedCountry={userProfile.address.country}
                              editedCity={userProfile.address.city}
                              editedStreet={userProfile.address.street}
                              editedZipCode={userProfile.address.zipCode}
                              closePopup={handleCloseEditAddressFormPopup}
                            />
                          </Popup>
                        </>
                      )}
                      <Popup
                        open={openAddAddressFormPopup}
                        type="addressForm"
                        title=" Dodaj adres"
                        onClose={handleCloseAddAddressFormPopup}
                      >
                        <AddressForm
                          closePopup={handleCloseAddAddressFormPopup}
                        />
                      </Popup>
                    </TabPanelMUI>
                    <TabPanelMUI
                      value="i3"
                      className={classes.profileInformationTabItem}
                    >
                      <Typography
                        variant="h5"
                        className={classes.profileInformationHeading}
                      >
                        Wykształcenie
                      </Typography>
                      {userProfile.schools
                        .sort((a, b) =>
                          a.schoolType > b.schoolType
                            ? 1
                            : b.schoolType > a.schoolType
                            ? -1
                            : 0
                        )
                        .map((school) => (
                          <SchoolInfoItem
                            key={school.schoolId}
                            schoolId={school.schoolId}
                            type={school.schoolType}
                            name={school.name}
                            startDate={school.startDate}
                            graduationDate={school.graduationDate}
                            manage={
                              parseInt(selectedUserId) === loggedUser.userId
                            }
                          />
                        ))}
                      {parseInt(selectedUserId) === loggedUser.userId && (
                        <Button
                          color="secondary"
                          variant="text"
                          className={classes.addProfileInfoItemBtn}
                          onClick={() => setOpenAddSchoolPopup(true)}
                        >
                          <AddCircleOutlineIcon />
                          <Typography variant="subtitle1" marginLeft="10px">
                            Dodaj szkołę
                          </Typography>
                        </Button>
                      )}
                      <Typography
                        variant="h5"
                        className={classes.profileInformationHeading}
                      >
                        Praca
                      </Typography>
                      {userProfile.workPlaces.map((work) => (
                        <WorkPlaceInfoItem
                          key={work.workPlaceId}
                          workId={work.workPlaceId}
                          company={work.company}
                          position={work.position}
                          startDate={work.startDate}
                          endDate={work.endDate}
                          manage={
                            parseInt(selectedUserId) === loggedUser.userId
                          }
                        />
                      ))}
                      {parseInt(selectedUserId) === loggedUser.userId && (
                        <Button
                          color="secondary"
                          variant="text"
                          className={classes.addProfileInfoItemBtn}
                          onClick={() => setOpenAddWorkPopup(true)}
                        >
                          <AddCircleOutlineIcon />
                          <Typography variant="subtitle1" marginLeft="10px">
                            Dodaj miejsce pracy
                          </Typography>
                        </Button>
                      )}
                      <Popup
                        open={openAddSchoolPopup}
                        type="profileInfo"
                        title="Dodaj szkołę"
                        onClose={handleCloseAddSchoolPopup}
                      >
                        <AddSchoolForm closePopup={handleCloseAddSchoolPopup} />
                      </Popup>
                      <Popup
                        open={openAddWorkPopup}
                        type="profileInfo"
                        title="Dodaj miejsce pracy"
                        onClose={handleCloseAddWorkPopup}
                      >
                        <AddWorkPlaceForm
                          closePopup={handleCloseAddWorkPopup}
                        />
                      </Popup>
                    </TabPanelMUI>
                    <TabPanelMUI
                      value="i4"
                      className={classes.profileInformationTabItem}
                    >
                      <Typography
                        variant="h5"
                        className={classes.profileInformationHeading}
                      >
                        Zainteresowania
                      </Typography>
                      {userInterests.length > 0 && (
                        <List className={classes.userInterestList}>
                          {userInterests
                            .sort((x, y) => {
                              let a = x.name.toUpperCase(),
                                b = y.name.toUpperCase();
                              return a === b ? 0 : a > b ? 1 : -1;
                            })
                            .map((userInterest) => (
                              <ListItem
                                key={userInterest.interestId}
                                disableGutters
                                secondaryAction={
                                  parseInt(selectedUserId) ===
                                    loggedUser.userId && (
                                    <IconButton
                                      onClick={() =>
                                        handleClickDeleteUserInterest(
                                          userInterest.interestId
                                        )
                                      }
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  )
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
                                      {userInterest.name}
                                    </Typography>
                                  }
                                />
                              </ListItem>
                            ))}
                        </List>
                      )}
                      {parseInt(selectedUserId) === loggedUser.userId && (
                        <Button
                          color="secondary"
                          variant="text"
                          className={classes.addProfileInfoItemBtn}
                          onClick={() =>
                            setShowFavouriteForm(!showFavouriteForm)
                          }
                        >
                          <AddCircleOutlineIcon />
                          <Typography variant="subtitle1" marginLeft="10px">
                            Dodaj zainteresowanie
                          </Typography>
                        </Button>
                      )}
                      {showFavouriteForm && (
                        <AddUserInterestForm
                          userId={loggedUser.userId}
                          onCloseForm={() => setShowFavouriteForm(false)}
                        />
                      )}
                    </TabPanelMUI>
                    <TabPanelMUI
                      value="i5"
                      className={classes.profileInformationTabItem}
                    >
                      <Typography
                        variant="h5"
                        className={classes.profileInformationHeading}
                      >
                        Ulubione
                      </Typography>
                      {userFavourites && (
                        <>
                          <UserFavouriteItemList
                            selectedUserId={selectedUserId}
                            favourites={userFavourites.filter(
                              (favourite) => favourite.favouriteType === 'BOOK'
                            )}
                          />
                          <UserFavouriteItemList
                            selectedUserId={selectedUserId}
                            favourites={userFavourites.filter(
                              (favourite) => favourite.favouriteType === 'FILM'
                            )}
                          />
                          <UserFavouriteItemList
                            selectedUserId={selectedUserId}
                            favourites={userFavourites.filter(
                              (favourite) => favourite.favouriteType === 'ACTOR'
                            )}
                          />
                          <UserFavouriteItemList
                            selectedUserId={selectedUserId}
                            favourites={userFavourites.filter(
                              (favourite) => favourite.favouriteType === 'MUSIC'
                            )}
                          />
                          <UserFavouriteItemList
                            selectedUserId={selectedUserId}
                            favourites={userFavourites.filter(
                              (favourite) => favourite.favouriteType === 'BAND'
                            )}
                          />
                          <UserFavouriteItemList
                            selectedUserId={selectedUserId}
                            favourites={userFavourites.filter(
                              (favourite) => favourite.favouriteType === 'QUOTE'
                            )}
                          />
                          <UserFavouriteItemList
                            selectedUserId={selectedUserId}
                            favourites={userFavourites.filter(
                              (favourite) =>
                                favourite.favouriteType === 'TV_SHOW'
                            )}
                          />
                          <UserFavouriteItemList
                            selectedUserId={selectedUserId}
                            favourites={userFavourites.filter(
                              (favourite) => favourite.favouriteType === 'SPORT'
                            )}
                          />
                          <UserFavouriteItemList
                            selectedUserId={selectedUserId}
                            favourites={userFavourites.filter(
                              (favourite) =>
                                favourite.favouriteType === 'SPORT_TEAM'
                            )}
                          />
                        </>
                      )}
                      {parseInt(selectedUserId) === loggedUser.userId && (
                        <Button
                          color="secondary"
                          variant="text"
                          className={classes.addProfileInfoItemBtn}
                          onClick={() =>
                            setShowFavouriteForm(!showFavouriteForm)
                          }
                        >
                          <AddCircleOutlineIcon />
                          <Typography variant="subtitle1" marginLeft="10px">
                            Dodaj ulubione
                          </Typography>
                        </Button>
                      )}
                      {showFavouriteForm && (
                        <AddUserFavouriteForm
                          onCloseForm={() => setShowFavouriteForm(false)}
                        />
                      )}
                    </TabPanelMUI>
                  </div>
                ) : (
                  <div className={classes.loadingContainer}>
                    <CircularProgress
                      color="secondary"
                      sx={{ width: '300px', height: '300px' }}
                    />
                  </div>
                )}
              </TabContext>
            </Paper>
          </TabPanel>
          <TabPanel classes={classes} value={profileNavIndex} index={2}>
            <Paper elevation={4} sx={{ borderRadius: '10px', width: '100%' }}>
              <div className={classes.profileNavHeadingBox}>
                <Typography variant="h4" fontWeight="bold" marginBottom="10px">
                  Zdjęcia
                </Typography>
                <Divider />
              </div>
              <ImageList
                gap={15}
                variant="quilted"
                cols={2}
                rowHeight={420}
                sx={{ margin: 0, padding: '20px' }}
              >
                {userImages &&
                  userImages
                    .slice((imagesPageNumber - 1) * 10, imagesPageNumber * 10)
                    .map((item) => {
                      return (
                        <ImageListItem key={item.url}>
                          <img src={item.url} alt={item.filename} />
                        </ImageListItem>
                      );
                    })}
              </ImageList>
              {userImages.length !== 0 && (
                <Pagination
                  className={classes.imagesPagination}
                  count={userImages && Math.ceil(userImages.length / 10)}
                  color="secondary"
                  size="large"
                  showFirstButton
                  showLastButton
                  page={imagesPageNumber}
                  onChange={handleChangeImagesPageNumber}
                />
              )}
              {userImages.length === 0 && (
                <Typography
                  textAlign="center"
                  variant="h6"
                  marginTop="-20px"
                  marginBottom="20px"
                >
                  Brak dodanych zdjęć
                </Typography>
              )}
            </Paper>
          </TabPanel>
          <TabPanel classes={classes} value={profileNavIndex} index={3}>
            <Paper elevation={4} sx={{ borderRadius: '10px', width: '100%' }}>
              <div className={classes.profileNavHeadingBox}>
                <Typography variant="h4" className={classes.friendTitle}>
                  Znajomi
                  <span className={classes.friendNumber}>
                    {userFriends.length}
                  </span>
                </Typography>
                <Divider />
                <div className={classes.userFriendsActionContainer}>
                  <TextField
                    id="friend-searchbar"
                    placeholder="Wyszukaj znajomego"
                    className={classes.friendSearchbar}
                    value={searchedFriend}
                    onChange={handleChangeSearchedFriend}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div className={classes.friendsOrderBox}>
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
                        className={classes.friendOrderSelect}
                        value={friendsOrder}
                        onChange={handleChangeFriendsOrder}
                        MenuProps={{ disableScrollLock: true }}
                      >
                        <MenuItem value={1}>Kolejności alfabetycznej</MenuItem>
                        <MenuItem value={2}>Daty dodania</MenuItem>
                        <MenuItem value={3}>Ilości znajomych</MenuItem>
                        <MenuItem value={4}>Miejsca zamieszkania</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <Divider />
              </div>
              <div className={classes.friendInformationContainer}>
                {userFriends &&
                  sortFriends(friendsOrder)
                    .slice((friendsPageNumber - 1) * 6, friendsPageNumber * 6)
                    .map((friend) => (
                      <FriendInformation
                        key={friend.friendId}
                        name={
                          friend.user.firstName + ' ' + friend.user.lastName
                        }
                        city={friend.address && friend.address.city}
                        userFriendId={friend.user.userId}
                        profilePhoto={friend.user.profilePhoto}
                        friendList={friend.userFriends}
                        updateFriends={updateFriendList}
                      />
                    ))}
                {userFriends.length === 0 && (
                  <Typography
                    variant="h6"
                    width="100%"
                    marginTop="10px"
                    marginBottom="10px"
                    textAlign="center"
                  >
                    Brak znajomych
                  </Typography>
                )}
              </div>
              {userFriends.length > 10 && (
                <Pagination
                  className={classes.friendsPagination}
                  count={userFriends && Math.ceil(userFriends.length / 10)}
                  color="secondary"
                  size="medium"
                  showFirstButton
                  showLastButton
                  page={friendsPageNumber}
                  onChange={handleChangeFriendsPageNumber}
                />
              )}
            </Paper>
          </TabPanel>
          <TabPanel classes={classes} value={profileNavIndex} index={4}>
            Grupy
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

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePage);
