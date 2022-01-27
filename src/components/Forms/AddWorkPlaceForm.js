import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './form-jss';
import { PropTypes } from 'prop-types';
import { Button, Divider, Stack, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  addWorkPlaceInformation,
  editWorkPlaceInformation,
} from '../../redux/actions/userProfileActions';
import { showNotification } from '../../redux/actions/notificationActions';

const AddWorkPlaceForm = (props) => {
  const {
    classes,
    closePopup,
    workId,
    edition,
    editedCompany,
    editedPosition,
    editedStartDate,
    editedEndDate,
  } = props;

  const dispatch = useDispatch();

  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (edition) {
      setCompany(editedCompany);
      setPosition(editedPosition);
      setStartDate(editedStartDate);
      setEndDate(editedEndDate);
    }
  }, []);

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleAddWorkPlace = () => {
    const workPlace = {
      company,
      position,
      startDate,
      endDate: endDate === '' ? null : endDate,
    };
    if (company !== '' && position !== '' && startDate !== '') {
      dispatch(addWorkPlaceInformation(workPlace));
      closePopup();
    } else {
      dispatch(showNotification('warning', 'Nie uzupełniono formularza'));
    }
  };

  const handleEditWorkPlace = () => {
    const workPlace = {
      company,
      position,
      startDate,
      endDate,
    };
    if (company !== '' && position !== '' && startDate !== '') {
      dispatch(editWorkPlaceInformation(workId, workPlace));
      closePopup();
    } else {
      dispatch(showNotification('warning', 'Nie uzupełniono formularza'));
    }
  };

  return (
    <div className={classes.workFormContainer}>
      <Stack component="form" noValidate spacing={3}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Nazwa firmy"
          variant="outlined"
          value={company}
          onChange={handleCompanyChange}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Stanowisko pracy"
          variant="outlined"
          value={position}
          onChange={handlePositionChange}
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
            value={endDate}
            onChange={handleEndDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </Stack>
      <Divider sx={{ marginTop: '15px' }} />
      <div className={classes.workActionBtnContainer}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.workActionBtn}
          onClick={!edition ? handleAddWorkPlace : handleEditWorkPlace}
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

AddWorkPlaceForm.propTypes = {
  classes: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  edition: PropTypes.bool,
  workId: PropTypes.number,
  editedCompany: PropTypes.string,
  editedPosition: PropTypes.string,
  editedStartDate: PropTypes.string,
  editedEndDate: PropTypes.string,
};

AddWorkPlaceForm.defaultProps = {
  edition: false,
  workId: null,
  editedCompany: '',
  editedPosition: '',
  editedStartDate: '',
  editedEndDate: '',
};

export default withStyles(styles)(AddWorkPlaceForm);
