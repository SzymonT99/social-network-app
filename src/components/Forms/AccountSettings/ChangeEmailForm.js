import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from '../form-jss';
import { PropTypes } from 'prop-types';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { editUserEmail } from '../../../redux/actions/authActions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ChangeEmailForm = (props) => {
  const { classes, currentEmail } = props;

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object({
    oldEmail: yup.string().required('Wymagane'),
    newEmail: yup.string().email('Nieprawidłowy email').required('Wymagane'),
    password: yup.string().required('Wymagane'),
  });

  const formik = useFormik({
    initialValues: {
      oldEmail: currentEmail,
      newEmail: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        editUserEmail(values.oldEmail, values.newEmail, values.password)
      ).then((status) => status === 200 && resetForm());
    },
  });

  useEffect(() => {
    formik.setFieldValue('oldEmail', currentEmail);
  }, [currentEmail]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={formik.handleSubmit} className={classes.editAccountForm}>
      <TextField
        fullWidth
        sx={{ marginBottom: '30px' }}
        className={classes.disabledFormBtn}
        id="oldEmail"
        name="oldEmail"
        label="Obecny adres email"
        onChange={formik.handleChange}
        value={currentEmail}
        disabled
      />
      <TextField
        fullWidth
        id="newEmail"
        name="newEmail"
        label="Nowy adres email"
        value={formik.values.newEmail}
        onChange={formik.handleChange}
        error={formik.touched.newEmail && Boolean(formik.errors.newEmail)}
        helperText={
          formik.touched.newEmail && formik.errors.newEmail
            ? formik.errors.newEmail
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
        Zmień adres email
      </Button>
    </form>
  );
};

ChangeEmailForm.propTypes = {
  classes: PropTypes.object.isRequired,
  currentEmail: PropTypes.string.isRequired,
};

export default withStyles(styles)(ChangeEmailForm);
