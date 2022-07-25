import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { changeProfileNav } from '../../redux/actions/userProfileActions';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CakeIcon from '@mui/icons-material/Cake';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@mui/styles';
import styles from './profile-jss';
import { useDispatch } from 'react-redux';

const relationshipStatusTypes = {
  SINGLE: 'Bez związku',
  IN_RELATIONSHIP: 'W związku',
  ENGAGED: 'Zaręczony(a)',
  MARRIED: 'W związku małżeńskim',
};

const BasicInformationBox = (props) => {
  const { classes, userProfile, friendsNumber } = props;

  const dispatch = useDispatch();

  return (
    <Paper elevation={4} sx={{ borderRadius: '10px' }}>
      <div className={classes.profileInfoBoxHeading}>
        <Typography variant="h6">Informacje</Typography>
        <Link
          component="button"
          variant="subtitle1"
          onClick={() => {
            dispatch(changeProfileNav(1));
          }}
        >
          Zobacz więcej
        </Link>
      </div>
      <div className={classes.profileInfoBoxContent}>
        {userProfile.isPublic ? (
          <Typography
            variant="subtitle1"
            className={classes.profileBasicInfoItem}
          >
            <PublicIcon /> Profil publiczny
          </Typography>
        ) : (
          <Typography
            variant="subtitle1"
            className={classes.profileBasicInfoItem}
          >
            <LockIcon /> Profil prywatny
          </Typography>
        )}
        {userProfile.address && (
          <Typography
            variant="subtitle1"
            className={classes.profileBasicInfoItem}
          >
            <LocationOnIcon />
            {userProfile.address.country + ', ' + userProfile.address.city}
          </Typography>
        )}
        <Typography
          variant="subtitle1"
          className={classes.profileBasicInfoItem}
        >
          <CakeIcon />
          {userProfile.dateOfBirth}
        </Typography>
        {userProfile.job !== null && (
          <Typography
            variant="subtitle1"
            className={classes.profileBasicInfoItem}
          >
            <WorkIcon />
            {userProfile.job}
          </Typography>
        )}
        {userProfile.schools.length > 0 && (
          <Typography
            variant="subtitle1"
            className={classes.profileBasicInfoItem}
          >
            <SchoolIcon />{' '}
            {'Uczęszczał(a) do ' +
              userProfile.schools[userProfile.schools.length - 1].name}
          </Typography>
        )}
        {userProfile.relationshipStatus !== null && (
          <Typography
            variant="subtitle1"
            className={classes.profileBasicInfoItem}
          >
            <FavoriteIcon />
            {relationshipStatusTypes[userProfile.relationshipStatus]}
          </Typography>
        )}
        <Typography
          variant="subtitle1"
          className={classes.profileBasicInfoItem}
        >
          <PeopleIcon /> {'Liczba znajomych: ' + friendsNumber}
        </Typography>
      </div>
    </Paper>
  );
};

BasicInformationBox.propTypes = {
  classes: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired,
  friendsNumber: PropTypes.number.isRequired,
};

export default withStyles(styles)(BasicInformationBox);
