import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './form-jss';
import { PropTypes } from 'prop-types';
import { Button, Grid, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  createGroupRule,
  editGroupRule,
} from '../../redux/actions/groupActions';

const GroupRuleForm = (props) => {
  const {
    classes,
    closePopup,
    groupId,
    edition,
    ruleId,
    ruleName,
    ruleDescription,
  } = props;

  const dispatch = useDispatch();

  const validationSchema = yup.object({
    name: yup
      .string()
      .max(30, 'Nazwa może mieć maksymalnie 30 znaków')
      .required('Nazwa jest wymagana'),
    description: yup.string().required('Opis jest wymagany'),
  });

  const formik = useFormik({
    initialValues: {
      name: edition ? ruleName : '',
      description: edition ? ruleDescription : '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const rule = {
        name: values.name,
        description: values.description,
      };
      if (!edition) {
        dispatch(createGroupRule(groupId, rule));
      } else {
        dispatch(editGroupRule(groupId, ruleId, rule));
      }
      closePopup();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.formContainer}>
      <Grid container columnSpacing={{ xs: 2 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Nazwa reguły"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ' '
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            rows={2}
            fullWidth
            id="description"
            name="description"
            label="Opis"
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
      <Button
        color="secondary"
        className={classes.formConfirmBtn}
        variant="contained"
        fullWidth
        type="submit"
      >
        {!edition ? 'Dodaj regułę' : 'Zapisz zmiany'}
      </Button>
    </form>
  );
};

GroupRuleForm.propTypes = {
  classes: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  groupId: PropTypes.number.isRequired,
  edition: PropTypes.bool,
  ruleId: PropTypes.number,
  ruleName: PropTypes.string,
  ruleDescription: PropTypes.string,
};

GroupRuleForm.defaultProps = {
  edition: false,
  ruleName: '',
  ruleDescription: '',
};

export default withStyles(styles)(GroupRuleForm);
