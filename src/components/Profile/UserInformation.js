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
import { formatBaseDate } from '../../utils/formatBaseDate';

const UserInformation = (props) => {
  const {
    classes,
    name,
    city,
    userId,
    friendList,
    profilePhoto,
    updateFriends,
    groupAddedIn,
  } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loggedUser = useSelector((state) => state.auth.user);
  const loggedUserFriendInvitations = useSelector(
    (state) => state.friends.receivedFriendInvitations
  );
  const selectedProfile = useSelector(
    (state) => state.selectedProfile.userProfile
  );

  const [friendBtnHover, setFriendBtnHover] = useState(false);
  const [isUserFriend, setIsUserFriend] = useState(null);
  const [isInvitedToFriend, setIsInvitedToFriend] = useState(null);

  const [userFriends, setUserFriends] = useState([]);
  const [userFriendInvitations, setUserFriendInvitations] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (isUserLoggedIn) {
      dispatch(getUserFriends(userId, false, true)).then((friends) => {
        if (isMounted) {
          setUserFriends(friends);
          if (
            loggedUser.userId !== parseInt(userId) &&
            friends.filter(
              (friend) =>
                friend.user.userId === loggedUser.userId &&
                friend.isInvitationAccepted === true
            ).length > 0
          ) {
            setIsUserFriend(true);
          } else if (loggedUser.userId === parseInt(userId)) {
            setIsUserFriend(null);
          } else {
            setIsUserFriend(false);
          }
        }
      });

      dispatch(getReceivedFriendInvitations(userId, false, false, true)).then(
        (friendInvitations) => {
          if (isMounted) {
            setUserFriendInvitations(friendInvitations);
            if (
              loggedUser.userId !== parseInt(userId) &&
              friendInvitations.filter(
                (friend) => friend.invitingUser.userId === loggedUser.userId
              ).length > 0
            ) {
              setIsInvitedToFriend(true);
            } else if (loggedUser.userId === parseInt(userId)) {
              setIsInvitedToFriend(null);
            } else {
              setIsInvitedToFriend(false);
            }
          }
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [isUserFriend, isInvitedToFriend]);

  const handleManageFriend = () => {
    if (
      loggedUserFriendInvitations.filter(
        (invitation) => invitation.invitingUser.userId === parseInt(userId)
      ).length > 0
    ) {
      dispatch(respondToFriendInvitation(parseInt(userId), 'accept'));
      setIsUserFriend(true);
      setIsInvitedToFriend(false);
    } else if (!isUserFriend && !isInvitedToFriend) {
      dispatch(inviteToFriend(userId));
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
      if (!groupAddedIn) {
        dispatch(deleteFriend(friend.friendId)).then(() =>
          dispatch(getUserFriends(selectedProfile.userProfileId)).then(
            (data) => {
              updateFriends(data);
            }
          )
        );
      } else {
        dispatch(deleteFriend(friend.friendId)).then(() =>
          dispatch(getUserFriends(selectedProfile.userProfileId))
        );
      }
      setIsUserFriend(false);
      setIsInvitedToFriend(false);
    }
  };

  const generateFriendBtn = () => {
    if (
      loggedUserFriendInvitations.filter(
        (invitation) => invitation.invitingUser.userId === parseInt(userId)
      ).length > 0
    ) {
      return (
        <Typography
          variant="subtitle1"
          className={classes.friendManageBtnContent}
        >
          <CheckCircleOutlineIcon /> Akceptuj
        </Typography>
      );
    } else if (!isUserFriend && !isInvitedToFriend) {
      return (
        <Typography
          variant="subtitle1"
          className={classes.friendManageBtnContent}
        >
          <PersonAddIcon /> Dodaj
        </Typography>
      );
    } else if (!isUserFriend && isInvitedToFriend) {
      return (
        <Typography
          variant="subtitle1"
          className={classes.friendManageBtnContent}
        >
          <DoNotDisturbIcon />
          Anuluj
        </Typography>
      );
    } else if (isUserFriend && !isInvitedToFriend) {
      return (
        <Typography
          variant="subtitle1"
          className={classes.friendManageBtnContent}
        >
          <PersonIcon />
          Znajomy
        </Typography>
      );
    }
  };

  return (
    <div className={classes.userInfoContainer}>
      <img
        className={classes.friendPhoto}
        src={profilePhoto ? profilePhoto.url : defaultUserPhoto}
        alt={name}
        onClick={() => history.push('/app/profile/' + userId)}
      />
      <div className={classes.userInfoContent}>
        <div className={classes.userInformationBox}>
          <Typography
            variant="h6"
            noWrap
            className={classes.userNameLink}
            onClick={() => history.push('/app/profile/' + userId)}
          >
            {name}
          </Typography>
          {groupAddedIn && (
            <Typography variant="subtitle1" fontWeight={400}>
              {'dołączył(a) ' + formatBaseDate(groupAddedIn)}
            </Typography>
          )}
          <Typography variant="subtitle1">{city}</Typography>
          {friendList && (
            <Typography variant="body1">
              {'Liczba znajomych: ' + friendList.length}
            </Typography>
          )}
        </div>
        {isUserLoggedIn &&
        isUserFriend !== null &&
        isInvitedToFriend !== null ? (
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
                <PersonRemoveIcon />
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

UserInformation.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string,
  userId: PropTypes.number.isRequired,
  friendList: PropTypes.array,
  updateFriends: PropTypes.func,
  profilePhoto: PropTypes.object,
  groupAddedIn: PropTypes.string,
};

export default withStyles(styles)(UserInformation);
