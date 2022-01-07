import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './form-jss';
import { PropTypes } from 'prop-types';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import PhotoIcon from '@mui/icons-material/Photo';

const PostForm = (props) => {
  const { classes } = props;

  const [isPublic, setIsPublic] = useState(false);

  const handleChangeAccess = (event) => {
    setIsPublic(event.target.value);
  };

  return (
    <div className={classes.postFormContainer}>
      <div className={classes.postFormContent}>
        <img
          src={defaultUserPhoto}
          alt="Zdjęcie użytkownika"
          className={classes.userPhoto}
        />
        <TextField
          fullWidth
          placeholder="Napisz coś tutaj..."
          multiline
          rows={5}
          autoFocus
          className={classes.postInput}
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
              value={isPublic}
              onChange={handleChangeAccess}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={true}>Wszyscy użytkownicy</MenuItem>
              <MenuItem value={false}>Znajomi użytkownika</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          startIcon={<PhotoIcon />}
          variant="contained"
          color="primary"
          className={classes.uploadImageToPostBtn}
        >
          Zdjęcie/Obraz
        </Button>
      </div>
      <Divider />
      <Button
        variant="contained"
        color="secondary"
        className={classes.publishPostBtn}
      >
        Opublikuj post
      </Button>
    </div>
  );
};

PostForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostForm);
