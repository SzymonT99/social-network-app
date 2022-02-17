import React, { useState } from 'react';
import styles from './friend-jss';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  deleteFriend,
  inviteToFriend,
  respondToFriendInvitation,
} from '../../redux/actions/friendAction';
import classNames from 'classnames';

const Friend = (props) => {
  const {
    classes,
    suggestion,
    receivedInvitation,
    sentInvitation,
    invitationDate,
    invitingFriendId,
    name,
    userId,
    city,
    friendList,
    mutualFriendList,
    photo,
  } = props;

  const dispatch = useDispatch();

  const history = useHistory();

  const [isInvited, setIsInvited] = useState(false);

  const handleClickAddToFriend = () => {
    setIsInvited(true);
    dispatch(inviteToFriend(userId));
  };

  const handleClickRespondToFriendInvitation = (reaction) => {
    dispatch(respondToFriendInvitation(userId, reaction));
  };

  const handleClickDeleteInvitation = () => {
    dispatch(deleteFriend(invitingFriendId, true));
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.friendContainer}>
        {!suggestion && (
          <Typography variant="body1" className={classes.invitationDateText}>
            {'Data zaproszenia: ' +
              new Date(invitationDate)
                .toJSON()
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('.')}
          </Typography>
        )}
        <img
          src={photo ? photo.url : defaultUserPhoto}
          alt={name}
          className={classes.friendPhoto}
          onClick={() => history.push('/app/profile/' + userId)}
        />
        <div className={classes.friendInformationBox}>
          <Typography
            variant="h6"
            fontWeight="bold"
            className={classes.friendNameLink}
            onClick={() => history.push('/app/profile/' + userId)}
          >
            {name}
          </Typography>
          {suggestion && (
            <Typography variant="body1">
              {'Miejscowość: ' + (city !== null ? city : 'nie podano')}
            </Typography>
          )}
          <Typography variant="body1">
            {'Znajomi: ' + friendList.length}
            {mutualFriendList && (
              <span>{' wspólnych: ' + mutualFriendList.length + ')'}</span>
            )}
          </Typography>
        </div>
        {suggestion && (
          <Button
            variant="contained"
            color="secondary"
            className={classes.actionFriendBtn}
            fullWidth
            disabled={isInvited}
            onClick={handleClickAddToFriend}
          >
            Dodaj do znajomych
          </Button>
        )}
        {receivedInvitation && (
          <>
            <Button
              variant="contained"
              color="secondary"
              className={classes.actionFriendBtn}
              fullWidth
              onClick={() => handleClickRespondToFriendInvitation('accept')}
            >
              Akceptuj zaproszenie
            </Button>
            <Button
              variant="contained"
              className={classNames(
                classes.actionFriendBtn,
                classes.rejectFriendBtn
              )}
              fullWidth
              onClick={() => handleClickRespondToFriendInvitation('reject')}
            >
              Odrzuć zaproszenie
            </Button>
          </>
        )}
        {sentInvitation && (
          <Button
            variant="contained"
            color="secondary"
            className={classes.actionFriendBtn}
            fullWidth
            onClick={handleClickDeleteInvitation}
          >
            Usuń zaproszenie
          </Button>
        )}
      </div>
    </div>
  );
};

Friend.propTypes = {
  classes: PropTypes.object.isRequired,
  suggestion: PropTypes.bool,
  receivedInvitation: PropTypes.bool,
  sentInvitation: PropTypes.bool,
  invitationDate: PropTypes.string,
  name: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  invitingFriendId: PropTypes.number,
  friendList: PropTypes.array.isRequired,
  mutualFriendList: PropTypes.array,
  city: PropTypes.string,
  photo: PropTypes.object,
};

export default withStyles(styles)(Friend);
