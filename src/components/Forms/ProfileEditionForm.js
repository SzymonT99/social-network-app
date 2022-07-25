import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './form-jss';
import { PropTypes } from 'prop-types';
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { editProfileInformation } from '../../redux/actions/userProfileActions';

const ProfileEditionForm = (props) => {
  const {
    classes,
    closePopup,
    userId,
    editedAboutUser,
    editedJob,
    editedRelationship,
    editedDateOfBirth,
    editedFirstName,
    editedLastName,
    editedSkills,
    editedGender,
    editedAccess,
  } = props;

  const dispatch = useDispatch();

  const [gender, setGender] = useState(editedGender);
  const [access, setAccess] = useState(editedAccess);

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleChangeAccess = (event) => {
    setAccess(event.target.value);
  };

  const validationSchema = yup.object({
    firstName: yup.string().required('Imię jest wymagane'),
    lastName: yup.string().required('Nazwisko jest wymagane'),
    dateOfBirth: yup.string().required('Data urodzenia jest wymagana'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: editedFirstName,
      lastName: editedLastName,
      dateOfBirth: editedDateOfBirth,
      job: editedJob,
      relationship: editedRelationship !== null ? editedRelationship : 'SINGLE',
      aboutUser: editedAboutUser,
      skills: editedSkills,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const updatedProfile = {
        isPublic: access,
        firstName: values.firstName,
        lastName: values.lastName,
        aboutUser: values.aboutUser,
        gender: gender,
        dateOfBirth: values.dateOfBirth,
        job: values.job,
        relationshipStatus: values.relationship,
        skills: values.skills,
      };
      dispatch(editProfileInformation(userId, updatedProfile));
      closePopup();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.formContainer}>
      <Grid container columnSpacing={{ xs: 2 }} rowSpacing={{ xs: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="Imię"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={
              formik.touched.firstName && formik.errors.firstName
                ? formik.errors.firstName
                : ' '
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Nazwisko"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={
              formik.touched.lastName && formik.errors.lastName
                ? formik.errors.lastName
                : ' '
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Płeć</FormLabel>
            <RadioGroup
              value={gender}
              onChange={handleChangeGender}
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
        <Grid item xs={12} sm={6}>
          <TextField
            id="dateOfBirth"
            label="Data urodzenia"
            defaultValue={editedDateOfBirth}
            type="date"
            sx={{ width: '100%' }}
            onChange={formik.handleChange}
            error={
              formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
            }
            InputLabelProps={{
              shrink: true,
            }}
            helperText={
              formik.touched.dateOfBirth && formik.errors.dateOfBirth
                ? formik.errors.dateOfBirth
                : ' '
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="job"
            name="job"
            label="Zawód"
            value={formik.values.job}
            onChange={formik.handleChange}
            error={formik.touched.job && Boolean(formik.errors.job)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            name="relationship"
            id="relationship"
            select
            label="Status związku"
            value={formik.values.relationship}
            onChange={formik.handleChange}
            error={
              formik.touched.relationship && Boolean(formik.errors.relationship)
            }
          >
            <MenuItem value="SINGLE">Singiel</MenuItem>
            <MenuItem value="IN_RELATIONSHIP">W związku</MenuItem>
            <MenuItem value="ENGAGED">Zaręczony</MenuItem>
            <MenuItem value="MARRIED">W związku małżeńskim</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            rows={2}
            fullWidth
            id="aboutUser"
            name="aboutUser"
            label="O mnie"
            value={formik.values.aboutUser}
            onChange={formik.handleChange}
            error={formik.touched.aboutUser && Boolean(formik.errors.aboutUser)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            rows={2}
            fullWidth
            id="skills"
            name="skills"
            label="Moje umiejętności"
            value={formik.values.skills}
            onChange={formik.handleChange}
            error={formik.touched.skills && Boolean(formik.errors.skills)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Dostępność profilu</FormLabel>
            <RadioGroup value={access} onChange={handleChangeAccess} row>
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Publiczny"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Prywatny"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Divider />
      <Button
        style={{ marginTop: '30px' }}
        color="secondary"
        className={classes.profileFormConfirmBtn}
        variant="contained"
        fullWidth
        type="submit"
      >
        Zapisz zmiany
      </Button>
    </form>
  );
};

ProfileEditionForm.propTypes = {
  classes: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  editedFirstName: PropTypes.string,
  editedLastName: PropTypes.string,
  editedDateOfBirth: PropTypes.string,
  editedJob: PropTypes.string,
  editedRelationship: PropTypes.string,
  editedAboutUser: PropTypes.string,
  editedSkills: PropTypes.string,
  editedGender: PropTypes.string,
  editedAccess: PropTypes.bool,
};

ProfileEditionForm.defaultProps = {
  editedFirstName: '',
  editedLastName: '',
  editedDateOfBirth: '',
  editedJob: '',
  editedRelationship: 'SINGLE',
  editedAboutUser: '',
  editedSkills: '',
  editedGender: '',
  editedAccess: true,
};

export default withStyles(styles)(ProfileEditionForm);
