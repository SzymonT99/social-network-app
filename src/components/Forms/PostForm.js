import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './form-jss';
import { PropTypes } from 'prop-types';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import {
  Button,
  Divider,
  FormControl,
  ImageList,
  ImageListItem,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import PhotoIcon from '@mui/icons-material/Photo';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/actions/postActions';

const PostForm = (props) => {
  const { classes, closePopup } = props;

  const dispatch = useDispatch();

  const [isPublic, setIsPublic] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);

  const imagesInputRef = useRef(null);

  const handleChangeAccess = (event) => {
    setIsPublic(event.target.value);
  };

  const handlePostChange = (event) => {
    setPostContent(event.target.value);
  };

  const publishPost = () => {
    const formData = new FormData();

    if (uploadedImages.length !== 0) {
      for (let i = 0; i < uploadedImages.length; i++) {
        formData.append('images', uploadedImages[i]);
      }
    } else {
      formData.append('images', null);
    }

    const post = {
      text: postContent,
      isPublic: isPublic.toString(),
      isCommentingBlocked: 'false',
    };

    formData.append(
      'post',
      new Blob([JSON.stringify(post)], {
        type: 'application/json',
      })
    );

    dispatch(createPost(formData));
    closePopup();
  };

  const selectFiles = (event) => {
    let images = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }

    setDisplayedImages(images);
    setUploadedImages(event.target.files);
  };

  const deleteImage = (deletedImg) => {
    let currentImages = displayedImages.filter((img) => img !== deletedImg);
    setDisplayedImages(currentImages);
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
          rows={4}
          autoFocus
          className={classes.postInput}
          value={postContent}
          onChange={handlePostChange}
        />
      </div>
      {displayedImages.length !== 0 && (
        <ImageList
          cols={displayedImages.length === 1 ? 1 : 2}
          rowHeight={300}
          className={classes.postImageList}
        >
          {displayedImages.map((img, index) => (
            <ImageListItem key={index} className={classes.uploadImageItem}>
              <img
                key={index}
                src={img}
                srcSet={img}
                alt="Dodane zdjęcie"
                loading="lazy"
              />
              <Button
                className={classes.uploadImageDeleteBtn}
                onClick={() => deleteImage(img)}
              >
                <CloseIcon />
              </Button>
            </ImageListItem>
          ))}
        </ImageList>
      )}
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
          onClick={() => imagesInputRef.current.click()}
        >
          Zdjęcie/Obraz
        </Button>
        <input
          style={{ display: 'none' }}
          type="file"
          id="multi"
          ref={imagesInputRef}
          multiple
          accept="image/*"
          onChange={selectFiles}
        />
      </div>
      <Divider />
      <Button
        variant="contained"
        color="secondary"
        className={classes.publishPostBtn}
        onClick={publishPost}
      >
        Opublikuj post
      </Button>
    </div>
  );
};

PostForm.propTypes = {
  classes: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default withStyles(styles)(PostForm);
