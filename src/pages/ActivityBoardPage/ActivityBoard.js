import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './activityBoard-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import {
  Avatar,
  Divider,
  InputAdornment,
  Link,
  TextField,
} from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import PhotoIcon from '@mui/icons-material/Photo';
import ReceivedInvitation from '../../components/ReceivedInvitation/ReceivedInvitation';
import Post from '../../components/Post/Post';
import Popup from '../../components/Popup/Popup';
import PostForm from '../../components/Forms/PostForm';
import {
  getActivityBoard,
  setLoading,
} from '../../redux/actions/userActivityActions';
import SharedPost from '../../components/SharedPost/SharedPost';
import CircularProgress from '@mui/material/CircularProgress';
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';
import ActivityBoardItem from '../../components/ActivityBoardItem/ActivityBoardItem';
import Event from '../../components/Event/Event';
import Group from '../../components/Group/Group';

const ActivityBoard = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();

  const activityBoard = useSelector((state) => state.activity.board);
  const isLoading = useSelector((state) => state.activity.isLoading);
  const loggedUserProfile = useSelector((state) => state.auth.userProfile);
  const loggedUser = useSelector((state) => state.auth.user);
  const isUserRemember = useSelector((state) => state.auth.remember);
  const loggedUserFriendInvitations = useSelector(
    (state) => state.friends.receivedFriendInvitations
  );

  const [openPostCreation, setOpenPostCreation] = useState(false);
  const [numberItemsShown, setNumberItemsShown] = useState(5);

  const handleClosePostCreation = () => {
    setOpenPostCreation(false);
  };

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
      dispatch(setLoading(true));
      dispatch(getActivityBoard());
    })();
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className={classes.boardContainer}>
          <div className={classes.activityContent}>
            <Paper elevation={4} className={classes.postCreateBox}>
              <Typography fontWeight="bold" variant="h6">
                Utwórz post
              </Typography>
              <Divider className={classes.divider} />
              <div className={classes.postCreateContent}>
                <Avatar
                  src={
                    loggedUserProfile && loggedUserProfile.profilePhoto
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
                  className={classes.userPhoto}
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
            {activityBoard.map((item, index) => {
              if (index < numberItemsShown) {
                if (item.activityType === 'CREATE_POST') {
                  return (
                    <Post
                      key={index}
                      authorId={item.activityAuthor.userId}
                      authorName={
                        item.activityAuthor.firstName +
                        ' ' +
                        item.activityAuthor.lastName
                      }
                      profilePhoto={item.activityAuthor.profilePhoto}
                      createdDate={new Date(item.activityDate)}
                      images={item.activity.images}
                      likesNumber={item.activity.likes.length}
                      sharesNumber={item.activity.sharing.length}
                      commentsNumber={item.activity.comments.length}
                      comments={item.activity.comments}
                      content={item.activity.text}
                      userStatus={item.activityAuthor.activityStatus}
                      postId={item.activity.postId}
                      likes={item.activity.likes}
                      isEdited={item.activity.isEdited}
                      isPublic={item.activity.isPublic}
                      isCommentingBlocked={item.activity.isCommentingBlocked}
                      editionDate={item.activity.editedAt}
                    />
                  );
                } else if (
                  item.activityType === 'LIKE_POST' ||
                  item.activityType === 'COMMENT_POST'
                ) {
                  return (
                    <Post
                      key={index}
                      authorId={item.activity.post.postAuthor.userId}
                      authorName={
                        item.activity.post.postAuthor.firstName +
                        ' ' +
                        item.activity.post.postAuthor.lastName
                      }
                      profilePhoto={item.activity.post.postAuthor.profilePhoto}
                      createdDate={new Date(item.activity.post.createdAt)}
                      images={item.activity.post.images}
                      likesNumber={item.activity.post.likes.length}
                      sharesNumber={item.activity.post.sharing.length}
                      commentsNumber={item.activity.post.comments.length}
                      comments={item.activity.post.comments}
                      content={item.activity.post.text}
                      userStatus={item.activity.post.postAuthor.activityStatus}
                      postId={item.activity.post.postId}
                      likes={item.activity.post.likes}
                      isEdited={item.activity.post.isEdited}
                      isPublic={item.activity.post.isPublic}
                      isCommentingBlocked={
                        item.activity.post.isCommentingBlocked
                      }
                      editionDate={item.activity.post.editedAt}
                      highlightCommentById={
                        item.activityType === 'COMMENT_POST'
                          ? item.activity.commentId
                          : null
                      }
                      isActivity
                      activityType={item.activityType}
                      activityDate={item.activityDate}
                      activityAuthorName={
                        item.activityAuthor.firstName +
                        item.activityAuthor.lastName
                      }
                      activityAuthorPhoto={item.activityAuthor.profilePhoto}
                    />
                  );
                } else if (
                  item.activityType === 'LIKE_SHARED_POST' ||
                  item.activityType === 'COMMENT_SHARED_POST'
                ) {
                  return (
                    <SharedPost
                      key={index}
                      authorId={item.activity.sharedPost.authorOfSharing.userId}
                      sharedPostId={item.activity.sharedPost.sharedPostId}
                      sharedPost={item.activity.sharedPost.sharedPost}
                      sharingId={item.activity.sharedPost.sharingId}
                      sharingAuthorId={
                        item.activity.sharedPost.authorOfSharing.userId
                      }
                      authorName={
                        item.activity.sharedPost.authorOfSharing.firstName +
                        ' ' +
                        item.activity.sharedPost.authorOfSharing.lastName
                      }
                      profilePhoto={
                        item.activity.sharedPost.authorOfSharing.profilePhoto
                      }
                      userStatus={
                        item.activity.sharedPost.authorOfSharing.activityStatus
                      }
                      text={item.activity.sharedPost.sharingText}
                      date={new Date(item.activity.sharedPost.sharingDate)}
                      isPublic={item.activity.sharedPost.isPublic}
                      isCommentingBlocked={
                        item.activity.sharedPost.isCommentingBlocked
                      }
                      likes={item.activity.sharedPost.sharingLikes}
                      comments={item.activity.sharedPost.sharingComments}
                      highlightCommentById={
                        item.activityType === 'COMMENT_SHARED_POST'
                          ? item.activity.commentId
                          : null
                      }
                      isActivity
                      activityType={item.activityType}
                      activityDate={item.activityDate}
                      activityAuthorName={
                        item.activityAuthor.firstName +
                        ' ' +
                        item.activityAuthor.lastName
                      }
                      activityAuthorPhoto={item.activityAuthor.profilePhoto}
                    />
                  );
                } else if (item.activityType === 'SHARE_POST') {
                  return (
                    <SharedPost
                      key={index}
                      authorId={item.activityAuthor.userId}
                      sharedPostId={item.activity.sharedPostId}
                      sharedPost={item.activity.sharedPost}
                      sharingId={item.activity.sharingId}
                      sharingAuthorId={
                        item.activity.sharedPost.postAuthor.userId
                      }
                      authorName={
                        item.activityAuthor.firstName +
                        ' ' +
                        item.activityAuthor.lastName
                      }
                      profilePhoto={item.activityAuthor.profilePhoto}
                      userStatus={item.activityAuthor.activityStatus}
                      text={item.activity.sharingText}
                      date={new Date(item.activity.sharingDate)}
                      isPublic={item.activity.isPublic}
                      isCommentingBlocked={item.activity.isCommentingBlocked}
                      likes={item.activity.sharingLikes}
                      comments={item.activity.sharingComments}
                    />
                  );
                } else if (item.activityType === 'CREATE_GROUP_POST') {
                  return (
                    <Post
                      key={index}
                      authorId={item.activityAuthor.userId}
                      authorName={
                        item.activityAuthor.firstName +
                        ' ' +
                        item.activityAuthor.lastName
                      }
                      profilePhoto={item.activityAuthor.profilePhoto}
                      createdDate={new Date(item.activityDate)}
                      images={item.activity.images}
                      likesNumber={item.activity.likes.length}
                      sharesNumber={item.activity.sharing.length}
                      commentsNumber={item.activity.comments.length}
                      comments={item.activity.comments}
                      content={item.activity.text}
                      userStatus={item.activityAuthor.activityStatus}
                      postId={item.activity.postId}
                      likes={item.activity.likes}
                      isEdited={item.activity.isEdited}
                      isPublic={item.activity.isPublic}
                      isCommentingBlocked={item.activity.isCommentingBlocked}
                      editionDate={item.activity.editedAt}
                      isGroupPostActivity
                      groupId={item.activity.group.groupId}
                      groupName={item.activity.group.name}
                      groupImage={item.activity.group.image}
                    />
                  );
                } else if (item.activityType === 'CHANGE_PROFILE_PHOTO') {
                  return (
                    <Post
                      key={index}
                      authorId={item.activityAuthor.userId}
                      authorName={
                        item.activityAuthor.firstName +
                        ' ' +
                        item.activityAuthor.lastName
                      }
                      profilePhoto={item.activityAuthor.profilePhoto}
                      createdDate={new Date(item.activityDate)}
                      images={item.activity.changePhotoPost.images}
                      likesNumber={item.activity.changePhotoPost.likes.length}
                      sharesNumber={
                        item.activity.changePhotoPost.sharing.length
                      }
                      commentsNumber={
                        item.activity.changePhotoPost.comments.length
                      }
                      comments={item.activity.changePhotoPost.comments}
                      content={item.activity.changePhotoPost.text}
                      userStatus={item.activityAuthor.activityStatus}
                      postId={item.activity.changePhotoPost.postId}
                      likes={item.activity.changePhotoPost.likes}
                      isEdited={item.activity.changePhotoPost.isEdited}
                      isPublic={item.activity.changePhotoPost.isPublic}
                      isCommentingBlocked={
                        item.activity.changePhotoPost.isCommentingBlocked
                      }
                      editionDate={item.activity.changePhotoPost.editedAt}
                      isChangeProfilePhotoPost
                    />
                  );
                } else if (
                  item.activityType === 'RESPOND_TO_EVENT' ||
                  item.activityType === 'SHARE_EVENT'
                ) {
                  return (
                    <ActivityBoardItem
                      key={index}
                      authorId={item.activityAuthor.userId}
                      authorName={
                        item.activityAuthor.firstName +
                        ' ' +
                        item.activityAuthor.lastName
                      }
                      authorStatus={item.activityAuthor.activityStatus}
                      profilePhoto={item.activityAuthor.profilePhoto}
                      activityDate={new Date(item.activityDate)}
                      activityTitle={
                        item.activityType === 'SHARE_EVENT'
                          ? ' udostępnił(a) wydarzenie'
                          : item.activity.participationStatus === 'TAKE_PART'
                          ? ' bierze udział w wydarzeniu'
                          : ' interesuje się wydarzeniem'
                      }
                    >
                      <Event
                        eventId={item.activity.event.eventId}
                        title={item.activity.event.title}
                        date={item.activity.event.eventDate}
                        eventImage={item.activity.event.image}
                        address={item.activity.event.eventAddress}
                        members={item.activity.event.members}
                        activityItem
                      />
                    </ActivityBoardItem>
                  );
                } else if (item.activityType === 'JOIN_TO_GROUP') {
                  return (
                    <ActivityBoardItem
                      key={index}
                      authorId={item.activityAuthor.userId}
                      authorName={
                        item.activityAuthor.firstName +
                        ' ' +
                        item.activityAuthor.lastName
                      }
                      authorStatus={item.activityAuthor.activityStatus}
                      profilePhoto={item.activityAuthor.profilePhoto}
                      activityDate={new Date(item.activityDate)}
                      activityTitle={' dołączył(a) do grupy'}
                    >
                      <Group
                        groupId={item.activity.group.groupId}
                        name={item.activity.group.name}
                        interests={item.activity.group.interests}
                        groupCreationDate={item.activity.group.createdAt}
                        membersNumber={item.activity.group.members.length}
                        members={item.activity.group.members}
                        postsNumber={item.activity.group.postsNumber}
                        groupImage={item.activity.group.image}
                        activityItem
                      />
                    </ActivityBoardItem>
                  );
                }
              }
            })}
            {numberItemsShown < activityBoard.length && (
              <div
                className={classes.moreItemsContainer}
                onClick={() => setNumberItemsShown(numberItemsShown + 5)}
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
          <div className={classes.infoContent}>
            <Paper elevation={4} className={classes.activityInvitationInfo}>
              <Typography fontWeight="bold" variant="h6">
                Zaproszenia do znajomych
              </Typography>
              {loggedUserFriendInvitations.map((friendInvitation) => (
                <ReceivedInvitation
                  key={friendInvitation.friendId}
                  friendInvitation
                  inviterId={friendInvitation.invitingUser.userId}
                  inviterName={
                    friendInvitation.invitingUser.firstName +
                    ' ' +
                    friendInvitation.invitingUser.lastName
                  }
                  inviterPhoto={friendInvitation.invitingUser.profilePhoto}
                />
              ))}
              {loggedUserFriendInvitations.length === 0 && (
                <Typography marginTop="10px" variant="subtitle2">
                  Brak zaproszeń
                </Typography>
              )}
            </Paper>
          </div>
        </div>
      ) : (
        <div className={classes.loadingContainer}>
          <CircularProgress color="secondary" size="240px" />
        </div>
      )}
    </>
  );
};

ActivityBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActivityBoard);
