import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './groupDetailsPage-jss';
import { PropTypes } from 'prop-types';

import { useHistory, useParams } from 'react-router-dom';
import defaultImgLandscape from '../../assets/default-image-landscape.png';
import {
  Avatar,
  AvatarGroup,
  Button,
  Divider,
  InputAdornment,
  Link,
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
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';
import {
  clearGroupData,
  getGroupDetails,
  getGroupInvitations,
  getUsersWantedJoinGroup,
  leaveGroup,
  requestToJoinGroup,
  respondToGroupInvitation,
} from '../../redux/actions/groupActions';
import InfoIcon from '@mui/icons-material/Info';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import PhotoIcon from '@mui/icons-material/Photo';
import Popup from '../../components/Popup/Popup';
import PostForm from '../../components/Forms/PostForm';
import PersonIcon from '@mui/icons-material/Person';
import Post from '../../components/Post/Post';

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

const GroupDetailsPage = (props) => {
  const { classes } = props;

  let { groupId } = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);
  const loggedUserProfile = useSelector((state) => state.auth.userProfile);
  const isUserRemember = useSelector((state) => state.auth.remember);

  const group = useSelector((state) => state.groups.groupDetails);
  const userGroupJoinRequests = useSelector(
    (state) => state.groups.userGroupJoinRequests
  );
  const groupInvitations = useSelector(
    (state) => state.groups.groupInvitations
  );

  const [groupNavIndex, setGroupNavIndex] = useState(0);
  const [openGroupPostCreationPopup, setOpenGroupPostCreationPopup] =
    useState(false);
  const [numberPostsShown, setNumberPostsShown] = useState(5);

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
      dispatch(getGroupDetails(groupId));
      dispatch(getUsersWantedJoinGroup(groupId));
      dispatch(getGroupInvitations());
    })();
  }, [groupId]);

  const generateGroupActionBtn = () => {
    if (
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
          <AddCircleOutlineIcon sx={{ marginRight: '7px' }} />
          Dołącz do grupy
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
          <CheckCircleOutlineIcon sx={{ marginRight: '7px' }} />
          Akceptuj zaproszenie
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          className={classes.groupActionBtn}
          onClick={() => dispatch(leaveGroup(groupId))}
        >
          <HighlightOffIcon sx={{ marginRight: '7px' }} />
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
    return newMembers;
  };

  const handleChangeGroupNav = (event, newValue) => {
    setGroupNavIndex(newValue);
  };

  const handleCloseGroupPostCreationPopup = () => {
    setOpenGroupPostCreationPopup(false);
  };

  return (
    <>
      {group ? (
        <div>
          <Paper elevation={4} className={classes.groupHeadingContainer}>
            <Button
              variant="contained"
              className={classes.backToGroupsBtn}
              onClick={() => history.push('/app/groups')}
            >
              <ArrowBackIcon sx={{ marginRight: '5px' }} />
              Wróć do listy grup
            </Button>
            <img
              src={group.image ? group.image.url : defaultImgLandscape}
              alt="Zdjęcie grupy"
              className={classes.groupImage}
            />
            <div className={classes.groupHeadingContent}>
              <Typography variant="h3" fontWeight={400}>
                {group.name}
              </Typography>
              <Divider sx={{ margin: '10px 0px' }} />
              <div className={classes.groupHeadingDetails}>
                <div>
                  <Typography variant="h6" marginTop="5px">
                    {group.isPublic ? (
                      <span className={classes.alignCenterRowInfo}>
                        <PublicIcon sx={{ marginRight: '8px' }} /> Grupa
                        publiczna
                      </span>
                    ) : (
                      <span className={classes.alignCenterRowInfo}>
                        <LockIcon sx={{ marginRight: '8px' }} /> Grupa prywatna
                      </span>
                    )}
                  </Typography>
                  <Typography
                    variant="h6"
                    marginTop="5px"
                    className={classes.alignCenterRowInfo}
                  >
                    <PeopleIcon sx={{ marginRight: '8px' }} />{' '}
                    {group.members &&
                      'Liczba członków: ' + group.members.length}
                  </Typography>
                </div>
                <div className={classes.alignCenterRowInfo}>
                  <AvatarGroup max={4}>
                    {group.members &&
                      group.members.map((groupMember) => (
                        <Avatar
                          key={groupMember.groupMemberId}
                          alt={
                            groupMember.user.firstName +
                            ' ' +
                            groupMember.user.lastName
                          }
                          src={groupMember.user.profilePhoto.url}
                        />
                      ))}
                  </AvatarGroup>
                  {group.groupCreator &&
                    group.groupCreator.userId !== loggedUser.userId &&
                    generateGroupActionBtn()}
                </div>
              </div>
            </div>
          </Paper>
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
              <Tab className={classes.tabItem} id="tab-friends" label="Forum" />
              <Tab
                className={classes.tabItem}
                id="tab-managment"
                label="Zarządzanie"
                disabled={
                  group.members &&
                  group.members.filter(
                    (member) =>
                      member.user.userId === loggedUser.userId &&
                      member.groupPermissionType !== 'MEMBER'
                  ).length === 0
                }
              />
            </Tabs>
          </Paper>
          <TabPanel classes={classes} value={groupNavIndex} index={0}>
            <div className={classes.leftActivityContent}>
              <Paper elevation={4} sx={{ borderRadius: '10px' }}>
                <div className={classes.groupInfoBoxHeading}>
                  <Typography variant="h6">Informacje o grupie</Typography>
                  <Link
                    component="button"
                    variant="subtitle1"
                    onClick={() => {
                      setGroupNavIndex(1);
                    }}
                  >
                    Zobacz więcej
                  </Link>
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
                        style={{ margin: '5px 0px 0px 0px' }}
                      >
                        <PublicIcon fontSize="medium" /> Grupa puliczna
                      </Typography>
                      <Typography
                        variant="body1"
                        marginLeft="32px"
                        fontWeight={300}
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
                        style={{ margin: '5px 0px 0px 0px' }}
                      >
                        <LockIcon fontSize="medium" /> Grupa prywatna
                      </Typography>
                      <Typography
                        variant="body1"
                        marginLeft="32px"
                        fontWeight={300}
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
                      style={{ margin: '5px 0px 0px 0px' }}
                    >
                      <InfoIcon fontSize="medium" /> Tematyka grupy:
                    </Typography>
                    {group.interests.map((interest) => (
                      <Typography
                        key={interest.interestId}
                        variant="body1"
                        marginLeft="32px"
                        fontWeight={300}
                      >
                        {'• ' + interest.name}
                      </Typography>
                    ))}
                  </div>
                </div>
              </Paper>
              <Paper elevation={4} sx={{ borderRadius: '10px' }}>
                <div className={classes.groupInfoBoxHeading}>
                  <Typography variant="h6">Nowi członkowie</Typography>
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
                <div className={classes.groupInfoBoxContent}>
                  {getNewMembers().map((newMember) => (
                    <div
                      key={newMember.groupMemberId}
                      className={classes.newMemberBox}
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
                      />
                      <Typography variant="subtitle2" marginLeft="20px">
                        <span style={{ fontWeight: 'bold' }}>
                          {newMember.user.firstName +
                            ' ' +
                            newMember.user.lastName}
                        </span>
                        <span className={classes.newMemberAddedDate}>
                          {'dołączył(a) do grupy: ' +
                            new Date(newMember.addedIn)
                              .toJSON()
                              .slice(0, 10)
                              .split('-')
                              .reverse()
                              .join('.')}
                        </span>
                      </Typography>
                    </div>
                  ))}
                </div>
              </Paper>
            </div>
            <div className={classes.rightActivityContent}>
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
                      loggedUserProfile &&
                      loggedUserProfile.profilePhoto !== null
                        ? loggedUserProfile.profilePhoto.url
                        : defaultUserPhoto
                    }
                    alt={
                      loggedUserProfile
                        ? loggedUserProfile.firstName +
                          ' ' +
                          loggedUserProfile.lastName
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
                    onClick={() => setOpenGroupPostCreationPopup(true)}
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
                open={openGroupPostCreationPopup}
                type="post"
                title="Utwórz post w grupie"
                onClose={handleCloseGroupPostCreationPopup}
              >
                <PostForm
                  closePopup={handleCloseGroupPostCreationPopup}
                  groupPost
                  groupId={parseInt(groupId)}
                />
              </Popup>
              {group.posts.map((post, index) => {
                if (index < numberPostsShown) {
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
              {numberPostsShown < group.posts.length && (
                <div
                  className={classes.moreItemsContainer}
                  onClick={() => setNumberPostsShown(numberPostsShown + 5)}
                >
                  <Link
                    component="button"
                    variant="subtitle2"
                    className={classes.moreCommentsLink}
                  >
                    Zobacz więcej
                  </Link>
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

GroupDetailsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupDetailsPage);
