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
import { useDispatch } from 'react-redux';
import {
  saveAccessToken,
  saveExpirationDateToken,
  saveRefreshToken,
  saveUserId,
} from '../../redux/actions/authActions';

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

  const [authenticateError, setAuthenticateError] = useState(' ');

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
          setAuthenticateError(
            ' Niepoprawna nazwa użytkownika/email lub hasło'
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Paper className={classes.wrapper} elevation={7}>
        <Typography variant="h3" align="center" marginBottom="40px">
          Logowanie
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            style={{ marginTop: '26px' }}
            fullWidth
            id="login"
            name="login"
            label="Email lub nazwa użytkownika"
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
          <TextField
            style={{ marginTop: '26px' }}
            fullWidth
            id="password"
            name="password"
            label="Hasło"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password ? formik.errors.password : ' '}
          />
          <Button
            style={{ marginTop: '14px' }}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Zaloguj się
          </Button>
          <Typography
            textAlign="center"
            style={{ color: 'red', marginTop: '10px' }}
          >
            {authenticateError}
          </Typography>
        </form>
        <Link className={classes.link} to="/auth/register">
          Nie masz konta? Zarejestruj się.
        </Link>
      </Paper>
    </>
  );
};

export default withStyles(styles)(LoginPage);
