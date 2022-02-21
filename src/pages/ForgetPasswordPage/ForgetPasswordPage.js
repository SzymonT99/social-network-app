import React, { useState } from 'react';
import styles from './forgetPasswordPage-jss';
import { withStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useHistory } from 'react-router-dom';
import logoWhite from '../../assets/logo-white.png';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { forgetUserPassword } from '../../redux/actions/authActions';
import CircularProgress from '@mui/material/CircularProgress';

const validationSchema = yup.object({
  email: yup.string().email('Nieprawidłowy email').required('Wymagane'),
});

const ForgetPasswordPage = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(forgetUserPassword(values.email)).then((status) => {
        if (status === 201) {
          history.push('/auth/login');
        }
        setIsLoading(false);
      });
    },
  });

  return (
    <div className={classes.forgetPasswordContainer}>
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
      <Paper elevation={4} className={classes.forgetPasswordContent}>
        <Typography variant="h3" align="center" marginBottom="10px">
          Zapomniane hasło
        </Typography>
        <Typography variant="subtitle1" align="center" marginBottom="50px">
          Wyślij link do resetowania hasła na podany adres e-mail
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
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
            color="secondary"
            variant="contained"
            fullWidth
            type="submit"
            className={classes.forgetPassBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress color="primary" />
            ) : (
              'Wyślij link resetujący'
            )}
          </Button>
        </form>
        <Link className={classes.backToLoginLink} to="/auth/login">
          Wróć do logowania
        </Link>
      </Paper>
    </div>
  );
};

ForgetPasswordPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForgetPasswordPage);
