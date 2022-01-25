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
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import { PhotoCamera } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import TabPanelMUI from '@mui/lab/TabPanel';
import PhotoIcon from '@mui/icons-material/Photo';
import Popup from '../../components/Popup/Popup';
import PostForm from '../../components/Forms/PostForm';
import {
  deleteUserInterests,
  getUserActivity,
  getUserFavouriteItems,
  getUserInterests,
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
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const TabPanel = (props) => {
  const { children, value, classes, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className={classes.tabContent}>{children}</div>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const testedData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
];

const relationshipStatusTypes = {
  SINGLE: 'Bez związku',
  IN_RELATIONSHIP: 'W związku',
  ENGAGED: 'Zaręczony(a)',
  MARRIED: 'W związku małżeńskim',
};

const favouriteTypes = {
  BOOK: 'BOOK',
  FILM: 'FILM',
  ACTOR: 'ACTOR',
  MUSIC: 'MUSIC',
  BAND: 'BAND',
  QUOTE: 'QUOTE',
  TV_SHOW: 'TV_SHOW',
  SPORT: 'SPORT',
  SPORT_TEAM: 'SPORT_TEAM',
};

const ProfilePage = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);
  const userActivity = useSelector((state) => state.profile.userActivity);
  const userFavourites = useSelector((state) => state.profile.userFavourites);
  const user = useSelector((state) => state.auth.user);
  const userInterests = useSelector((state) => state.profile.userInterests);

  const history = useHistory();

  const { profileUserId } = useParams();

  const [profileNav, setProfileNav] = useState(0);
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
  const [showUserInterestForm, setShowUserInterestForm] = useState(false);

  useEffect(() => {
    if (user === null) {
      history.push('/auth/login');
    }
    dispatch(getUserActivity(user.userId));
    dispatch(getUserFavouriteItems(user.userId));
    dispatch(getUserInterests(user.userId));
  }, []);

  const handleCloseAddSchoolPopup = () => {
    setOpenAddSchoolPopup(false);
  };

  const handleCloseAddWorkPopup = () => {
    setOpenAddWorkPopup(false);
  };

  const handleChangeProfileNav = (event, newValue) => {
    setProfileNav(newValue);
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

  return (
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
          <label
            htmlFor="icon-button-file"
            className={classes.uploadCoverImageBtn}
          >
            <Input
              accept="image/*"
              style={{ display: 'none' }}
              id="icon-button-file"
              type="file"
            />
            <Tooltip title="Edytuj tło" placement="top">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                size="large"
              >
                <PhotoCamera />
              </IconButton>
            </Tooltip>
          </label>
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
            <label
              htmlFor="icon-button-file"
              className={classes.uploadCoverImageBtn}
            >
              <Input
                accept="image/*"
                style={{ display: 'none' }}
                id="icon-button-file"
                type="file"
              />
              <Tooltip title="Zmień zdjęcie profilowe" placement="top">
                <IconButton
                  aria-label="upload picture"
                  component="span"
                  size="large"
                >
                  <PhotoCamera />
                </IconButton>
              </Tooltip>
            </label>
          </div>
          <div className={classes.profileInfoText}>
            {userProfile && (
              <div>
                <Typography fontSize="37px" fontWeight={400}>
                  {userProfile.firstName + ' ' + userProfile.lastName}
                </Typography>
                <Typography variant="h6">{userProfile.email}</Typography>
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
          value={profileNav}
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
            {...a11yProps(0)}
            label="Aktywność"
          />
          <Tab
            className={classes.tabItem}
            {...a11yProps(1)}
            label="Informacje"
          />
          <Tab className={classes.tabItem} {...a11yProps(2)} label="Zdjęcia" />
          <Tab className={classes.tabItem} {...a11yProps(3)} label="Znajomi" />
          <Tab className={classes.tabItem} {...a11yProps(4)} label="Grupy" />
        </Tabs>
      </Paper>
      <TabPanel classes={classes} value={profileNav} index={0}>
        <div className={classes.leftActivityContent}>
          <Paper elevation={4} sx={{ borderRadius: '10px' }}>
            <div className={classes.profileInfoBoxHeading}>
              <Typography variant="h6">Znajomi użytkownika</Typography>
              <Link
                component="button"
                variant="subtitle1"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
                Zobacz więcej
              </Link>
            </div>
            <div className={classes.profileInfoBoxContent}>
              <ImageList cols={3} rowHeight={155} sx={{ margin: 0 }}>
                {testedData.map((item, index) => {
                  if (index < 9) {
                    return (
                      <ImageListItem
                        key={item.img}
                        className={classes.imageListItemBox}
                      >
                        <img
                          src={`${item.img}?w=248&fit=crop&auto=format`}
                          alt={item.title}
                          loading="lazy"
                        />
                        <ImageListItemBar
                          title={
                            <Typography
                              variant="body1"
                              className={classes.imageListItemTitle}
                            >
                              Tester <br /> Testerowski
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
          <Paper elevation={4} sx={{ borderRadius: '10px' }}>
            <div className={classes.profileInfoBoxHeading}>
              <Typography variant="h6">Dodane zdjęcia</Typography>
              <Link
                component="button"
                variant="subtitle1"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
                Zobacz więcej
              </Link>
            </div>
            <div className={classes.profileInfoBoxContent}>
              <ImageList cols={3} rowHeight={120} sx={{ margin: 0 }}>
                {testedData.map((item, index) => {
                  if (index < 9) {
                    return (
                      <ImageListItem
                        key={item.img}
                        className={classes.imageListItemBox}
                      >
                        <img
                          src={`${item.img}?w=248&fit=crop&auto=format`}
                          alt={item.title}
                          loading="lazy"
                        />
                      </ImageListItem>
                    );
                  }
                })}
              </ImageList>
            </div>
          </Paper>
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
                          ? userProfile.firstName + ' ' + userProfile.lastName
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
                {numberItemsShown.posts < userActivity.createdPosts.length && (
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
                          sharesNumber={comment.commentedPost.sharing.length}
                          commentsNumber={comment.commentedPost.comments.length}
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
                          sharedPost={comment.commentedSharedPost.sharedPost}
                          sharingId={comment.commentedSharedPost.sharingId}
                          sharingAuthorId={
                            comment.commentedSharedPost.authorOfSharing.userId
                          }
                          authorName={
                            comment.commentedSharedPost.authorOfSharing
                              .firstName +
                            ' ' +
                            comment.commentedSharedPost.authorOfSharing.lastName
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
                            new Date(comment.commentedSharedPost.sharingDate)
                          }
                          isPublic={comment.commentedSharedPost.isPublic}
                          isCommentingBlocked={
                            comment.commentedSharedPost.isCommentingBlocked
                          }
                          likes={comment.commentedSharedPost.sharingLikes}
                          comments={comment.commentedSharedPost.sharingComments}
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
      <TabPanel classes={classes} value={profileNav} index={1}>
        <Paper elevation={4} className={classes.profileInformationContainer}>
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
                  <div className={classes.profileInformationHeadingWithAction}>
                    <Typography variant="h5">Podstawowe informacje</Typography>
                    <Tooltip title="Edytuj informacje" placement="left">
                      <IconButton
                        className={classes.editBaseInformationBtn}
                        onClick={() => history.push('/app/settings/profile')}
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <ProfileInformationItem
                    title="Imię i nazwisko"
                    content={userProfile.firstName + ' ' + userProfile.lastName}
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
                    content={userProfile.job !== null ? userProfile.job : '-'}
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
                  <div className={classes.profileInformationHeadingWithAction}>
                    <Typography variant="h5">Dane kontaktowe</Typography>
                    <Tooltip title="Edytuj Adres" placement="left">
                      <IconButton
                        className={classes.editBaseInformationBtn}
                        onClick={() => history.push('/app/settings/address')}
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <ProfileInformationItem
                    title="Adres email"
                    content={userProfile.email}
                  />
                  <ProfileInformationItem
                    title="Numer telefonu"
                    content={userProfile.phoneNumber}
                  />
                  <Typography
                    variant="h5"
                    sx={{ marginTop: '15px' }}
                    className={classes.profileInformationHeading}
                  >
                    Adres zamieszkania
                  </Typography>
                  <ProfileInformationItem
                    title="Państwo"
                    content={
                      userProfile.address !== null
                        ? userProfile.address.country
                        : '-'
                    }
                  />
                  <ProfileInformationItem
                    title="Miasto"
                    content={
                      userProfile.address !== null
                        ? userProfile.address.city
                        : '-'
                    }
                  />
                  <ProfileInformationItem
                    title="Ulica"
                    content={
                      userProfile.address !== null
                        ? userProfile.address.street
                        : '-'
                    }
                  />
                  <ProfileInformationItem
                    title="Kod pocztowy"
                    content={
                      userProfile.address !== null
                        ? userProfile.address.zipCode
                        : '-'
                    }
                  />
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
                      />
                    ))}
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
                    />
                  ))}
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
                    <AddWorkPlaceForm closePopup={handleCloseAddWorkPopup} />
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
                  <List className={classes.userInterestList}>
                    {userInterests.map((userInterest) => (
                      <ListItem
                        key={userInterest.interestId}
                        disableGutters
                        secondaryAction={
                          <IconButton
                            onClick={() =>
                              handleClickDeleteUserInterest(
                                userInterest.interestId
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
                              {userInterest.name}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    color="secondary"
                    variant="text"
                    className={classes.addProfileInfoItemBtn}
                    onClick={() =>
                      setShowUserInterestForm(!showUserInterestForm)
                    }
                  >
                    <AddCircleOutlineIcon />
                    <Typography variant="subtitle1" marginLeft="10px">
                      Dodaj zainteresowanie
                    </Typography>
                  </Button>
                  {showUserInterestForm && (
                    <AddUserInterestForm
                      userId={user.userId}
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
                        favourites={userFavourites.filter(
                          (favourite) => favourite.favouriteType === 'BOOK'
                        )}
                      />
                      <UserFavouriteItemList
                        favourites={userFavourites.filter(
                          (favourite) => favourite.favouriteType === 'FILM'
                        )}
                      />
                      <UserFavouriteItemList
                        favourites={userFavourites.filter(
                          (favourite) => favourite.favouriteType === 'ACTOR'
                        )}
                      />
                      <UserFavouriteItemList
                        favourites={userFavourites.filter(
                          (favourite) => favourite.favouriteType === 'MUSIC'
                        )}
                      />
                      <UserFavouriteItemList
                        favourites={userFavourites.filter(
                          (favourite) => favourite.favouriteType === 'BAND'
                        )}
                      />
                      <UserFavouriteItemList
                        favourites={userFavourites.filter(
                          (favourite) => favourite.favouriteType === 'QUOTE'
                        )}
                      />
                      <UserFavouriteItemList
                        favourites={userFavourites.filter(
                          (favourite) => favourite.favouriteType === 'TV_SHOW'
                        )}
                      />
                      <UserFavouriteItemList
                        favourites={userFavourites.filter(
                          (favourite) => favourite.favouriteType === 'SPORT'
                        )}
                      />
                      <UserFavouriteItemList
                        favourites={userFavourites.filter(
                          (favourite) =>
                            favourite.favouriteType === 'SPORT_TEAM'
                        )}
                      />
                    </>
                  )}
                  <Button
                    color="secondary"
                    variant="text"
                    className={classes.addProfileInfoItemBtn}
                    onClick={() => setShowFavouriteForm(!showFavouriteForm)}
                  >
                    <AddCircleOutlineIcon />
                    <Typography variant="subtitle1" marginLeft="10px">
                      Dodaj ulubione
                    </Typography>
                  </Button>
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
      <TabPanel classes={classes} value={profileNav} index={2}>
        Znajomi
      </TabPanel>
      <TabPanel classes={classes} value={profileNav} index={2}>
        Grupy
      </TabPanel>
    </div>
  );
};

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePage);
