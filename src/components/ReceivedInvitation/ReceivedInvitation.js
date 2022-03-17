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
import { useHistory } from 'react-router-dom';
import { decideAboutUserGroupJoinRequest } from '../../redux/actions/groupActions';

const useStyles = makeStyles((theme) => ({
  receivedInvitationContainer: {
    width: '100%',
    margin: '10px 0px',
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0px',
  },
  headingText: {
    '&.MuiTypography-root': {
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
  },
  userPhoto: {
    '&.MuiAvatar-root': {
      width: '45px',
      height: '45px',
      marginRight: '20px',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  invitationBtn: {
    '&.MuiButton-root': {
      width: '115px',
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

const ReceivedInvitation = ({
  inviterId,
  inviterName,
  inviterPhoto,
  friendInvitation,
  groupInvitation,
  groupId,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickRespondToInvitation = (isAccepted) => {
    if (friendInvitation) {
      let reaction = isAccepted ? 'accept' : 'reject';
      dispatch(respondToFriendInvitation(inviterId, reaction));
    }
    if (groupInvitation) {
      dispatch(decideAboutUserGroupJoinRequest(groupId, inviterId, isAccepted));
    }
  };

  return (
    <div
      className={classNames(
        classes.receivedInvitationContainer,
        groupInvitation && classes.rowContainer
      )}
    >
      <div className={classes.userInfoContainer}>
        <Avatar
          src={inviterPhoto ? inviterPhoto.url : defaultUserPhoto}
          alt={inviterName}
          className={classes.userPhoto}
          onClick={() => history.push('/app/profile/' + inviterId)}
        />
        <Typography
          variant="subtitle2"
          className={classes.headingText}
          noWrap
          onClick={() => history.push('/app/profile/' + inviterId)}
        >
          {inviterName}
        </Typography>
      </div>
      <div>
        <Button
          className={classes.invitationBtn}
          variant="contained"
          color="secondary"
          onClick={() => handleClickRespondToInvitation(true)}
        >
          Zatwierdź
        </Button>
        <Button
          className={classNames(classes.invitationBtn, classes.rejectBtn)}
          variant="contained"
          onClick={() => handleClickRespondToInvitation(false)}
        >
          Odrzuć
        </Button>
      </div>
    </div>
  );
};

ReceivedInvitation.propTypes = {
  inviterId: PropTypes.number.isRequired,
  inviterName: PropTypes.string.isRequired,
  inviterPhoto: PropTypes.object,
  friendInvitation: PropTypes.bool,
  groupInvitation: PropTypes.bool,
  groupId: PropTypes.number,
};

export default ReceivedInvitation;
