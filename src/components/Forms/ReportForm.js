import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './form-jss';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Divider, Grid, MenuItem, TextField } from '@mui/material';
import { reportUser } from '../../redux/actions/userProfileActions';

const ReportForm = (props) => {
  const { classes, closePopup, suspectId } = props;

  const dispatch = useDispatch();

  const validationSchema = yup.object({
    reportType: yup.string().required('Typ zgłoszenia jest wymagany'),
    description: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      reportType: 'RUDE_POST',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const report = {
        suspectId: suspectId,
        reportType: values.reportType,
        description: values.description,
      };

      dispatch(reportUser(report));
      closePopup();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <Grid container columnSpacing={{ xs: 2 }}>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            sx={{ marginBottom: '20px' }}
            variant="outlined"
            name="reportType"
            id="reportType"
            label="Rodzaj zgłoszenia"
            value={formik.values.reportType}
            onChange={formik.handleChange}
            error={
              formik.touched.reportType && Boolean(formik.errors.reportType)
            }
          >
            <MenuItem value="RUDE_POST">Nieodpowiedni post</MenuItem>
            <MenuItem value="RUDE_COMMENT">Nieodpowiedni komentarz</MenuItem>
            <MenuItem value="OFFENSIVE_NAME">
              Obraźliwa nazwa użytkownika
            </MenuItem>
            <MenuItem value="VULGAR_PICTURE">Wulgarne zdjęcie</MenuItem>
            <MenuItem value="IMPROPER_PROFILE">
              Nieodpowiednia treść profilu
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Treść zgłoszenia"
            multiline
            minRows={2}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={
              formik.touched.description && formik.errors.description
                ? formik.errors.description
                : ' '
            }
          />
        </Grid>
      </Grid>
      <Divider />
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        className={classes.formConfirmBtn}
      >
        Wyślij zgłoszenie
      </Button>
    </form>
  );
};

ReportForm.propTypes = {
  classes: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  suspectId: PropTypes.number.isRequired,
};

export default withStyles(styles)(ReportForm);
