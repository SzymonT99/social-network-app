import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './form-jss';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import defaultEventImgLandscape from '../../assets/default-event-photo-landscape.png';
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { createEvent } from '../../redux/actions/eventActions';

const EventForm = (props) => {
  const { classes, closePopup, edition } = props;

  const dispatch = useDispatch();

  const [displayedImage, setDisplayedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const imageInputRef = useRef(null);

  const generateTimeNumbers = () => {
    let quarterHours = ['00', '15', '30', '45'];
    let times = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 4; j++) {
        let time = i + ':' + quarterHours[j];
        if (i < 10) {
          time = '0' + time;
        }
        times.push(time);
      }
    }
    return times;
  };

  const validationSchema = yup.object({
    title: yup
      .string()
      .required('Nazwa jest wymagana')
      .max(30, 'Nazwa powinna mieć długość maksymalnie 30 znaków'),
    description: yup.string().required('Opis jest wymagany'),
    date: yup.string().required('Data wydarzenia jest wymagana'),
    time: yup.string().required('Czas rozpoczęcia wydarzenia jest wymagany'),
    country: yup
      .string()
      .required('Kraj, w którym odbywa się wydarzene jest wymagany')
      .max(50, 'Nazwa państwa powinno mieć długość maksymalnie 50 znaków'),
    city: yup
      .string()
      .required('Misto, w którym odbywa się wydarzene jest wymagane')
      .max(30, 'Nazwa ulicy powinna mieć długość maksymalnie 30 znaków'),
    zipCode: yup
      .string()
      .required('Kod pocztowy dla wydarzenia jest wymagany')
      .max(10, 'Kod pocztowy powinnien mieć długość maksymalnie 10 znaków'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: '',
      time: '00:00',
      country: '',
      city: '',
      street: '',
      zipCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      if (uploadedImage !== null) {
        formData.append('image', uploadedImage[0]);
      } else {
        formData.append('image', null);
      }

      const eventAddress = {
        country: values.country,
        city: values.city,
        street: values.street,
        zipCode: values.zipCode,
      };

      const event = {
        eventAddress: eventAddress,
        title: values.title,
        description: values.description,
        eventDate: values.date + ' ' + values.time,
      };

      formData.append(
        'event',
        new Blob([JSON.stringify(event)], {
          type: 'application/json',
        })
      );

      console.log(event);

      dispatch(createEvent(formData));

      closePopup();
    },
  });

  const selectImage = (event) => {
    setDisplayedImage(URL.createObjectURL(event.target.files[0]));
    setUploadedImage(event.target.files);
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
      <Grid container columnSpacing={{ xs: 2 }} rowSpacing={{ xs: 1 }}>
        <Grid item xs={12}>
          <div className={classes.eventImageContainer}>
            <img
              src={displayedImage ? displayedImage : defaultEventImgLandscape}
              alt="Zdjęcie wydarzenia"
              className={classes.eventImage}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.eventImageUploadBtn}
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
                className={classes.eventImageDeleteBtn}
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
            label="Nazwa wydarzenia"
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
            id="description"
            name="description"
            label="Opis wydarzenia"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={
              formik.touched.description && formik.errors.description
                ? formik.errors.description
                : ' '
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="date"
            name="date"
            label="Data wydarzenia"
            type="date"
            fullWidth
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={
              formik.touched.date && formik.errors.date
                ? formik.errors.date
                : ' '
            }
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="event-time-select-label">
              Czas rozrpoczęcia wydarzenia
            </InputLabel>
            <Select
              id="time"
              name="time"
              labelId="event-time-select-label"
              value={formik.values.time}
              label="Czas rozrpoczęcia wydarzenia"
              onChange={formik.handleChange}
              MenuProps={{ disableScrollLock: true }}
              error={formik.touched.time && Boolean(formik.errors.time)}
              helperText={
                formik.touched.time && formik.errors.time
                  ? formik.errors.time
                  : ' '
              }
            >
              {generateTimeNumbers().map((time, index) => (
                <MenuItem key={index} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" marginBottom="10px">
            Adres wydarzenia
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="country"
            name="country"
            label="Państwo"
            fullWidth
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={
              formik.touched.country && formik.errors.country
                ? formik.errors.country
                : ' '
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="city"
            name="city"
            label="Miasto"
            fullWidth
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={
              formik.touched.city && formik.errors.city
                ? formik.errors.city
                : ' '
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="street"
            name="street"
            label="Ulica"
            fullWidth
            value={formik.values.street}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="zipCode"
            name="zipCode"
            label="Kod pocztowy"
            fullWidth
            value={formik.values.zipCode}
            onChange={formik.handleChange}
            error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
            helperText={
              formik.touched.zipCode && formik.errors.zipCode
                ? formik.errors.zipCode
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
        className={classes.createEventBtn}
      >
        {edition ? 'Zapisz zmiany' : 'Utwórz wydarzenie'}
      </Button>
    </form>
  );
};

EventForm.propTypes = {
  classes: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  edition: PropTypes.bool,
};

export default withStyles(styles)(EventForm);
