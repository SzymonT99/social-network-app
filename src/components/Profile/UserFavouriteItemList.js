import React, { useState } from 'react';
import styles from './profile-jss';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useDispatch } from 'react-redux';
import { deleteFavouriteItem } from '../../redux/actions/userProfileActions';
import AddUserFavouriteForm from '../Forms/AddUserFavouriteForm';

const favouriteTypes = {
  BOOK: 'Książki',
  FILM: 'Filmy',
  ACTOR: 'Aktorzy',
  MUSIC: 'Utwory muzyczne',
  BAND: 'Zespoły muzyczne',
  QUOTE: 'Cytaty',
  TV_SHOW: 'Programy telewizyjne',
  SPORT: 'Dyscypliny sportowe',
  SPORT_TEAM: 'Drużyny sportowe',
};

const UserFavouriteItemList = (props) => {
  const { classes, favourites } = props;

  const dispatch = useDispatch();

  const [showEditFavouriteForm, setShowEditFavouriteForm] = useState(false);

  const handleClickEditFavourite = () => {
    setShowEditFavouriteForm(true);
  };
  const handleClickDeleteFavourite = (favouriteId) => {
    dispatch(deleteFavouriteItem(favouriteId));
  };

  return (
    <>
      {favourites.length > 0 && (
        <div>
          <Typography variant="h6">
            {favouriteTypes[favourites[0].favouriteType]}
          </Typography>
          <List className={classes.userFavouriteTypeList}>
            {favourites.map((userFavourite) => (
              <div key={userFavourite.favouriteId}>
                <ListItem
                  key={userFavourite.favouriteId}
                  disableGutters
                  secondaryAction={
                    <>
                      <IconButton onClick={handleClickEditFavourite}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          handleClickDeleteFavourite(userFavourite.favouriteId)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <FiberManualRecordIcon color="secondary" fontSize="14px" />
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography noWrap variant="subtitle2">
                        {userFavourite.name}
                      </Typography>
                    }
                  />
                </ListItem>
                {showEditFavouriteForm && (
                  <AddUserFavouriteForm
                    edition
                    favouriteId={userFavourite.favouriteId}
                    editedFavouriteType={userFavourite.favouriteType}
                    editedFavouriteName={userFavourite.name}
                    onCloseForm={() => setShowEditFavouriteForm(false)}
                  />
                )}
              </div>
            ))}
          </List>
        </div>
      )}
    </>
  );
};

UserFavouriteItemList.propTypes = {
  classes: PropTypes.object.isRequired,
  favourites: PropTypes.array.isRequired,
};

export default withStyles(styles)(UserFavouriteItemList);
