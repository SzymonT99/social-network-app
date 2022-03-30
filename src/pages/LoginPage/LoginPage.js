import React, { useEffect, useState } from 'react';
import styles from './loginPage-jss';
import { withStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link, Redirect, useHistory } from 'react-router-dom';
import logoWhite from '../../assets/logo-white.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { authenticate } from '../../redux/actions/authActions';
import CircularProgress from '@mui/material/CircularProgress';
import { PropTypes } from 'prop-types';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import authTypes from '../../redux/types/authTypes';

const validationSchema = yup.object({
  login: yup
    .string('Wprowadź email lub nazwę użytkownika')
    .required('Email/nazwa użytkownika jest wymagane'),
  password: yup
    .string('Wprowadź hasło')
    .min(10, 'Hasło powinno mieć długość minimum 8 znaków')
    .max(100, 'Hasło powinno mieć długość maksymalnie 100 znaków')
    .required('Hasło jest wymagane'),
});

const LoginPage = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      rememberUser: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      dispatch(
        authenticate(values.login, values.password, values.rememberUser)
      ).then((status) => {
        if (status === 200) {
          history.push('/app');
        } else {
          setLoading(false);
        }
      });
    },
  });

  if (isLoggedIn) {
    return <Redirect to="/app" />;
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPublicContent = () => {
    dispatch({ type: authTypes.SET_GUEST_ACCESS });
    history.push('/app/public');
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.loginColumn}>
          <Typography variant="h1" gutterBottom className={classes.appName}>
            <img src={logoWhite} className={classes.logo} alt="Logo" />
            Social Network
          </Typography>
          <Typography variant="h4" className={classes.appDescription}>
            Serwis społecznościowy wykonany w ramach pracy inżynierskiej na
            Państwowej Wyższej Szkole Zawodowej w Tarnowie na kierunku
            Informatyka.
          </Typography>
          <div className={classes.btnContainer}>
            <Button
              variant="outlined"
              className={classes.registerBtn}
              onClick={() => history.push('/auth/register')}
            >
              Założ konto
            </Button>
            <Button
              variant="contained"
              className={classes.publicContentBtn}
              onClick={handleClickShowPublicContent}
            >
              Przeglądaj publiczne treści
            </Button>
          </div>
        </div>
        <div className={classes.loginColumn}>
          <Paper
            className={classes.loginForm}
            elevation={4}
            sx={{ borderRadius: '20px' }}
          >
            <Typography variant="h3" align="center" marginBottom="50px">
              Logowanie
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="login"
                name="login"
                label="Email lub nazwa użytkownika"
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
                id="password"
                name="password"
                label="Hasło"
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : ' '
                }
              />
              <div className={classes.afterInputContainer}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="rememberUser"
                      name="rememberUser"
                      value={formik.values.rememberUser}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Zapamiętaj mnie"
                />
                <Link
                  to="/auth/forget-password"
                  className={classes.forgotPasswordLink}
                >
                  Nie pamiętam hasła
                </Link>
              </div>
              <Button
                color="secondary"
                className={classes.loginBtn}
                variant="contained"
                fullWidth
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress color="primary" /> : 'Zaloguj się'}
              </Button>
            </form>
            <Link className={classes.registerLink} to="/auth/register">
              Utwórz nowe konto
            </Link>
          </Paper>
        </div>
      </div>
    </>
  );
};

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
