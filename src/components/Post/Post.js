import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { withStyles } from '@mui/styles';
import styles from './post-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import {
  Button,
  Divider,
  ImageList,
  ImageListItem,
  TextField,
} from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CloseIcon from '@mui/icons-material/Close';

const formatPostTime = (createdDate) => {
  let diffInMs = (new Date().getTime() - createdDate.getTime()) / 1000;
  let minutes = diffInMs / 60;

  if (minutes < 5) {
    return 'kilka minut temu';
  } else if (minutes >= 60 && minutes < 90) {
    return '1 godz. temu';
  } else if (minutes >= 120 && minutes < 150) {
    return '2 godz. temu';
  } else if (minutes >= 180 && minutes < 210) {
    return '3 godz. temu';
  } else if (minutes >= 240 && minutes < 270) {
    return '4 godz. temu';
  } else if (minutes >= 270 && minutes < 1440) {
    return 'kilka godz. temu';
  } else if (minutes >= 1440 && minutes < 1560) {
    return '1 dzień temu';
  } else if (minutes >= 2880 && minutes < 3000) {
    return '2 dni temu';
  } else if (minutes >= 4320 && minutes < 4440) {
    return '3 dni temu';
  } else {
    return 'kilka dni temu';
  }
};

const Post = (props) => {
  const {
    classes,
    authorName,
    createdDate,
    content,
    images,
    likesNumber,
    commentsNumber,
    sharesNumber,
  } = props;

  return (
    <Paper
      elevation={7}
      sx={{ borderRadius: '10px' }}
      className={classes.postContainer}
    >
      <div className={classes.authorContainer}>
        <img
          src={defaultUserPhoto}
          alt="Zdjęcie użytkownika"
          className={classes.userPhoto}
        />
        <div>
          <Typography variant="subtitle1" component="div" fontWeight="bold">
            {authorName}
            <span className={classes.actionName}> dodał nowy wpis</span>
          </Typography>
          <Typography variant="body2" component="div">
            {formatPostTime(createdDate)}
          </Typography>
        </div>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.postContent}>
        <Typography variant="body1" component="div">
          {content}
        </Typography>
      </div>
      {images.length !== 0 && (
        <ImageList cols={1} rowHeight={300} className={classes.postImageList}>
          {images.map((img, index) => (
            <ImageListItem key={index} className={classes.uploadImageItem}>
              <img
                key={index}
                src={img.url}
                srcSet={img.url}
                alt={img.filename}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <Divider className={classes.divider} />
      <div className={classes.postReactionContainer}>
        <Typography
          variant="subtitle2"
          component="div"
          className={classes.postReactionItem}
        >
          <ThumbUpAltOutlinedIcon
            sx={{ fontSize: '35px', marginRight: '6px' }}
          />
          {'Lubię to | ' + likesNumber}
        </Typography>
        <Typography
          variant="subtitle2"
          component="div"
          className={classes.postReactionItem}
        >
          <ChatBubbleOutlineOutlinedIcon
            sx={{ fontSize: '35px', marginRight: '6px' }}
          />
          {'Komentarze | ' + commentsNumber}
        </Typography>
        <Typography
          variant="subtitle2"
          component="div"
          className={classes.postReactionItem}
        >
          <ShareOutlinedIcon sx={{ fontSize: '35px', marginRight: '6px' }} />
          {'Udostępnienia | ' + sharesNumber}
        </Typography>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.commentContainer}>
        <img
          src={defaultUserPhoto}
          alt="Zdjęcie użytkownika"
          className={classes.userPhotoSmall}
        />
        <TextField
          fullWidth
          placeholder="Napisz komentarz"
          multiline
          rows={2}
          className={classes.commentInput}
        />
      </div>
    </Paper>
  );
};

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  authorName: PropTypes.string.isRequired,
  createdDate: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  likesNumber: PropTypes.number.isRequired,
  commentsNumber: PropTypes.number.isRequired,
  sharesNumber: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Post);
