import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { withStyles } from '@mui/styles';
import styles from './post-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Post/Post';

const formatPostTime = (createdDate) => {
  let diffInMs = (new Date().getTime() - createdDate.getTime()) / 1000;
  let minutes = Math.floor(diffInMs / 60);

  if (minutes < 30) {
    return 'kilka minut temu';
  } else if (minutes < 90) {
    return '1 godz. temu';
  } else if (minutes >= 90 && minutes < 150) {
    return '2 godz. temu';
  } else if (minutes >= 150 && minutes < 210) {
    return '3 godz. temu';
  } else if (minutes >= 210 && minutes < 270) {
    return '4 godz. temu';
  } else if (minutes >= 270 && minutes < 1440) {
    return 'kilka godz. temu';
  } else if (minutes >= 1440 && minutes < 1560) {
    return '1 dzień temu';
  } else if (minutes >= 1560 && minutes < 3000) {
    return '2 dni temu';
  } else if (minutes >= 3000 && minutes < 3100) {
    return '3 dni temu';
  } else {
    let day = createdDate.getDate();
    let month = createdDate.getMonth() + 1;
    let year = createdDate.getFullYear();
    let hour = createdDate.getHours();
    let minutes = createdDate.getMinutes();
    return (
      (day <= 9 ? '0' + day : day) +
      '.' +
      (month <= 9 ? '0' + month : month) +
      '.' +
      year +
      ' r. ' +
      (hour <= 9 ? '0' + hour : hour) +
      ':' +
      (minutes <= 9 ? '0' + minutes : minutes)
    );
  }
};

const SharedPost = (props) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user.userId);
  const userProfile = useSelector((state) => state.profile.userProfile);

  const { classes } = props;

  const activeStatus = {
    ONLINE: '#1CCD16',
    BE_RIGHT_BACK: 'orange',
    BUSY: 'purple',
    OFFLINE: '#FF1C00',
  };

  return (
    <Paper
      elevation={7}
      sx={{ borderRadius: '10px' }}
      className={classes.sharedPostContainer}
    >
      <Post
        key={item.activity.postId}
        authorName={
          item.activityAuthor.firstName + ' ' + item.activityAuthor.lastName
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
    </Paper>
  );
};

SharedPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SharedPost);
