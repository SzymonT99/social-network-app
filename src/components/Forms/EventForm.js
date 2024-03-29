import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './form-jss';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
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
import {
  createEvent,
  editEvent,
  getEvents,
} from '../../redux/actions/eventActions';
import { useHistory } from 'react-router-dom';

const EventForm = (props) => {
  const {
    classes,
    closePopup,
    updateEvents,
    edition,
    eventId,
    editedTitle,
    editedDescription,
    editedDate,
    editedTime,
    eventImage,
    editedCountry,
    editedCity,
    editedStreet,
    editedZipCode,
  } = props;

  const dispatch = useDispatch();
  const history = useHistory();

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
    if (edition && eventImage !== null) {
      convertUrlToFile(eventImage.filename, eventImage.url, eventImage.type);
      setDisplayedImage(eventImage.url);
    }
  }, []);

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
      title: !edition ? '' : editedTitle,
      description: !edition ? '' : editedDescription,
      date: !edition ? '' : editedDate,
      time: !edition ? '00:00' : editedTime,
      country: !edition ? '' : editedCountry,
      city: !edition ? '' : editedCity,
      street: !edition ? '' : editedStreet,
      zipCode: !edition ? '' : editedZipCode,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      if (uploadedImage !== null) {
        formData.append('image', uploadedImage);
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

      if (!edition) {
        dispatch(createEvent(formData)).then((event) =>
          dispatch(getEvents()).then((data) => {
            updateEvents(data);
            history.push('/app/event/' + event.eventId);
          })
        );
      } else {
        dispatch(editEvent(eventId, formData));
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
    <form onSubmit={formik.handleSubmit} className={classes.formContainer}>
      <Grid container columnSpacing={{ xs: 2 }}>
        <Grid item xs={12}>
          <div className={classes.formImageContainer}>
            <img
              src={displayedImage ? displayedImage : defaultEventImgLandscape}
              alt="Zdjęcie wydarzenia"
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="event-time-select-label">
              Czas rozpoczęcia wydarzenia
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <TextField
            id="street"
            name="street"
            label="Ulica"
            sx={{ paddingBottom: '20px' }}
            fullWidth
            value={formik.values.street}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        className={classes.formConfirmBtn}
      >
        {edition ? 'Zapisz zmiany' : 'Utwórz wydarzenie'}
      </Button>
    </form>
  );
};

EventForm.propTypes = {
  classes: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  updateEvents: PropTypes.func,
  edition: PropTypes.bool,
  eventId: PropTypes.number,
  editedTitle: PropTypes.string,
  editedDescription: PropTypes.string,
  editedDate: PropTypes.string,
  editedTime: PropTypes.string,
  editedCountry: PropTypes.string,
  editedCity: PropTypes.string,
  editedStreet: PropTypes.string,
  editedZipCode: PropTypes.string,
  eventImage: PropTypes.object,
};

export default withStyles(styles)(EventForm);
