import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './form-jss';
import { PropTypes } from 'prop-types';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { sharePost } from '../../redux/actions/postActions';
import { showNotification } from '../../redux/actions/notificationActions';

const SharePostForm = (props) => {
  const { classes, basePostId, closePopup } = props;

  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.selectedProfile.userProfile);

  const [sharedText, setSharedText] = useState('');
  const [sharedPostIsPublic, setSharedPostIsPublic] = useState(false);
  const [sharedPostCommentsIsBlocked, setSharedPostCommentsIsBlocked] =
    useState(false);

  const handleSharedTextChange = (event) => {
    setSharedText(event.target.value);
  };

  const handleChangeSharedAccess = (event) => {
    setSharedPostIsPublic(event.target.value);
  };

  const handleChangeCommentsAccessInShared = (event) => {
    setSharedPostCommentsIsBlocked(event.target.value);
  };

  const handleSharePost = () => {
    const outerPost = {
      text: sharedText,
      isPublic: sharedPostIsPublic,
      isCommentingBlocked: sharedPostCommentsIsBlocked,
    };
    console.log(outerPost);
    if (sharedText !== '') {
      dispatch(sharePost(basePostId, outerPost));
      closePopup();
    } else {
      dispatch(showNotification('warning', 'Podaj treść udostępnienia'));
    }
  };

  return (
    <div className={classes.postFormContainer}>
      <div className={classes.postFormContent}>
        <Avatar
          src={userProfile ? userProfile.profilePhoto.url : defaultUserPhoto}
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
          rows={4}
          autoFocus
          className={classes.postInput}
          value={sharedText}
          onChange={handleSharedTextChange}
        />
      </div>
      <Divider />
      <div className={classes.postFormAction}>
        <div className={classes.accessPostContainer}>
          <Typography variant="subtitle1" style={{ marginRight: '20px' }}>
            Dostępność:
          </Typography>
          <FormControl className={classes.accessPostSelect}>
            <Select
              value={sharedPostIsPublic}
              onChange={handleChangeSharedAccess}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={true}>Wszyscy użytkownicy</MenuItem>
              <MenuItem value={false}>Znajomi użytkownika</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.accessPostContainer}>
          <Typography variant="subtitle1" style={{ marginRight: '20px' }}>
            Komentowanie:
          </Typography>
          <FormControl className={classes.accessPostSelect}>
            <Select
              value={sharedPostCommentsIsBlocked}
              onChange={handleChangeCommentsAccessInShared}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={true}>Wyłączone</MenuItem>
              <MenuItem value={false}>Włączone</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Divider />
      <Button
        variant="contained"
        color="secondary"
        className={classes.publishPostBtn}
        onClick={handleSharePost}
      >
        Udostępnij post
      </Button>
    </div>
  );
};

SharePostForm.propTypes = {
  classes: PropTypes.object.isRequired,
  basePostId: PropTypes.number.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default withStyles(styles)(SharePostForm);
