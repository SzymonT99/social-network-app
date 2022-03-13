import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './group-jss';
import { PropTypes } from 'prop-types';
import defaultImg from '../../assets/default-image.png';
import { Button, Divider, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  getGroupDetails,
  requestToJoinGroup,
  respondToGroupInvitation,
} from '../../redux/actions/groupActions';

const Group = (props) => {
  const {
    classes,
    groupId,
    name,
    interests,
    groupCreationDate,
    membersNumber,
    members,
    postsNumber,
    groupImage,
    invitation,
    invitationDate,
  } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);

  const handleClickSendRequestToJoinGroup = () => {
    dispatch(requestToJoinGroup(groupId));
  };

  const handleClickRespondToGroupInvitation = (isInvitationAccepted) => {
    dispatch(respondToGroupInvitation(groupId, isInvitationAccepted)).then(() =>
      dispatch(getGroupDetails(groupId)).then((data) => {
        if (data && isInvitationAccepted) {
          history.push('/app/groups/' + groupId);
        }
      })
    );
  };

  const isUseGroupMember =
    members.filter(
      (groupMember) => groupMember.user.userId === loggedUser.userId
    ).length !== 0;

  return (
    <div className={classes.groupContainer}>
      {invitation && (
        <div className={classes.invitationInfo}>
          <Typography variant="subtitle2" fontWeight={500} textAlign="center">
            Zaproszono Cię do grupy
          </Typography>
          <Typography variant="body1" textAlign="center">
            {'Dnia ' +
              new Date(invitationDate)
                .toJSON()
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('.') +
              ' o godz. ' +
              new Date(invitationDate).toJSON().slice(10, 16).replace('T', ' ')}
          </Typography>
        </div>
      )}
      <img
        src={groupImage ? groupImage.url : defaultImg}
        className={classes.groupImage}
        style={invitation && { borderRadius: '0px' }}
        alt="Zdjęcie Grupy"
      />
      <div className={classes.groupInformationContainer}>
        <Typography variant="h6" className={classes.groupTitleText}>
          {name}
        </Typography>
        <Typography variant="subtitle2">Tematyka grupy:</Typography>
        <div className={classes.groupInterestsBox}>
          {interests.length !== 0 ? (
            interests.map((interest) => (
              <Typography
                key={interest.interestId}
                variant="body1"
                component="span"
              >
                {interest.name + ', '}
              </Typography>
            ))
          ) : (
            <Typography variant="body1" component="span">
              {'Nie określono'}
            </Typography>
          )}
        </div>
        <div className={classes.groupStatsBox}>
          <Typography variant="subtitle2" textAlign="center" fontWeight="bold">
            {membersNumber} <br />{' '}
            <span className={classes.statsDescription}>Członków</span>
          </Typography>
          <Typography
            variant="subtitle2"
            textAlign="center"
            fontWeight="bold"
            className={classes.postsNumberStats}
          >
            {postsNumber} <br />{' '}
            <span className={classes.statsDescription}>Postów</span>
          </Typography>
          <Typography variant="subtitle2" textAlign="center" fontWeight="bold">
            {new Date(groupCreationDate)
              .toJSON()
              .slice(0, 10)
              .split('-')
              .reverse()
              .join('.')}
            <br />
            <span className={classes.statsDescription}>Data założenia</span>
          </Typography>
        </div>

        <div className={classes.groupBtnContainer}>
          {!invitation && (
            <Button
              color="secondary"
              variant="contained"
              className={classes.groupBtn}
              onClick={handleClickSendRequestToJoinGroup}
              disabled={isUseGroupMember}
            >
              {!isUseGroupMember ? 'Dołącz do grupy' : 'Należysz do grupy'}
            </Button>
          )}
          {invitation && (
            <>
              <Button
                color="secondary"
                variant="contained"
                className={classes.groupInvitationBtn}
                onClick={() => handleClickRespondToGroupInvitation(true)}
              >
                Akceptuj
              </Button>
              <Button
                color="primary"
                variant="contained"
                className={classes.groupInvitationBtn}
                onClick={() => handleClickRespondToGroupInvitation(false)}
              >
                Odrzuć
              </Button>
            </>
          )}
          <Button
            variant="contained"
            className={classNames(
              !invitation ? classes.groupBtn : classes.groupInvitationBtn,
              classes.showGroupBtn
            )}
            onClick={() => history.push('/app/groups/' + groupId)}
          >
            Zobacz
          </Button>
        </div>
      </div>
    </div>
  );
};

Group.propTypes = {
  classes: PropTypes.object.isRequired,
  groupId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  interests: PropTypes.array.isRequired,
  groupCreationDate: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired,
  membersNumber: PropTypes.number.isRequired,
  postsNumber: PropTypes.number.isRequired,
  groupImage: PropTypes.object,
  invitation: PropTypes.bool,
  invitationDate: PropTypes.string,
};

export default withStyles(styles)(Group);
