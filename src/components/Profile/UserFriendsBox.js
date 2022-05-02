import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
} from '@mui/material';
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
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import { useHistory } from 'react-router-dom';

const UserFriendsBox = (props) => {
  const { classes, userFriends } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Paper elevation={4} sx={{ borderRadius: '10px' }}>
      <div className={classes.profileInfoBoxHeading}>
        <Typography variant="h6">Znajomi użytkownika</Typography>
        <Link
          component="button"
          variant="subtitle1"
          onClick={() => {
            dispatch(changeProfileNav(3));
          }}
        >
          Zobacz więcej
        </Link>
      </div>
      <div
        className={classes.profileInfoBoxContent}
        style={{ paddingBottom: '0px' }}
      >
        <ImageList
          cols={3}
          rowHeight={120}
          sx={{
            height:
              userFriends.length < 3 ? 190 : userFriends.length > 6 ? 560 : 370,
          }}
          className={classes.imageList}
          gap={3}
          variant="quilted"
        >
          {userFriends &&
            userFriends.map((friend, index) => {
              if (index < 9) {
                return (
                  <ImageListItem
                    key={friend.friendId}
                    className={classes.imageListItem}
                    onClick={() =>
                      history.push('/app/profile/' + friend.user.userId)
                    }
                  >
                    <img
                      src={
                        friend.user.profilePhoto !== null
                          ? friend.user.profilePhoto.url
                          : defaultUserPhoto
                      }
                      alt={friend.user.firstName + ' ' + friend.user.lastName}
                    />
                    <ImageListItemBar
                      title={
                        <Typography
                          variant="body1"
                          className={classes.imageListItemTitle}
                        >
                          {friend.user.firstName}
                          <br />
                          {friend.user.lastName}
                        </Typography>
                      }
                      position="below"
                    />
                  </ImageListItem>
                );
              }
            })}
        </ImageList>
      </div>
    </Paper>
  );
};

UserFriendsBox.propTypes = {
  classes: PropTypes.object.isRequired,
  userFriends: PropTypes.array.isRequired,
};

export default withStyles(styles)(UserFriendsBox);
