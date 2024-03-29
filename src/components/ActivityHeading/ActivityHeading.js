import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './activityHeading-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import { Badge } from '@mui/material';
import defaultUserPhoto from '../../assets/default-profile-photo.jpg';
import defaultImg from '../../assets/default-image.png';
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router-dom';
import { formatActivityDate } from '../../utils/formatActivityDate';
import { formatDateWithTime } from '../../utils/formatDateWithTime';

const ActivityHeading = (props) => {
  const {
    classes,
    authorId,
    authorName,
    profilePhoto,
    userStatus,
    activityTitle,
    isEdited,
    createdDate,
    editionDate,
    children,
    postGroupActivity,
    groupId,
    groupName,
    groupImage,
  } = props;

  const history = useHistory();

  const activeStatus = {
    ONLINE: '#1CCD16',
    BE_RIGHT_BACK: '#f59c11',
    BUSY: '#67207c',
    OFFLINE: '#FF1C00',
  };

  return (
    <div className={classes.headingBox}>
      <div className={classes.authorContainer}>
        {postGroupActivity && (
          <div className={classes.groupActivityContainer}>
            <img
              src={groupImage ? groupImage.url : defaultImg}
              alt={groupName}
              className={classes.groupImageBox}
              onClick={() => history.push('/app/groups/' + groupId)}
            />
            <Badge
              variant="dot"
              overlap="circular"
              sx={{
                '& .MuiBadge-badge': {
                  border: `1px solid #FFF`,
                  backgroundColor: activeStatus[userStatus],
                },
              }}
            >
              <Avatar
                src={profilePhoto ? profilePhoto.url : defaultUserPhoto}
                alt={authorName}
                className={classes.groupMemberPhoto}
              />
            </Badge>
          </div>
        )}
        {!postGroupActivity && (
          <Badge
            variant="dot"
            overlap="circular"
            className={classes.avatarBadge}
            sx={{
              marginRight: '20px',
              '& .MuiBadge-badge': {
                backgroundColor: activeStatus[userStatus],
              },
            }}
          >
            <Avatar
              src={profilePhoto ? profilePhoto.url : defaultUserPhoto}
              alt={authorName}
              className={classes.userPhoto}
              onClick={() => history.push('/app/profile/' + authorId)}
            />
          </Badge>
        )}
        <div>
          {postGroupActivity && (
            <Typography
              variant="subtitle1"
              className={classes.groupNameText}
              onClick={() => history.push('/app/groups/' + groupId)}
              noWrap
            >
              {groupName}
            </Typography>
          )}
          <Typography
            variant={!postGroupActivity ? 'subtitle1' : 'body1'}
            fontWeight="bold"
            sx={{ lineHeight: { xs: 1.2, sm: 1.75 } }}
          >
            <span
              className={classes.authorName}
              onClick={() => history.push('/app/profile/' + authorId)}
            >
              {authorName}
            </span>
            <span className={classes.actionName}>
              {activityTitle + (postGroupActivity ? ' w grupie' : '')}
            </span>
          </Typography>
          <Typography variant="body2" noWrap>
            {formatActivityDate(createdDate)}
          </Typography>
          {isEdited && !postGroupActivity && (
            <Typography variant="body2" fontWeight={500}>
              {'edytowano ' + formatDateWithTime(editionDate)}
            </Typography>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

ActivityHeading.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element,
  authorId: PropTypes.number.isRequired,
  authorName: PropTypes.string.isRequired,
  profilePhoto: PropTypes.object,
  userStatus: PropTypes.string.isRequired,
  activityTitle: PropTypes.string.isRequired,
  createdDate: PropTypes.object.isRequired,
  postGroupActivity: PropTypes.bool,
  isEdited: PropTypes.bool,
  editionDate: PropTypes.object,
  groupId: PropTypes.number,
  groupName: PropTypes.string,
  groupImage: PropTypes.object,
};

ActivityHeading.defaultProps = {
  postGroupActivity: false,
  isEdited: false,
};

export default withStyles(styles)(ActivityHeading);
