import React, { useRef, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './form-jss';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import defaultEventImgLandscape from '../../assets/default-event-photo-landscape.png';
import { Button, Divider, Grid, TextField } from '@mui/material';
import { createChat } from '../../redux/actions/chatAction';

const ChatForm = (props) => {
  const { classes, closePopup } = props;

  const dispatch = useDispatch();

  const [displayedImage, setDisplayedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const imageInputRef = useRef(null);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Nazwa jest wymagana')
      .max(30, 'Nazwa powinna mieć długość maksymalnie 30 znaków'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      if (uploadedImage !== null) {
        formData.append('image', uploadedImage);
      } else {
        formData.append('image', null);
      }

      const chat = {
        name: values.name,
      };

      formData.append(
        'chat',
        new Blob([JSON.stringify(chat)], {
          type: 'application/json',
        })
      );

      dispatch(createChat(formData));

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
              alt="Zdjęcie czatu"
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
            id="name"
            name="name"
            label="Nazwa czatu"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
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
        Utwórz czat
      </Button>
    </form>
  );
};

ChatForm.propTypes = {
  classes: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default withStyles(styles)(ChatForm);
