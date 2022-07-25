import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from '../form-jss';
import { PropTypes } from 'prop-types';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  changePassword,
  editPhoneNumber,
} from '../../../redux/actions/authActions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ChangePasswordForm = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);

  const validationSchema = yup.object({
    oldPassword: yup.string().required('Wymagane'),
    newPassword: yup
      .string()
      .min(10, 'Hasło powinno mieć minimum 10 znaków')
      .max(100, 'Hasło powinno mieć maksymalnie 100 znaków')
      .required('Wymagane'),
    repeatedNewPassword: yup.string().required('Wymagane'),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      repeatedNewPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        changePassword(
          values.oldPassword,
          values.newPassword,
          values.repeatedNewPassword
        )
      ).then((status) => status === 200 && resetForm());
    },
  });

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRepeatedPassword = () => {
    setShowRepeatedPassword(!showRepeatedPassword);
  };

  return (
    <form onSubmit={formik.handleSubmit} className={classes.editAccountForm}>
      <TextField
        fullWidth
        sx={{ marginTop: '-20px' }}
        id="oldPassword"
        name="oldPassword"
        label="Obecne hasło"
        type={showCurrentPassword ? 'text' : 'password'}
        value={formik.values.oldPassword}
        onChange={formik.handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowCurrentPassword} edge="end">
                {showCurrentPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
        helperText={
          formik.touched.oldPassword && formik.errors.oldPassword
            ? formik.errors.oldPassword
            : ' '
        }
      />
      <TextField
        fullWidth
        id="newPassword"
        name="newPassword"
        label="Nowe hasło"
        type={showPassword ? 'text' : 'password'}
        value={formik.values.newPassword}
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
        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        helperText={
          formik.touched.newPassword && formik.errors.newPassword
            ? formik.errors.newPassword
            : ' '
        }
      />
      <TextField
        fullWidth
        id="repeatedNewPassword"
        name="repeatedNewPassword"
        label="Powtórz nowe hasło"
        type={showRepeatedPassword ? 'text' : 'password'}
        value={formik.values.repeatedNewPassword}
        onChange={formik.handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowRepeatedPassword} edge="end">
                {showRepeatedPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={
          formik.touched.repeatedNewPassword &&
          Boolean(formik.errors.repeatedNewPassword)
        }
        helperText={
          formik.touched.repeatedNewPassword &&
          formik.errors.repeatedNewPassword
            ? formik.errors.repeatedNewPassword
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
        Zmień hasło
      </Button>
    </form>
  );
};

ChangePasswordForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangePasswordForm);
