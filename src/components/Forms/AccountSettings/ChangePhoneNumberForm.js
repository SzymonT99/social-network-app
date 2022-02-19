import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from '../form-jss';
import { PropTypes } from 'prop-types';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { editPhoneNumber } from '../../../redux/actions/authActions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ChangePhoneNumberForm = (props) => {
  const { classes, currentPhoneNumber } = props;

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object({
    oldPhoneNumber: yup.string().required('Wymagane'),
    newPhoneNumber: yup.string().required('Wymagane'),
    password: yup.string().required('Wymagane'),
  });

  const formik = useFormik({
    initialValues: {
      oldPhoneNumber: currentPhoneNumber,
      newPhoneNumber: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        editPhoneNumber(
          values.oldPhoneNumber,
          values.newPhoneNumber,
          values.password
        )
      ).then((status) => status === 200 && resetForm());
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={formik.handleSubmit} className={classes.editAccountForm}>
      <TextField
        fullWidth
        sx={{ marginBottom: '20px' }}
        className={classes.disabledFormBtn}
        id="oldPhoneNumber"
        name="oldPhoneNumber"
        label="Obecny numer telefonu"
        onChange={formik.handleChange}
        value={currentPhoneNumber}
        disabled
      />
      <TextField
        fullWidth
        id="newPhoneNumber"
        name="newPhoneNumber"
        label="Nowy numer telefonu"
        value={formik.values.newPhoneNumber}
        onChange={formik.handleChange}
        error={
          formik.touched.newPhoneNumber && Boolean(formik.errors.newPhoneNumber)
        }
        helperText={
          formik.touched.newPhoneNumber && formik.errors.newPhoneNumber
            ? formik.errors.newPhoneNumber
            : ' '
        }
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Hasło"
        type={showPassword ? 'text' : 'password'}
        value={formik.values.password}
        onChange={formik.handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
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
        Zmień numer telefonu
      </Button>
    </form>
  );
};

ChangePhoneNumberForm.propTypes = {
  classes: PropTypes.object.isRequired,
  currentPhoneNumber: PropTypes.string.isRequired,
};

export default withStyles(styles)(ChangePhoneNumberForm);
