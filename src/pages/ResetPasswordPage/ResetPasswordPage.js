import React, { useState } from 'react';
import styles from './resetPasswordPage-jss';
import { withStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useHistory, useParams } from 'react-router-dom';
import logoWhite from '../../assets/logo-white.png';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { resetUserPassword } from '../../redux/actions/authActions';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';

const validationSchema = yup.object({
  login: yup.string().required('Wymagane'),
  newPassword: yup
    .string()
    .min(10, 'Hasło powinno mieć minimum 10 znaków')
    .max(100, 'Hasło powinno mieć maksymalnie 100 znaków')
    .required('Wymagane'),
  repeatedNewPassword: yup.string().required('Wymagane'),
});

const ResetPasswordPage = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);

  let { resetCode } = useParams();

  const formik = useFormik({
    initialValues: {
      login: '',
      newPassword: '',
      repeatedNewPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(
        resetUserPassword(
          resetCode,
          values.login,
          values.newPassword,
          values.repeatedNewPassword
        )
      ).then((status) => {
        if (status === 200) {
          history.push('/auth/login');
        }
        setIsLoading(false);
      });
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRepeatedPassword = () => {
    setShowRepeatedPassword(!showRepeatedPassword);
  };

  return (
    <div className={classes.resetPasswordContainer}>
      <div className={classes.appInfoBox}>
        <Typography
          variant="h1"
          gutterBottom
          className={classes.appName}
          onClick={() => history.push('/auth/login')}
        >
          <img src={logoWhite} className={classes.logo} alt="Logo" />
          Social Network
        </Typography>
      </div>
      <Paper elevation={4} className={classes.resetPasswordContent}>
        <Typography variant="h3" align="center" marginBottom="50px">
          Resetowanie hasła
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="login"
            name="login"
            label="Nazwa użytkownika lub adres email"
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={
              formik.touched.login && formik.errors.login
                ? formik.errors.login
                : ' '
            }
          />
          <TextField
            fullWidth
            id="newPassword"
            name="newPassword"
            label="Nowe hasło"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
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
            value={formik.values.repeatedNewPassword}
            onChange={formik.handleChange}
            type={showRepeatedPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowRepeatedPassword}
                    edge="end"
                  >
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
            color="secondary"
            variant="contained"
            fullWidth
            type="submit"
            className={classes.resetPassBtn}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress color="primary" /> : 'Zmień hasło'}
          </Button>
        </form>
        <Link className={classes.backToLoginLink} to="/auth/login">
          Wróć do logowania
        </Link>
      </Paper>
    </div>
  );
};

ResetPasswordPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPasswordPage);
