import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './postCreationBox-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import { Avatar, Divider, InputAdornment, TextField } from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import Paper from '@mui/material/Paper';
import PhotoIcon from '@mui/icons-material/Photo';
import Popup from '../Popup/Popup';
import PostForm from '../Forms/PostForm';

const PostCreationBox = (props) => {
  const { classes, profilePhoto, userNameAndSurname, groupId } = props;

  const [openPostCreationPopup, setOpenPostCreationPopup] = useState(false);

  const handleClosePostCreation = () => {
    setOpenPostCreationPopup(false);
  };

  return (
    <Paper elevation={4} className={classes.container}>
      <Typography fontWeight="bold" variant="h6">
        Utwórz post
      </Typography>
      <Divider className={classes.divider} />
      <div className={classes.postCreationContent}>
        <Avatar
          src={profilePhoto ? profilePhoto.url : defaultUserPhoto}
          alt={
            userNameAndSurname ? userNameAndSurname : 'Zalogowany użytkownik'
          }
          className={classes.userPhoto}
        />
        <TextField
          fullWidth
          placeholder="Napisz coś tutaj..."
          multiline
          rows={2}
          className={classes.postInput}
          onClick={() => setOpenPostCreationPopup(true)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PhotoIcon className={classes.photoIcon} />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Popup
        open={openPostCreationPopup}
        type="post"
        title="Utwórz post"
        onClose={handleClosePostCreation}
      >
        <PostForm
          closePopup={handleClosePostCreation}
          groupPost={groupId !== undefined}
          groupId={groupId}
        />
      </Popup>
    </Paper>
  );
};

PostCreationBox.propTypes = {
  classes: PropTypes.object.isRequired,
  userNameAndSurname: PropTypes.string.isRequired,
  profilePhoto: PropTypes.object,
  groupId: PropTypes.number,
};

export default withStyles(styles)(PostCreationBox);
