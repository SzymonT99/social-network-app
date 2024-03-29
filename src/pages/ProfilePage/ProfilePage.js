import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './profilePage-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import {
  Button,
  Divider,
  IconButton,
  Input,
  Link,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Tab,
  Tabs,
  Tooltip,
} from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import { PhotoCamera } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import TabPanelMUI from '@mui/lab/TabPanel';
import Popup from '../../components/Popup/Popup';
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
import AddInterestForm from '../../components/Forms/AddInterestForm';
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
import UserInformation from '../../components/Profile/UserInformation';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';
import Group from '../../components/Group/Group';
import { getUserGroups } from '../../redux/actions/groupActions';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { getPrivateChat, setActiveChat } from '../../redux/actions/chatAction';
import ModalImage from 'react-modal-image-responsive';
import { showNotification } from '../../redux/actions/notificationActions';
import ReportForm from '../../components/Forms/ReportForm';
import ExpandListButton from '../../components/ExpandListButton/ExpandListButton';
import PostCreationBox from '../../components/PostCreationBox/PostCreationBox';
import BasicInformationBox from '../../components/Profile/BasicInformationBox';
import UserFriendsBox from '../../components/Profile/UserFriendsBox';
import UserImagesBox from '../../components/Profile/UserImagesBox';
import SearchItemsBox from '../../components/SearchItemsBox/SearchItemsBox';

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
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const isAdmin = loggedUser && loggedUser.roles.includes('ROLE_ADMIN');

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
  const userGroups = useSelector((state) => state.selectedProfile.userGroups);
  const isLoading = useSelector((state) => state.activity.isLoading);

  const history = useHistory();

  let { selectedUserId } = useParams();

  const [activityValue, setActivityValue] = useState('a1');
  const [profileInfoNav, setProfileInfoNav] = useState('i1');
  const [numberItemsShown, setNumberItemsShown] = useState({
    posts: 5,
    sharedPosts: 5,
    likePosts: 5,
    comments: 5,
  });
  const [openAddSchoolPopup, setOpenAddSchoolPopup] = useState(false);
  const [openAddWorkPopup, setOpenAddWorkPopup] = useState(false);
  const [showFavouriteForm, setShowFavouriteForm] = useState(false);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [imagesPageNumber, setImagesPageNumber] = useState(1);
  const [openProfileEditionPopup, setOpenProfileEditionPopup] = useState(false);
  const [openAddAddressFormPopup, setOpenAddAddressFormPopup] = useState(false);
  const [openEditAddressFormPopup, setOpenEditAddressFormPopup] =
    useState(false);
  const [isUserFriend, setIsUserFriend] = useState(false);
  const [isInvitedToFriend, setIsInvitedToFriend] = useState(false);
  const [friendBtnHover, setFriendBtnHover] = useState(false);
  const [friendsOrder, setFriendsOrder] = useState(1);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [friendsPageNumber, setFriendsPageNumber] = useState(1);
  const [groupsPageNumber, setGroupsPageNumber] = useState(1);
  const [openReportPopup, setOpenReportPopup] = useState(false);

  useEffect(() => {
    (async () => {
      if (
        isUserLoggedIn &&
        isLoggedUserRemember &&
        new Date() > new Date(loggedUser.accessTokenExpirationDate)
      ) {
        dispatch(setTokenRefreshing(true));
        await dispatch(refreshUserToken(loggedUser.refreshToken)).then(() => {
          dispatch(setTokenRefreshing(false));
        });
      }

      dispatch(setLoading(false));
      dispatch(getUserProfile(selectedUserId));
      dispatch(getUserFavouriteItems(selectedUserId));
      dispatch(getUserInterests(selectedUserId));

      if (!isUserLoggedIn && !userProfile.isPublic) {
        history.goBack();
        dispatch(showNotification('warning', 'Profil nie jest publiczny'));
      }

      if (isUserLoggedIn) {
        dispatch(setLoading(true));
        dispatch(getUserActivity(selectedUserId));
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
        dispatch(getUserGroups(selectedUserId));
      }
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

  const updateShownItems = (type) => {
    setNumberItemsShown((prevState) => ({
      ...prevState,
      [type]: numberItemsShown[type] + 5,
    }));
  };

  const handleClickDeleteUserInterest = (interestId) => {
    dispatch(deleteUserInterests(parseInt(selectedUserId), interestId));
  };

  const handleClickChangeProfilePhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      const form = new FormData();
      form.append('photo', file);
      dispatch(changeProfilePhoto(parseInt(selectedUserId), form));
    }
  };

  const handleClickDeleteProfilePhoto = () => {
    dispatch(deleteProfilePhoto(parseInt(selectedUserId)));
  };

  const handleChangeImagesPageNumber = (event, value) => {
    setImagesPageNumber(value);
  };

  const handleCloseProfileEditionForm = () => {
    setOpenProfileEditionPopup(false);
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
          <CheckCircleOutlineIcon /> Akceptuj zaproszenie
        </Typography>
      );
    } else if (!isUserFriend && !isInvitedToFriend) {
      return (
        <Typography
          variant="subtitle1"
          className={classes.friendManageBtnContent}
        >
          <PersonAddIcon /> Dodaj do znajomych
        </Typography>
      );
    } else if (!isUserFriend && isInvitedToFriend) {
      return (
        <Typography
          variant="subtitle1"
          className={classes.friendManageBtnContent}
        >
          <DoNotDisturbIcon />
          Anuluj zaproszenie
        </Typography>
      );
    } else if (isUserFriend && !isInvitedToFriend) {
      return (
        <Typography
          variant="subtitle1"
          className={classes.friendManageBtnContent}
        >
          <PersonIcon />
          Znajomy
        </Typography>
      );
    }
  };

  const renderFriendsByName = (value) => {
    setFilteredFriends(
      userFriends.filter((friend) =>
        (friend.user.firstName + friend.user.lastName)
          .toUpperCase()
          .includes(value.toUpperCase())
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
        let x = a.address ? a.address.city.toUpperCase() : '';
        let y = b.address ? b.address.city.toUpperCase() : '';
        return x === y ? 0 : x > y ? 1 : -1;
      });
    }
    return filteredFriends;
  };

  const updateFriendList = (updatedFriendList) => {
    setFilteredFriends(updatedFriendList);
  };

  const handleChangeGroupsPageNumber = (event, value) => {
    setGroupsPageNumber(value);
  };

  const handleClickChatWithFriend = () => {
    dispatch(getPrivateChat(parseInt(selectedUserId))).then((data) => {
      dispatch(setActiveChat(data.chatId));
      history.push('/app/chat');
    });
  };

  const handleCloseReportPopup = () => {
    setOpenReportPopup(false);
  };

  return (
    <>
      {!isLoading ? (
        <div className={classes.wrapper}>
          <Paper elevation={4} className={classes.profileHeadingContainer}>
            <div className={classes.profileCoverBackground} />
            <div className={classes.profileInfoBox}>
              <div>
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
                  {loggedUser &&
                    (parseInt(selectedUserId) === loggedUser.userId ||
                      isAdmin) && (
                      <label
                        htmlFor="icon-button-file"
                        className={classes.uploadCoverImageBtn}
                      >
                        <Input
                          accept="image/*"
                          sx={{ display: 'none' }}
                          id="icon-button-file"
                          type="file"
                          onChange={handleClickChangeProfilePhoto}
                        />
                        <Tooltip
                          title="Zmień zdjęcie profilowe"
                          placement="left"
                        >
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
                  {loggedUser &&
                    (parseInt(selectedUserId) === loggedUser.userId ||
                      isAdmin) &&
                    userProfile &&
                    userProfile.profilePhoto && (
                      <div className={classes.deleteProfileImageBtn}>
                        <Tooltip
                          title="Usuń zdjęcie profilowe"
                          placement="left"
                        >
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
                {loggedUser && parseInt(selectedUserId) !== loggedUser.userId && (
                  <Link
                    component="button"
                    variant="body1"
                    className={classes.reportUserLink}
                    onClick={() => setOpenReportPopup(true)}
                  >
                    Zgłoś użytkownika
                  </Link>
                )}
              </div>
              <div className={classes.profileHeadingInfo}>
                {userProfile && (
                  <div className={classes.profileHeadingInfoContent}>
                    <div>
                      <Typography
                        fontSize="37px"
                        className={classes.profileHeadingText}
                        fontWeight={400}
                        variant="h2"
                        noWrap
                      >
                        {userProfile.firstName + ' ' + userProfile.lastName}
                      </Typography>
                      <Typography
                        className={classes.profileHeadingText}
                        noWrap
                        variant="h6"
                      >
                        {userProfile.email}
                      </Typography>
                    </div>
                    <Popup
                      open={openReportPopup}
                      type="report"
                      title="Wyślij zgłoszenie"
                      onClose={handleCloseReportPopup}
                    >
                      <ReportForm
                        suspectId={parseInt(selectedUserId)}
                        closePopup={handleCloseReportPopup}
                      />
                    </Popup>
                    {loggedUser &&
                      parseInt(selectedUserId) !== loggedUser.userId && (
                        <div className={classes.userActionBtnContainer}>
                          <Button
                            onMouseOver={() => setFriendBtnHover(true)}
                            onMouseOut={() => setFriendBtnHover(false)}
                            className={
                              isUserFriend && !isInvitedToFriend
                                ? classes.friendDeleteBtn
                                : null
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
                                <PersonRemoveIcon />
                                Usuń ze znajomych
                              </Typography>
                            ) : (
                              generateFriendBtn()
                            )}
                          </Button>
                          {isUserFriend && (
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.friendChatBtn}
                              onClick={handleClickChatWithFriend}
                            >
                              <ChatBubbleIcon fontSize="small" />
                              Wyślij wiadomość
                            </Button>
                          )}
                        </div>
                      )}
                  </div>
                )}
                {isUserLoggedIn && (
                  <List className={classes.profileInfoList}>
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
                )}
              </div>
            </div>
          </Paper>
          {isUserLoggedIn && (
            <Paper elevation={4} className={classes.profileNavigationContainer}>
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
                <Tab
                  className={classes.tabItem}
                  id="tab-groups"
                  label="Grupy"
                />
              </Tabs>
            </Paper>
          )}
          <TabPanel classes={classes} value={profileNavIndex} index={0}>
            <div className={classes.leftActivityContent}>
              {userProfile && userFriends && (
                <BasicInformationBox
                  userProfile={userProfile}
                  friendsNumber={userFriends.length}
                />
              )}
              {userFriends.length > 0 && (
                <UserFriendsBox userFriends={userFriends} />
              )}
              {userImages.length > 0 && (
                <UserImagesBox userImages={userImages} />
              )}
            </div>
            <div className={classes.rightActivityContent}>
              {userActivity && (
                <TabContext value={activityValue}>
                  <Paper
                    elevation={4}
                    className={classes.profileActivityNavigation}
                  >
                    <TabList
                      onChange={handleChangeActivityValue}
                      className={classes.activityTabList}
                    >
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
                    {parseInt(selectedUserId) === loggedUser.userId &&
                      userProfile && (
                        <PostCreationBox
                          profilePhoto={userProfile.profilePhoto}
                          userNameAndSurname={
                            userProfile.firstName + ' ' + userProfile.lastName
                          }
                        />
                      )}
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
                            accessToManagement={loggedUser.roles.includes(
                              'ROLE_ADMIN'
                            )}
                          />
                        );
                      }
                    })}
                    {numberItemsShown.posts <
                      userActivity.createdPosts.length && (
                      <ExpandListButton
                        fetchMore={() => updateShownItems('posts')}
                      />
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
                            accessToManagement={loggedUser.roles.includes(
                              'ROLE_ADMIN'
                            )}
                          />
                        );
                      }
                    })}
                    {numberItemsShown.likePosts < userActivity.likes.length && (
                      <ExpandListButton
                        fetchMore={() => updateShownItems('likePosts')}
                      />
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
                            accessToManagement={loggedUser.roles.includes(
                              'ROLE_ADMIN'
                            )}
                          />
                        );
                      }
                    })}
                    {numberItemsShown.sharedPosts <
                      userActivity.sharedPosts.length && (
                      <ExpandListButton
                        fetchMore={() => updateShownItems('sharedPosts')}
                      />
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
                              accessToManagement={loggedUser.roles.includes(
                                'ROLE_ADMIN'
                              )}
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
                              accessToManagement={loggedUser.roles.includes(
                                'ROLE_ADMIN'
                              )}
                            />
                          );
                        }
                      }
                    })}
                    {numberItemsShown.sharedPosts <
                      userActivity.sharedPosts.length && (
                      <ExpandListButton
                        fetchMore={() => updateShownItems('comments')}
                      />
                    )}
                  </TabPanelMUI>
                </TabContext>
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
                        {loggedUser &&
                          (parseInt(selectedUserId) === loggedUser.userId ||
                            isAdmin) && (
                            <Tooltip title="Edytuj informacje" placement="left">
                              <IconButton
                                className={classes.editBaseInformationBtn}
                                onClick={() => setOpenProfileEditionPopup(true)}
                              >
                                <EditIcon color="primary" />
                              </IconButton>
                            </Tooltip>
                          )}
                        <Popup
                          open={openProfileEditionPopup}
                          type="profileForm"
                          title="Zaaktualizuj informacje"
                          onClose={handleCloseProfileEditionForm}
                        >
                          <ProfileEditionForm
                            closePopup={handleCloseProfileEditionForm}
                            editedFirstName={userProfile.firstName}
                            userId={parseInt(selectedUserId)}
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
                        {loggedUser &&
                          parseInt(selectedUserId) === loggedUser.userId && (
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
                        {loggedUser &&
                          (parseInt(selectedUserId) === loggedUser.userId ||
                            isAdmin) &&
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
                              userId={parseInt(selectedUserId)}
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
                          userId={parseInt(selectedUserId)}
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
                              loggedUser &&
                              (parseInt(selectedUserId) === loggedUser.userId ||
                                isAdmin)
                            }
                          />
                        ))}
                      {loggedUser &&
                        parseInt(selectedUserId) === loggedUser.userId && (
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
                            loggedUser &&
                            (parseInt(selectedUserId) === loggedUser.userId ||
                              isAdmin)
                          }
                        />
                      ))}
                      {loggedUser &&
                        parseInt(selectedUserId) === loggedUser.userId && (
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
                                  loggedUser &&
                                  (parseInt(selectedUserId) ===
                                    loggedUser.userId ||
                                    isAdmin) && (
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
                      {loggedUser &&
                        parseInt(selectedUserId) === loggedUser.userId && (
                          <Button
                            color="secondary"
                            variant="text"
                            className={classes.addProfileInfoItemBtn}
                            onClick={() =>
                              setShowInterestForm(!showInterestForm)
                            }
                          >
                            <AddCircleOutlineIcon />
                            <Typography variant="subtitle1" marginLeft="10px">
                              Dodaj zainteresowanie
                            </Typography>
                          </Button>
                        )}
                      {showInterestForm && (
                        <AddInterestForm
                          userId={loggedUser.userId}
                          currentInterests={userInterests}
                          onCloseForm={() => setShowInterestForm(false)}
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
                      {loggedUser &&
                        parseInt(selectedUserId) === loggedUser.userId && (
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
                    <CircularProgress color="secondary" size="240px" />
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
              <div className={classes.imagesList}>
                {userImages &&
                  userImages
                    .slice((imagesPageNumber - 1) * 10, imagesPageNumber * 10)
                    .map((item, index) => (
                      <ModalImage
                        key={index}
                        className={classes.addedImageListItem}
                        small={item.url}
                        medium={item.url}
                        large={item.url}
                        hideZoom
                      />
                    ))}
              </div>
              {userImages.length > 10 && (
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
            <Paper elevation={4} className={classes.friendSectionContainer}>
              <div>
                <Typography variant="h4" className={classes.friendTitle}>
                  Znajomi
                  <span className={classes.friendNumber}>
                    {userFriends.length}
                  </span>
                </Typography>
                <Divider />
                <SearchItemsBox
                  searchbarPlaceholder="Wyszukaj znajomego"
                  updateList={renderFriendsByName}
                  itemsOrder={friendsOrder}
                  handleChangeItemsOrder={handleChangeFriendsOrder}
                  orderOptions={[
                    'Kolejności alfabetycznej',
                    'Daty dodania',
                    'Ilości znajomych',
                    'Miejsca zamieszkania',
                  ]}
                />
                <Divider />
              </div>
              <div className={classes.friendInformationContainer}>
                {userFriends &&
                  sortFriends(friendsOrder)
                    .slice((friendsPageNumber - 1) * 6, friendsPageNumber * 6)
                    .map((friend) => (
                      <UserInformation
                        key={friend.friendId}
                        name={
                          friend.user.firstName + ' ' + friend.user.lastName
                        }
                        city={friend.address && friend.address.city}
                        userId={friend.user.userId}
                        profilePhoto={friend.user.profilePhoto}
                        friendList={friend.userFriends}
                        updateFriends={updateFriendList}
                      />
                    ))}
                {userFriends.length === 0 && (
                  <Typography variant="h6" className={classes.noFriendsText}>
                    Brak znajomych
                  </Typography>
                )}
              </div>
              {userFriends.length > 6 && (
                <Pagination
                  className={classes.friendsPagination}
                  count={userFriends && Math.ceil(userFriends.length / 6)}
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
            <div style={{ width: '100%' }}>
              <div className={classes.groupsListContainer}>
                {userGroups
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
                      asInformation
                    />
                  ))}
              </div>
              {userGroups.length > 6 && (
                <Paper elevation={4} className={classes.paginationContainer}>
                  <Pagination
                    className={classes.groupsPagination}
                    count={userGroups && Math.ceil(userGroups.length / 6)}
                    color="secondary"
                    size="large"
                    showFirstButton
                    showLastButton
                    page={groupsPageNumber}
                    onChange={handleChangeGroupsPageNumber}
                  />
                </Paper>
              )}
              {userGroups.length === 0 && (
                <div className={classes.noContent}>
                  <Typography variant="h6" fontWeight="bold">
                    Brak grup
                  </Typography>
                </div>
              )}
            </div>
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
