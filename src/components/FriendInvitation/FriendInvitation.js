import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import React from 'react';
import { Button } from '@mui/material';
import { PropTypes } from 'prop-types';

const useStyles = makeStyles((theme) => ({
  friendInvitation: {
    width: '100%',
    margin: '10px 0 30px 0',
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
  },
  userPhoto: {
    display: 'block',
    width: '45px',
    height: '45px',
    borderRadius: '50px',
    marginRight: '20px',
  },
  btnContainer: {
    marginTop: '10px',
  },
  button: {
    width: '115px',
    '&.MuiButton-contained': {
      marginRight: '20px',
      borderRadius: '20px',
    },
  },
}));

const FriendInvitation = ({ image, name }) => {
  const classes = useStyles();

  return (
    <div className={classes.friendInvitation}>
      <Typography variant="body1" component="div" className={classes.heading}>
        <img
          src={defaultUserPhoto}
          alt="Zdjęcie użytkownika"
          className={classes.userPhoto}
        />
        {name}
      </Typography>
      <div className={classes.btnContainer}>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
        >
          Zatwierdź
        </Button>
        <Button
          className={classes.button}
          style={{ backgroundColor: '#D4D4D4', color: 'black' }}
          variant="contained"
        >
          Odrzuć
        </Button>
      </div>
    </div>
  );
};

FriendInvitation.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default FriendInvitation;
