import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './activityBoard-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import { Avatar, Divider, InputAdornment, TextField } from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import PhotoIcon from '@mui/icons-material/Photo';
import FriendInvitation from '../../components/FriendInvitation/FriendInvitation';
import Post from '../../components/Post/Post';
import Popup from '../../components/Popup/Popup';
import PostForm from '../../components/Forms/PostForm';
import { getActivityBoard } from '../../redux/actions/userActivityActions';
import SharedPost from '../../components/SharedPost/SharedPost';

const ActivityBoard = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();
  const activityBoard = useSelector((state) => state.activity.board);
  const userProfile = useSelector((state) => state.profile.userProfile);

  const [openPostCreation, setOpenPostCreation] = useState(false);

  const handleClosePostCreation = () => {
    setOpenPostCreation(false);
  };

  useEffect(() => {
    dispatch(getActivityBoard());
  }, []);

  return (
    <div className={classes.boardContainer}>
      <div className={classes.activityContent}>
        <div className={classes.activityWrapper}>
          <Paper
            elevation={4}
            sx={{ borderRadius: '10px' }}
            className={classes.postCreateBox}
          >
            <Typography fontWeight="bold" variant="h6">
              {' '}
              Utwórz post
            </Typography>
            <Divider className={classes.divider} />
            <div className={classes.postCreateContent}>
              <Avatar
                src={
                  userProfile ? userProfile.profilePhoto.url : defaultUserPhoto
                }
                alt={
                  userProfile
                    ? userProfile.firstName + ' ' + userProfile.lastName
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
          {activityBoard.map((item, id) => {
            if (item.activityType === 'CREATE_POST') {
              return (
                <Post
                  key={id}
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
            } else if (item.activityType === 'SHARE_POST') {
              return (
                <SharedPost
                  key={id}
                  sharedPostId={item.activity.sharedPostId}
                  sharedPost={item.activity.sharedPost}
                  sharingId={item.activity.sharingId}
                  sharingAuthorId={item.activityAuthor.userId}
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
            }
          })}
        </div>
      </div>
      <div className={classes.infoContent}>
        <div className={classes.infoWrapper}>
          <Paper
            elevation={4}
            sx={{ borderRadius: '10px' }}
            style={{ padding: '15px' }}
          >
            <Typography fontWeight="bold" variant="h6">
              Zaproszenia do znajomych
            </Typography>
            <FriendInvitation name="Roman Romanowicz" />
            <FriendInvitation name="Ewa Ewakowska" />
            <FriendInvitation name="Tomasz Tomkowski" />
            <FriendInvitation name="Florian Flor" />
            <FriendInvitation name="Bartek Bartkowski" />
          </Paper>
        </div>
      </div>
    </div>
  );
};

ActivityBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActivityBoard);
