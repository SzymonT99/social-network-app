import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import React from 'react';
import { Button } from '@mui/material';
import { PropTypes } from 'prop-types';
import Avatar from '@mui/material/Avatar';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { respondToFriendInvitation } from '../../redux/actions/friendAction';

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
    '&.MuiAvatar-root': {
      width: '45px',
      height: '45px',
      marginRight: '20px',
    },
  },
  btnContainer: {
    marginTop: '10px',
  },
  button: {
    width: '115px',
    '&.MuiButton-root': {
      marginRight: '20px',
      borderRadius: '16px',
    },
  },
  rejectBtn: {
    '&.MuiButton-root': {
      backgroundColor: '#D4D4D4',
      color: 'black',
      '&:hover': {
        backgroundColor: '#8a8a8a',
      },
    },
  },
}));

const FriendInvitation = ({ inviterId, inviterName, inviterPhoto }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleClickRespondToFriendInvitation = (reaction) => {
    dispatch(respondToFriendInvitation(inviterId, reaction));
  };

  return (
    <div className={classes.friendInvitation}>
      <Typography
        variant="body1"
        component="div"
        className={classes.heading}
        noWrap
      >
        <Avatar
          src={inviterPhoto ? inviterPhoto.url : defaultUserPhoto}
          alt={inviterName}
          className={classes.userPhoto}
        />
        {inviterName}
      </Typography>
      <div className={classes.btnContainer}>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => handleClickRespondToFriendInvitation('accept')}
        >
          Zatwierdź
        </Button>
        <Button
          className={classNames(classes.button, classes.rejectBtn)}
          variant="contained"
          onClick={() => handleClickRespondToFriendInvitation('reject')}
        >
          Odrzuć
        </Button>
      </div>
    </div>
  );
};

FriendInvitation.propTypes = {
  inviterId: PropTypes.number.isRequired,
  inviterName: PropTypes.string.isRequired,
  inviterPhoto: PropTypes.object,
};

export default FriendInvitation;
