import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from '../form-jss';
import { PropTypes } from 'prop-types';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { editUsername } from '../../../redux/actions/authActions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ChangeUsernameForm = (props) => {
  const { classes, currentUsername } = props;

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object({
    oldUsername: yup.string().required('Wymagane'),
    newUsername: yup
      .string()
      .min(6, 'Nazwa użytkownika powinna mieć minimum 6 znaków')
      .max(20, 'Nazwa użytkownika powinna mieć minimum 20 znaków')
      .required('Wymagane'),
    password: yup.string().required('Wymagane'),
  });

  const formik = useFormik({
    initialValues: {
      oldUsername: currentUsername,
      newUsername: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        editUsername(values.oldUsername, values.newUsername, values.password)
      ).then((status) => status === 200 && resetForm());
    },
  });

  useEffect(() => {
    formik.setFieldValue('oldUsername', currentUsername);
  }, [currentUsername]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={formik.handleSubmit} className={classes.editAccountForm}>
      <TextField
        fullWidth
        sx={{ marginBottom: '30px' }}
        className={classes.disabledFormBtn}
        id="oldUsername"
        name="oldUsername"
        label="Obecna nazwa użytkownika"
        onChange={formik.handleChange}
        value={currentUsername}
        disabled
      />
      <TextField
        fullWidth
        id="newUsername"
        name="newUsername"
        label="Nowa nazwa użytkownika"
        value={formik.values.newUsername}
        onChange={formik.handleChange}
        error={formik.touched.newUsername && Boolean(formik.errors.newUsername)}
        helperText={
          formik.touched.newUsername && formik.errors.newUsername
            ? formik.errors.newUsername
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
        Zmień nazwe użytkownika
      </Button>
    </form>
  );
};

ChangeUsernameForm.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUsername: PropTypes.string.isRequired,
};

export default withStyles(styles)(ChangeUsernameForm);
