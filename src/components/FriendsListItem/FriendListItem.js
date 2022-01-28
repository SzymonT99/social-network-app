import React from 'react';
import styles from './friendListItem-jss';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import { PropTypes } from 'prop-types';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router-dom';

const activeStatus = {
  ONLINE: '#1CCD16',
  BE_RIGHT_BACK: 'orange',
  BUSY: 'purple',
  OFFLINE: '#FF1C00',
};

const FriendsListItem = (props) => {
  const { classes, userFriendId, friendName, friendStatus, friendPhoto } =
    props;

  const history = useHistory();

  return (
    <div
      className={classes.friendBox}
      onClick={() => history.replace('/app/profile/' + userFriendId)}
    >
      <Avatar
        src={friendPhoto ? friendPhoto.url : defaultUserPhoto}
        alt={friendName}
        className={classes.userPhoto}
      />
      <Typography className={classes.friendNameText} variant="body1" noWrap>
        {friendName}
      </Typography>
      <FiberManualRecordIcon style={{ color: activeStatus[friendStatus] }} />
    </div>
  );
};

FriendsListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  userFriendId: PropTypes.number.isRequired,
  friendName: PropTypes.string.isRequired,
  friendStatus: PropTypes.string.isRequired,
  friendPhoto: PropTypes.object,
};

export default withStyles(styles)(FriendsListItem);
