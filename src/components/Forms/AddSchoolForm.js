import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './form-jss';
import { PropTypes } from 'prop-types';
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  addSchoolInformation,
  editSchoolInformation,
} from '../../redux/actions/userProfileActions';
import { showNotification } from '../../redux/actions/notificationActions';

const AddSchoolForm = (props) => {
  const {
    classes,
    closePopup,
    schoolId,
    edition,
    editedSchoolName,
    editedSchoolType,
    editedStartDate,
    editedGraduationDate,
  } = props;

  const dispatch = useDispatch();

  const [schoolType, setSchoolType] = useState('PRIMARY_SCHOOL');
  const [schoolName, setSchoolName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [graduationDate, setGraduationDate] = useState('');
  const [graduation, setGraduation] = useState(false);

  useEffect(() => {
    if (edition) {
      setSchoolType(editedSchoolType);
      setSchoolName(editedSchoolName);
      setStartDate(editedStartDate);
      setGraduation(editedGraduationDate !== '');
      setGraduationDate(editedGraduationDate);
    }
  }, []);

  const handleSchoolNameChange = (event) => {
    setSchoolName(event.target.value);
  };

  const handleSchoolTypeChange = (event) => {
    setSchoolType(event.target.value);
  };

  const handleGraduationChange = (event) => {
    setGraduation(event.target.checked);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleGraduationDateChange = (event) => {
    setGraduationDate(event.target.value);
  };

  const handleAddSchool = () => {
    const school = {
      schoolType,
      name: schoolName,
      startDate,
      graduationDate: graduationDate === '' ? null : graduationDate,
    };
    if (schoolName !== '' && startDate !== '') {
      dispatch(addSchoolInformation(school));
      closePopup();
    } else {
      dispatch(showNotification('warning', 'Nie uzupełniono formularza'));
    }
  };

  const handleEditSchool = () => {
    const school = {
      schoolType,
      name: schoolName,
      startDate,
      graduationDate,
    };
    if (schoolName !== '' && startDate !== '') {
      dispatch(editSchoolInformation(schoolId, school));
      closePopup();
    } else {
      dispatch(showNotification('warning', 'Nie uzupełniono formularza'));
    }
  };

  return (
    <div className={classes.workFormContainer}>
      <Stack component="form" noValidate spacing={3}>
        <FormControl fullWidth>
          <InputLabel id="school-type-select-label">Typ szkoły</InputLabel>
          <Select
            labelId="school-type-select-label"
            id="school-type-select"
            value={schoolType}
            label="Typ szkoły"
            onChange={handleSchoolTypeChange}
          >
            <MenuItem value="PRIMARY_SCHOOL">Szkoła Podstawowa</MenuItem>
            <MenuItem value="SECONDARY_SCHOOL">Szkoła Średnia</MenuItem>
            <MenuItem value="UNIVERSITY">Szkoła Wyższa</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Nazwa szkoły"
          variant="outlined"
          value={schoolName}
          onChange={handleSchoolNameChange}
        />
        <div className={classes.workDateContainer}>
          <TextField
            id="start-date"
            label="Data rozpoczęcia"
            type="date"
            sx={{ width: '45%' }}
            value={startDate}
            onChange={handleStartDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="graduation-date"
            label="Data ukończenia"
            type="date"
            sx={{ width: '45%' }}
            value={graduationDate}
            onChange={handleGraduationDateChange}
            disabled={!graduation}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <FormControlLabel
          className={classes.graduationSchoolLabel}
          control={
            <Checkbox
              className={classes.graduationSchoolCheckbox}
              inputProps={{ 'aria-label': 'controlled' }}
              color="primary"
              id="graduation"
              value={graduation}
              onChange={handleGraduationChange}
            />
          }
          label="Ukończono szkołę"
        />
      </Stack>
      <Divider />
      <div className={classes.workActionBtnContainer}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.workActionBtn}
          onClick={!edition ? handleAddSchool : handleEditSchool}
        >
          {!edition ? 'Dodaj' : 'Edytuj'}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.workActionBtn}
          onClick={closePopup}
        >
          Anuluj
        </Button>
      </div>
    </div>
  );
};

AddSchoolForm.propTypes = {
  classes: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  edition: PropTypes.bool,
  schoolId: PropTypes.number,
  editedSchoolName: PropTypes.string,
  editedSchoolType: PropTypes.string,
  editedStartDate: PropTypes.string,
  editedGraduationDate: PropTypes.string,
};

AddSchoolForm.defaultProps = {
  edition: false,
  schoolId: null,
  editedSchoolName: '',
  editedSchoolType: '',
  editedStartDate: '',
  editedGraduationDate: '',
};

export default withStyles(styles)(AddSchoolForm);
