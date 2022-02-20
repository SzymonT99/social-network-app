import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from '../form-jss';
import { PropTypes } from 'prop-types';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { resendActivationLink } from '../../../redux/actions/authActions';
import { useHistory } from 'react-router-dom';

const ResendActivationLinkForm = (props) => {
  const { classes } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    email: yup.string().email('Nieprawidłowy email').required('Wymagane'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(resendActivationLink(values.email));
      history.push('/auth/login');
    },
  });

  return (
    <>
      <Typography variant="subtitle2" textAlign="center" margin="0px 60px">
        Na podany adres email zostanie wysłana wiadomość z nowym linkiem
        aktywacyjnym
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        className={classes.resendActivationLinkForm}
      >
        <TextField
          fullWidth
          sx={{ marginBottom: '10px' }}
          id="email"
          name="email"
          label="Adres email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ' '
          }
        />
        <Button
          className={classes.accountFormBtn}
          color="secondary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Wyślij ponownie
        </Button>
      </form>
    </>
  );
};

ResendActivationLinkForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResendActivationLinkForm);
