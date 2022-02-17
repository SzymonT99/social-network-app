import React, { useEffect, useState } from 'react';
import styles from './profile-jss';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {
  deleteFriend,
  getReceivedFriendInvitations,
  getUserFriends,
  inviteToFriend,
  respondToFriendInvitation,
} from '../../redux/actions/friendAction';
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import PersonIcon from '@mui/icons-material/Person';
import CircularProgress from '@mui/material/CircularProgress';

const FriendInformation = (props) => {
  const {
    classes,
    name,
    city,
    userFriendId,
    friendList,
    profilePhoto,
    updateFriends,
  } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);
  const loggedUserFriendInvitations = useSelector(
    (state) => state.auth.friendInvitations
  );
  const selectedProfileId = useSelector(
    (state) => state.selectedProfile.userProfile.userProfileId
  );

  const [friendBtnHover, setFriendBtnHover] = useState(false);
  const [isUserFriend, setIsUserFriend] = useState(null);
  const [isInvitedToFriend, setIsInvitedToFriend] = useState(null);

  const [userFriends, setUserFriends] = useState([]);
  const [userFriendInvitations, setUserFriendInvitations] = useState([]);

  useEffect(() => {
    let isMounted = true;

    dispatch(getUserFriends(userFriendId, false, true)).then((friends) => {
      if (isMounted) {
        setUserFriends(friends);
        if (
          loggedUser.userId !== parseInt(userFriendId) &&
          friends.filter(
            (friend) =>
              friend.user.userId === loggedUser.userId &&
              friend.isInvitationAccepted === true
          ).length > 0
        ) {
          setIsUserFriend(true);
        } else if (loggedUser.userId === parseInt(userFriendId)) {
          setIsUserFriend(null);
        } else {
          setIsUserFriend(false);
        }
      }
    });

    dispatch(
      getReceivedFriendInvitations(userFriendId, false, false, true)
    ).then((friendInvitations) => {
      if (isMounted) {
        setUserFriendInvitations(friendInvitations);
        if (
          loggedUser.userId !== parseInt(userFriendId) &&
          friendInvitations.filter(
            (friend) => friend.invitingUser.userId === loggedUser.userId
          ).length > 0
        ) {
          setIsInvitedToFriend(true);
        } else if (loggedUser.userId === parseInt(userFriendId)) {
          setIsInvitedToFriend(null);
        } else {
          setIsInvitedToFriend(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleManageFriend = () => {
    if (
      loggedUserFriendInvitations.filter(
        (invitation) =>
          invitation.invitingUser.userId === parseInt(userFriendId)
      ).length > 0
    ) {
      dispatch(respondToFriendInvitation(parseInt(userFriendId), 'accept'));
      setIsUserFriend(true);
      setIsInvitedToFriend(false);
    } else if (!isUserFriend && !isInvitedToFriend) {
      dispatch(inviteToFriend(userFriendId));
      setIsInvitedToFriend(true);
    } else if (!isUserFriend && isInvitedToFriend) {
      const invitedFriend = userFriendInvitations.find(
        (friend) => friend.invitingUser.userId === loggedUser.userId
      );
      dispatch(deleteFriend(invitedFriend.friendId, true));
      setIsInvitedToFriend(false);
    } else if (isUserFriend && !isInvitedToFriend) {
      const friend = userFriends.find(
        (friend) => friend.user.userId === loggedUser.userId
      );
      dispatch(deleteFriend(friend.friendId)).then(() =>
        dispatch(getUserFriends(selectedProfileId)).then((data) => {
          updateFriends(data);
        })
      );
      setIsUserFriend(false);
      setIsInvitedToFriend(false);
    }
  };

  const generateFriendBtn = () => {
    if (
      loggedUserFriendInvitations.filter(
        (invitation) =>
          invitation.invitingUser.userId === parseInt(userFriendId)
      ).length > 0
    ) {
      return (
        <Typography
          variant="subtitle1"
          className={classes.friendManageBtnContent}
        >
          <CheckCircleOutlineIcon sx={{ marginRight: '7px' }} /> Akceptuj
        </Typography>
      );
    } else if (!isUserFriend && !isInvitedToFriend) {
      return (
        <Typography
          variant="subtitle1"
          className={classes.friendManageBtnContent}
        >
          <PersonAddIcon sx={{ marginRight: '7px' }} /> Dodaj
        </Typography>
      );
    } else if (!isUserFriend && isInvitedToFriend) {
      return (
        <Typography
          variant="subtitle1"
          className={classes.friendManageBtnContent}
        >
          <DoNotDisturbIcon sx={{ marginRight: '7px' }} />
          Anuluj
        </Typography>
      );
    } else if (isUserFriend && !isInvitedToFriend) {
      return (
        <Typography
          variant="subtitle1"
          className={classes.friendManageBtnContent}
        >
          <PersonIcon sx={{ marginRight: '7px' }} />
          Znajomy
        </Typography>
      );
    }
  };

  return (
    <div className={classes.friendInfoContainer}>
      <img
        className={classes.friendPhoto}
        src={profilePhoto ? profilePhoto.url : defaultUserPhoto}
        alt={name}
        onClick={() => history.push('/app/profile/' + userFriendId)}
      />
      <div className={classes.friendInfoContent}>
        <div>
          <Typography
            variant="h6"
            className={classes.friendNameLink}
            onClick={() => history.push('/app/profile/' + userFriendId)}
          >
            {name}
          </Typography>
          <Typography variant="subtitle1">{city}</Typography>
          <Typography variant="body1">
            {'Liczba znajomych: ' + friendList.length}
          </Typography>
        </div>
        {isUserFriend !== null && isInvitedToFriend !== null ? (
          <Button
            onMouseOver={() => setFriendBtnHover(true)}
            onMouseOut={() => setFriendBtnHover(false)}
            className={
              isUserFriend && !isInvitedToFriend
                ? classes.friendDeleteBtn
                : classes.friendManageBtn
            }
            variant="contained"
            color="secondary"
            onClick={handleManageFriend}
          >
            {isUserFriend && !isInvitedToFriend && friendBtnHover ? (
              <Typography
                variant="subtitle1"
                className={classes.friendManageBtnContent}
              >
                <PersonRemoveIcon sx={{ marginRight: '7px' }} />
                Usuń
              </Typography>
            ) : (
              generateFriendBtn()
            )}
          </Button>
        ) : isUserFriend === null && isInvitedToFriend === null ? (
          <div />
        ) : (
          <CircularProgress color="secondary" />
        )}
      </div>
    </div>
  );
};

FriendInformation.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string,
  userFriendId: PropTypes.number.isRequired,
  friendList: PropTypes.array.isRequired,
  updateFriends: PropTypes.func.isRequired,
  profilePhoto: PropTypes.object,
};

export default withStyles(styles)(FriendInformation);
