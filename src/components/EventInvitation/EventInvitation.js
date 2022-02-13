import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import React, { useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { inviteToEvent } from '../../redux/actions/eventActions';

const useStyles = makeStyles((theme) => ({
  eventInvitationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  friendPhoto: {
    '&.MuiAvatar-root': {
      width: '45px',
      height: '45px',
    },
  },
  invitationText: {
    '&.MuiTypography-root': {
      marginLeft: '15px',
      flex: 1,
    },
  },
  inviteBtn: {
    '&.MuiButton-root': {
      marginLeft: '10px',
      backgroundColor: '#D4D4D4',
      borderRadius: '5px',
      color: 'black',
      '&:hover': {
        backgroundColor: '#8a8a8a',
      },
    },
  },
}));

const EventInvitation = (props) => {
  const { eventId, userFriendId, friendName, friendAvatar, disabled } = props;

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleClickInviteToEvent = () => {
    dispatch(inviteToEvent(eventId, userFriendId));
  };

  return (
    <div className={classes.eventInvitationContainer}>
      <Avatar
        src={friendAvatar ? friendAvatar.url : defaultUserPhoto}
        alt={friendName ? friendName : 'Nazwa użytkownika'}
        className={classes.friendPhoto}
      />
      <Typography variant="subtitle1" noWrap className={classes.invitationText}>
        {friendName}
      </Typography>
      <Button
        variant="contained"
        className={classes.inviteBtn}
        onClick={handleClickInviteToEvent}
        disabled={disabled}
      >
        Zaproś
      </Button>
    </div>
  );
};

EventInvitation.propTypes = {
  eventId: PropTypes.number.isRequired,
  userFriendId: PropTypes.number.isRequired,
  friendName: PropTypes.string.isRequired,
  friendAvatar: PropTypes.object,
  disabled: PropTypes.bool,
};

export default EventInvitation;
