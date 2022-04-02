import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './form-jss';
import { PropTypes } from 'prop-types';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

import { showNotification } from '../../redux/actions/notificationActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  addUserInterests,
  getPossibleInterests,
} from '../../redux/actions/userProfileActions';
import { addGroupInterest } from '../../redux/actions/groupActions';

const AddInterestForm = (props) => {
  const { classes, userId, onCloseForm, forGroup, groupId, currentInterests } =
    props;

  const dispatch = useDispatch();

  const possibleInterests = useSelector(
    (state) => state.selectedProfile.possibleInterests
  );

  const [interestValue, setInterestValue] = useState(1);

  useEffect(() => {
    dispatch(getPossibleInterests());
  }, []);

  const handleChangeInterest = (event) => {
    setInterestValue(event.target.value);
  };

  const handleClickAddInterest = () => {
    if (
      !currentInterests.filter(
        (interest) => interest.interestId === interestValue
      ).length > 0
    ) {
      if (!forGroup) {
        dispatch(addUserInterests(userId, interestValue));
      } else {
        dispatch(addGroupInterest(groupId, interestValue));
      }
      onCloseForm();
    } else {
      dispatch(showNotification('warning', 'Już wybrano to zainteresowanie'));
    }
  };

  return (
    <form
      noValidate
      style={{
        margin: '15px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <FormControl sx={{ width: '60%', paddingRight: '15px', marginBottom: 0 }}>
        <InputLabel id="interest-select-label">Zainteresowanie</InputLabel>
        <Select
          labelId="interest-select-label"
          id="interest-select"
          value={interestValue}
          label="Zainteresowanie"
          onChange={handleChangeInterest}
          MenuProps={{ disableScrollLock: true }}
        >
          {possibleInterests &&
            possibleInterests.map((item) => (
              <MenuItem key={item.interestId} value={item.interestId}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <Button
        className={classes.userFavouriteActionBtn}
        sx={{ width: '120px', marginRight: '10px' }}
        color="secondary"
        variant="contained"
        onClick={handleClickAddInterest}
      >
        Dodaj
      </Button>
      <Button
        className={classes.userFavouriteActionBtn}
        sx={{ width: '120px' }}
        color="primary"
        variant="contained"
        onClick={onCloseForm}
      >
        Anuluj
      </Button>
    </form>
  );
};

AddInterestForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onCloseForm: PropTypes.func.isRequired,
  currentInterests: PropTypes.array.isRequired,
  forGroup: PropTypes.bool,
  userId: PropTypes.number,
  groupId: PropTypes.number,
};

export default withStyles(styles)(AddInterestForm);
