import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './form-jss';
import { PropTypes } from 'prop-types';
import { Button, Divider, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  addUserAddress,
  editUserAddress,
} from '../../redux/actions/userProfileActions';

const AddressForm = (props) => {
  const {
    classes,
    closePopup,
    edition,
    addressId,
    editedCountry,
    editedCity,
    editedStreet,
    editedZipCode,
    userId,
  } = props;

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);

  const validationSchema = yup.object({
    country: yup.string().required('Wymagane'),
    city: yup.string().required('Wymagane'),
    zipCode: yup
      .string()
      .required('Wymagane')
      .max(6, 'Nieprawidłowy kod pocztowy'),
  });

  const formik = useFormik({
    initialValues: {
      country: edition ? editedCountry : '',
      city: edition ? editedCity : '',
      street: edition ? editedStreet : '',
      zipCode: edition ? editedZipCode : '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!edition) {
        dispatch(addUserAddress(values, userId));
      } else {
        dispatch(editUserAddress(addressId, values, userId));
      }
      closePopup();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <Grid container columnSpacing={{ xs: 2 }} rowSpacing={{ xs: 2 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="country"
            name="country"
            label="Państwo"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={
              formik.touched.country &&
              formik.errors.country &&
              formik.errors.country
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="city"
            name="city"
            label="Miasto"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={
              formik.touched.city && formik.errors.city && formik.errors.city
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="street"
            name="street"
            label="Ulica"
            value={formik.values.street}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="zipCode"
            name="zipCode"
            label="Kod pocztowy"
            value={formik.values.zipCode}
            onChange={formik.handleChange}
            error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
            helperText={
              formik.touched.zipCode &&
              formik.errors.zipCode &&
              formik.errors.zipCode
            }
          />
        </Grid>
      </Grid>
      <Divider />
      <Button
        style={{ marginTop: '20px' }}
        color="secondary"
        className={classes.profileFormConfirmBtn}
        variant="contained"
        fullWidth
        type="submit"
      >
        {!edition ? 'Dodaj adres' : 'Zapisz zmiany'}
      </Button>
    </form>
  );
};

AddressForm.propTypes = {
  classes: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  userId: PropTypes.number,
  edition: PropTypes.bool,
  addressId: PropTypes.number,
  editedCountry: PropTypes.string,
  editedCity: PropTypes.string,
  editedStreet: PropTypes.string,
  editedZipCode: PropTypes.string,
};

export default withStyles(styles)(AddressForm);
