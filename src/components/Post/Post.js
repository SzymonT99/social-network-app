import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { withStyles } from '@mui/styles';
import styles from './post-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import {
  Badge,
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
import { dislikePost, likePost } from '../../redux/actions/postActions';
import { useDispatch, useSelector } from 'react-redux';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const formatPostTime = (createdDate) => {
  let diffInMs = (new Date().getTime() - createdDate) / 1000;
  let minutes = Math.floor(diffInMs / 60);

  if (minutes < 5) {
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
  } else if (minutes >= 3000 && minutes < 4440) {
    return '3 dni temu';
  } else {
    return 'kilka dni temu';
  }
};

const Post = (props) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user.userId);

  const postIsLiked = (likes, userId) => {
    let state = false;
    likes.forEach((like) => {
      if (like.likedUser.userId === userId) {
        state = true;
      }
    });
    return state;
  };

  const {
    classes,
    authorName,
    createdDate,
    content,
    images,
    likesNumber,
    commentsNumber,
    sharesNumber,
    userStatus,
    postId,
    likes,
  } = props;

  const activeStatus = {
    ONLINE: '#1CCD16',
    BE_RIGHT_BACK: 'orange',
    BUSY: 'purple',
    OFFLINE: '#FF1C00',
  };

  const postReaction = () => {
    if (!postIsLiked(likes, userId)) {
      dispatch(likePost(postId));
    } else {
      dispatch(dislikePost(postId));
    }
  };

  return (
    <Paper
      elevation={7}
      sx={{ borderRadius: '10px' }}
      className={classes.postContainer}
    >
      <div className={classes.authorContainer}>
        <Badge
          variant="dot"
          overlap="circular"
          sx={{
            marginRight: '20px',
            '& .MuiBadge-badge': {
              backgroundColor: activeStatus[userStatus],
            },
          }}
        >
          <img
            src={defaultUserPhoto}
            alt="Zdjęcie użytkownika"
            className={classes.userPhoto}
          />
        </Badge>
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
        <Button
          onClick={() => postReaction()}
          className={
            postIsLiked(likes, userId)
              ? classes.likedBtnClicked
              : classes.likedBtn
          }
        >
          <Typography
            variant="subtitle2"
            component="div"
            className={classes.postReactionItem}
          >
            {postIsLiked(likes, userId) ? (
              <ThumbUpIcon sx={{ fontSize: '35px', marginRight: '6px' }} />
            ) : (
              <ThumbUpAltOutlinedIcon
                sx={{ fontSize: '35px', marginRight: '6px' }}
              />
            )}
            {'Lubię to | ' + likesNumber}
          </Typography>
        </Button>
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
  createdDate: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  likesNumber: PropTypes.number.isRequired,
  commentsNumber: PropTypes.number.isRequired,
  sharesNumber: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  userStatus: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  likes: PropTypes.array.isRequired,
};

export default withStyles(styles)(Post);
