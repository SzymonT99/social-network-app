import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from '../form-jss';
import { PropTypes } from 'prop-types';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { deleteUserAccount } from '../../../redux/actions/authActions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Popup from '../../Popup/Popup';
import ActionConfirmation from '../../ActionConfirmation/ActionConfirmation';

const DeleteAccountForm = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [openDeleteAccountPopup, setOpenDeleteAccountPopup] = useState(false);

  const validationSchema = yup.object({
    login: yup.string().required('Wymagane'),
    password: yup.string().required('Wymagane'),
  });

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(deleteUserAccount(values.login, values.password)).then(
        (status) => status === 200 && resetForm()
      );
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseAccountDeletePopup = () => {
    setOpenDeleteAccountPopup(false);
  };

  const handleDeleteAccount = () => {
    formik.handleSubmit();
    setOpenDeleteAccountPopup(false);
  };

  return (
    <form className={classes.editAccountForm}>
      <TextField
        fullWidth
        sx={{ marginTop: '-20px' }}
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
        onClick={() => setOpenDeleteAccountPopup(true)}
      >
        Usuń konto
      </Button>
      <Popup
        open={openDeleteAccountPopup}
        type="confirmation"
        title="Usuwanie konta"
        onClose={handleCloseAccountDeletePopup}
      >
        <ActionConfirmation
          title="Czy napewno chcesz usunąć swoje konto?"
          confirmationAction={handleDeleteAccount}
          rejectionAction={handleCloseAccountDeletePopup}
        />
      </Popup>
    </form>
  );
};

DeleteAccountForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteAccountForm);
