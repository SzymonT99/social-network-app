import React, { useState } from 'react';
import styles from './loginPage-jss';
import { withStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link, useHistory } from 'react-router-dom';
import { endpoints } from '../../api/endpoints';
import logoWhite from '../../assets/logo-white.png';
import { useDispatch } from 'react-redux';
import {
  saveAccessToken,
  saveExpirationDateToken,
  saveRefreshToken,
  saveUserId,
} from '../../redux/actions/authActions';
import { Checkbox, FormControlLabel } from '@mui/material';

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

  const [authenticateError, setAuthenticateError] = useState('');

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      authenticateUser(values);
    },
  });

  const authenticateUser = (loginValues) => {
    fetch(endpoints.authenticate, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginValues),
    })
      .then((response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            const accessToken = data.accessToken;
            const refreshToken = data.refreshToken;
            const userId = data.userId;

            const tokenTime = data.accessTokenExpiresIn;
            const currentDate = new Date();
            const tokenExpirationDate = new Date(
              currentDate.setMilliseconds(
                currentDate.getMilliseconds() + tokenTime
              )
            );
            dispatch(saveAccessToken(accessToken));
            dispatch(saveExpirationDateToken(tokenExpirationDate));
            dispatch(saveRefreshToken(refreshToken));
            dispatch(saveUserId(userId));
          });
          history.push('/test');
        } else if (code === 401) {
          setAuthenticateError('Niepoprawna nazwa użytkownika/email lub hasło');
        } else if (code === 403) {
          setAuthenticateError('Konto zostało zablokowane');
        } else if (code === 409) {
          setAuthenticateError('Konto nie zostało aktywowane');
        } else {
          setAuthenticateError('Niepoprawny format danych');
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
            Serwis społecznościowy wykonywany w ramach pracy inżynierskiej na
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
              onClick={() => history.push('/app/public')}
            >
              Przeglądaj publiczne treści
            </Button>
          </div>
        </div>
        <div className={classes.loginColumn}>
          <Paper
            className={classes.loginForm}
            elevation={7}
            sx={{ borderRadius: '20px' }}
          >
            <Typography variant="h3" align="center" marginBottom="50px">
              Logowanie
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                style={{ marginBottom: '10px' }}
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
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
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
                  control={<Checkbox />}
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
              >
                Zaloguj się
              </Button>
              <Typography
                variant="subtitle1"
                textAlign="center"
                className={classes.warningText}
              >
                {authenticateError}
              </Typography>
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

export default withStyles(styles)(LoginPage);
