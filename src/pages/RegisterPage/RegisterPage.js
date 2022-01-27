import React, { useState } from 'react';
import styles from './registerPage-jss';
import { withStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { endpoints } from '../../services/endpoints/endpoints';
import { useFormik } from 'formik';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import { showNotification } from '../../redux/actions/notificationActions';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const RegisterPage = (props) => {
  const { classes, children } = props;

  const dispatch = useDispatch();

  const [gender, setGender] = useState('');
  const [registrationError, setRegistrationError] = useState(' ');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const genderHandleChange = (event) => {
    setGender(event.target.value);
  };

  const registerUser = async (body) => {
    setLoading(true);
    const response = await fetch(endpoints.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const code = response.status;

    if (code === 201) {
      setLoading(false);
      history.push('/auth/login');
      dispatch(showNotification('success', 'Utworzono konto'));
    } else if (code === 403) {
      dispatch(
        showNotification(
          'error',
          'Podany email lub nazwa użytkownika już istnieją'
        )
      );
    } else if (code === 400) {
      dispatch(showNotification('warning', 'Niepoprawne dane'));
    } else {
      // code == 500
      dispatch(showNotification('error', 'Błąd serwera'));
    }
  };

  const validationSchema = yup.object({
    firstName: yup.string().required('Imię jest wymagane'),
    lastName: yup.string().required('Nazwisko jest wymagane'),
    email: yup.string().required('Email jest wymagany'),
    username: yup.string().required('Nazwa użytkownika jest wymagana'),
    phoneNumber: yup.string().required('Numer telefonu jest wymagany'),
    password: yup
      .string()
      .min(10, 'Hasło powinno mieć długość minimum 8 znaków')
      .max(100, 'Hasło powinno mieć długość maksymalnie 100 znaków')
      .required('Hasło jest wymagane'),
    repeatedPassword: yup.string().required('Hasło jest wymagane'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      phoneNumber: '',
      password: '',
      repeatedPassword: '',
      dateOfBirth: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.password !== values.repeatedPassword) {
        setRegistrationError('Podane hasła nie są takie same');
      } else {
        let userAccount = {
          ...values,
          gender,
        };
        console.log(userAccount);
        registerUser(userAccount);
      }
    },
  });

  return (
    <>
      <Paper
        className={classes.wrapper}
        elevation={4}
        sx={{ borderRadius: '20px' }}
      >
        <Typography variant="h3" align="center" marginBottom="40px">
          Tworzenie konta
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Grid container columnSpacing={{ xs: 2 }} rowSpacing={{ xs: 3 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="Imię"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Nazwisko"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                type="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Nazwa użytkownika"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                label="Numer telefonu"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                name="password"
                type="password"
                label="Hasło"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="repeatedPassword"
                name="repeatedPassword"
                type="password"
                label="Powtórz hasło"
                value={formik.values.repeatedPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.repeatedPassword &&
                  Boolean(formik.errors.repeatedPassword)
                }
              />
            </Grid>
            <Grid item xs={7}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Płeć</FormLabel>
                <RadioGroup
                  value={gender}
                  onChange={genderHandleChange}
                  row
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="FEMALE"
                    control={<Radio />}
                    label="Kobieta"
                  />
                  <FormControlLabel
                    value="MALE"
                    control={<Radio />}
                    label="Mężczyzna"
                  />
                  <FormControlLabel
                    value="OTHER"
                    control={<Radio />}
                    label="Inna"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="dateOfBirth"
                label="Data urodzenia"
                type="date"
                defaultValue="2021-01-01"
                sx={{ width: '100%' }}
                onChange={formik.handleChange}
                error={
                  formik.touched.dateOfBirth &&
                  Boolean(formik.errors.dateOfBirth)
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Button
            style={{ marginTop: '30px' }}
            color="secondary"
            className={classes.registerBtn}
            variant="contained"
            fullWidth
            type="submit"
          >
            {loading ? <CircularProgress color="primary" /> : 'Załóż konto'}
          </Button>
          <Typography
            textAlign="center"
            style={{ color: 'red', marginTop: '10px' }}
          >
            {registrationError}
          </Typography>
          <Link className={classes.link} to="/auth/login">
            Masz już konto? Zaloguj się.
          </Link>
        </form>
      </Paper>
    </>
  );
};

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterPage);
