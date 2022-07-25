import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import React, { useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { inviteToEvent } from '../../redux/actions/eventActions';
import { useHistory } from 'react-router-dom';
import { inviteToGroup } from '../../redux/actions/groupActions';
import { addUserToChat } from '../../redux/actions/chatAction';

const useStyles = makeStyles((theme) => ({
  invitationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px 0',
  },
  photo: {
    '&.MuiAvatar-root': {
      width: '45px',
      height: '45px',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  invitationText: {
    '&.MuiTypography-root': {
      marginLeft: '15px',
      flex: 1,
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
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

const SentInvitation = (props) => {
  const {
    eventId,
    eventInvitation,
    groupId,
    groupInvitation,
    chatId,
    chatInvitation,
    userId,
    name,
    avatar,
    disabled,
    addToChatNotification,
    clearSearchedUserName,
  } = props;

  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  const [buttonDisabled, setButtonDisabled] = useState(disabled);

  const handleClickInvite = () => {
    setButtonDisabled(true);
    if (eventInvitation) {
      dispatch(inviteToEvent(eventId, userId));
    }
    if (groupInvitation) {
      dispatch(inviteToGroup(groupId, userId));
    }
    if (chatInvitation) {
      dispatch(addUserToChat(chatId, userId));
      addToChatNotification(chatId, userId);
      clearSearchedUserName();
    }
  };

  return (
    <div className={classes.invitationContainer}>
      <Avatar
        src={avatar ? avatar.url : defaultUserPhoto}
        alt={name ? name : 'Nazwa użytkownika'}
        onClick={() => history.push('/app/profile/' + userId)}
        className={classes.photo}
      />
      <Typography
        variant="subtitle1"
        noWrap
        className={classes.invitationText}
        onClick={() => history.push('/app/profile/' + userId)}
      >
        {name}
      </Typography>
      <Button
        variant="contained"
        className={classes.inviteBtn}
        onClick={handleClickInvite}
        disabled={buttonDisabled}
      >
        {!chatInvitation ? 'Zaproś' : 'Dodaj'}
      </Button>
    </div>
  );
};

SentInvitation.propTypes = {
  eventId: PropTypes.number,
  eventInvitation: PropTypes.bool,
  groupId: PropTypes.number,
  groupInvitation: PropTypes.bool,
  chatId: PropTypes.number,
  chatInvitation: PropTypes.bool,
  userId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.object,
  disabled: PropTypes.bool,
  addToChatNotification: PropTypes.func,
  clearSearchedUserName: PropTypes.func,
};

SentInvitation.defaultProps = {
  disabled: false,
};

export default SentInvitation;
