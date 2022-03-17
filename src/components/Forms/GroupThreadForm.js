import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './form-jss';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import defaultEventImgLandscape from '../../assets/default-event-photo-landscape.png';
import { Button, Divider, Grid, TextField } from '@mui/material';
import {
  createGroupThread,
  editGroupThread,
} from '../../redux/actions/groupActions';

const GroupThreadForm = (props) => {
  const {
    classes,
    closePopup,
    groupId,
    edition,
    threadId,
    editedTitle,
    editedContent,
    threadImage,
  } = props;

  const dispatch = useDispatch();

  const [displayedImage, setDisplayedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const imageInputRef = useRef(null);

  const convertUrlToFile = (filename, url, type) => {
    fetch(url).then(async (response) => {
      const blob = await response.blob();
      const file = new File([blob], filename, {
        type: type,
      });
      setUploadedImage(file);
    });
  };

  useEffect(() => {
    if (edition && threadImage !== null) {
      convertUrlToFile(threadImage.filename, threadImage.url, threadImage.type);
      setDisplayedImage(threadImage.url);
    }
  }, []);

  const validationSchema = yup.object({
    title: yup
      .string()
      .required('Tytuł jest wymagany')
      .max(100, 'Tytuł powinien mieć długość maksymalnie 100 znaków'),
    content: yup.string().required('Zawartość jest wymagana'),
  });

  const formik = useFormik({
    initialValues: {
      title: !edition ? '' : editedTitle,
      content: !edition ? '' : editedContent,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      if (uploadedImage !== null) {
        formData.append('image', uploadedImage);
      } else {
        formData.append('image', null);
      }

      const groupThread = {
        title: values.title,
        content: values.content,
      };

      formData.append(
        'thread',
        new Blob([JSON.stringify(groupThread)], {
          type: 'application/json',
        })
      );

      if (!edition) {
        dispatch(createGroupThread(groupId, formData));
      } else {
        dispatch(editGroupThread(groupId, threadId, formData));
      }

      closePopup();
    },
  });

  const selectImage = (event) => {
    setDisplayedImage(URL.createObjectURL(event.target.files[0]));
    setUploadedImage(event.target.files[0]);
  };

  const deleteEventImage = () => {
    setDisplayedImage(null);
    setUploadedImage(null);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <Grid container columnSpacing={{ xs: 2 }}>
        <Grid item xs={12}>
          <div className={classes.formImageContainer}>
            <img
              src={displayedImage ? displayedImage : defaultEventImgLandscape}
              alt="Zdjęcie wątku"
              className={classes.formImage}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.formImageUploadBtn}
              onClick={() => imageInputRef.current.click()}
            >
              Ustaw zdjęcie
            </Button>
            <input
              style={{ display: 'none' }}
              type="file"
              id="input-file"
              ref={imageInputRef}
              accept="image/*"
              onChange={selectImage}
            />
            {displayedImage && (
              <Button
                variant="contained"
                color="secondary"
                className={classes.formImageDeleteBtn}
                onClick={deleteEventImage}
              >
                Usuń zdjęcie
              </Button>
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Tytuł wątku"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={
              formik.touched.title && formik.errors.title
                ? formik.errors.title
                : ' '
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="content"
            name="content"
            label="Treść wątku"
            multiline
            rows={5}
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={
              formik.touched.content && formik.errors.content
                ? formik.errors.content
                : ' '
            }
          />
        </Grid>
      </Grid>
      <Divider />
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        className={classes.formConfirmBtn}
      >
        {edition ? 'Zapisz zmiany' : 'Utwórz wątek'}
      </Button>
    </form>
  );
};

GroupThreadForm.propTypes = {
  classes: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  groupId: PropTypes.number.isRequired,
  edition: PropTypes.bool,
  threadId: PropTypes.number,
  editedTitle: PropTypes.string,
  editedContent: PropTypes.string,
  threadImage: PropTypes.object,
};

GroupThreadForm.defaultProps = {
  edition: false,
};

export default withStyles(styles)(GroupThreadForm);
