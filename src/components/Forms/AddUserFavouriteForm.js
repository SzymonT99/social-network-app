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
  TextField,
} from '@mui/material';
import {
  addFavouriteItem,
  editFavouriteItem,
} from '../../redux/actions/userProfileActions';
import { showNotification } from '../../redux/actions/notificationActions';
import { useDispatch } from 'react-redux';

const favouriteTypes = {
  BOOK: 'Ksiązka',
  FILM: 'Film',
  ACTOR: 'Aktor',
  MUSIC: 'Utwór muzyczny',
  BAND: 'Zespół muzyczny',
  QUOTE: 'Cytat',
  TV_SHOW: 'Program telewizyjny',
  SPORT: 'Dyscyplina sportowa',
  SPORT_TEAM: 'Drużyna sportowa',
};

const AddUserFavouriteForm = (props) => {
  const {
    classes,
    onCloseForm,
    edition,
    favouriteId,
    editedFavouriteName,
    editedFavouriteType,
  } = props;

  const dispatch = useDispatch();

  const [favouriteType, setFavouriteType] = useState(editedFavouriteType);
  const [favouriteName, setFavouriteName] = useState(editedFavouriteName);

  const handleChangeFavouriteType = (event) => {
    setFavouriteType(event.target.value);
  };

  const handleChangeFavouriteName = (event) => {
    setFavouriteName(event.target.value);
  };

  const handleClickAddFavourite = () => {
    const favourite = {
      favouriteType,
      name: favouriteName,
    };

    if (favouriteName !== '') {
      setFavouriteName('');
      dispatch(addFavouriteItem(favourite));
      onCloseForm();
    } else {
      dispatch(showNotification('warning', 'Nie podano nazwy'));
    }
  };

  const handleClickEditFavourite = () => {
    const favourite = {
      favouriteType,
      name: favouriteName,
    };

    if (favouriteName !== '') {
      setFavouriteName('');
      dispatch(editFavouriteItem(favouriteId, favourite));
      onCloseForm();
    } else {
      dispatch(showNotification('warning', 'Nie podano nazwy'));
    }
  };

  return (
    <form noValidate style={{ margin: '15px 0' }}>
      <div className={classes.userFavouriteItemFormContainer}>
        <FormControl
          sx={{ width: '35%', paddingRight: '15px', marginBottom: 0 }}
        >
          <InputLabel id="favourite-type-select-label">Rodzaj</InputLabel>
          <Select
            labelId="favourite-type-select-label"
            id="favourite-type-select"
            value={favouriteType}
            label="Rodzaj"
            onChange={handleChangeFavouriteType}
            MenuProps={{ disableScrollLock: true }}
          >
            <MenuItem value="BOOK">{favouriteTypes.BOOK}</MenuItem>
            <MenuItem value="FILM">{favouriteTypes.FILM}</MenuItem>
            <MenuItem value="ACTOR">{favouriteTypes.ACTOR}</MenuItem>
            <MenuItem value="MUSIC">{favouriteTypes.MUSIC}</MenuItem>
            <MenuItem value="BAND">{favouriteTypes.BAND}</MenuItem>
            <MenuItem value="QUOTE">{favouriteTypes.QUOTE}</MenuItem>
            <MenuItem value="TV_SHOW">{favouriteTypes.TV_SHOW}</MenuItem>
            <MenuItem value="SPORT">{favouriteTypes.SPORT}</MenuItem>
            <MenuItem value="SPORT_TEAM">{favouriteTypes.SPORT_TEAM}</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ width: '65%' }}
          label="Nazwa"
          variant="outlined"
          value={favouriteName}
          onChange={handleChangeFavouriteName}
        />
      </div>
      <div className={classes.userFavouriteItemFormAction}>
        <Button
          className={classes.userFavouriteActionBtn}
          sx={{ marginRight: '15px' }}
          color="secondary"
          variant="contained"
          onClick={
            !edition ? handleClickAddFavourite : handleClickEditFavourite
          }
        >
          {!edition ? 'Dodaj' : 'Zapisz'}
        </Button>
        <Button
          className={classes.userFavouriteActionBtn}
          color="primary"
          variant="contained"
          onClick={onCloseForm}
        >
          Anuluj
        </Button>
      </div>
    </form>
  );
};

AddUserFavouriteForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onCloseForm: PropTypes.func.isRequired,
  edition: PropTypes.bool,
  favouriteId: PropTypes.number,
  editedFavouriteType: PropTypes.string,
  editedFavouriteName: PropTypes.string,
};

AddUserFavouriteForm.defaultProps = {
  editedFavouriteName: '',
  editedFavouriteType: '',
};

export default withStyles(styles)(AddUserFavouriteForm);
