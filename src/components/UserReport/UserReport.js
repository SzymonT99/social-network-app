import React from 'react';
import styles from './userReport-jss';
import { withStyles } from '@mui/styles';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import ActivityHeading from '../ActivityHeading/ActivityHeading';
import { Button, Divider, MenuItem, Typography } from '@mui/material';
import { manageUserReport } from '../../redux/actions/adminActions';

const reportTypes = {
  RUDE_POST: 'Nieodpowiednia treść postu',
  RUDE_COMMENT: 'Obraźliwy komentarz',
  OFFENSIVE_NAME: 'Nieodpowiednia nazwa użytkownika',
  VULGAR_PICTURE: 'Wulgarne zdjęcie',
  IMPROPER_PROFILE: 'Nieodpowiednia zawartość profilu',
};

const UserReport = (props) => {
  const {
    classes,
    reportId,
    reportType,
    description,
    createdAt,
    senderUser,
    isConfirmed,
  } = props;

  const dispatch = useDispatch();

  const handleClickDecideReportUser = (confirmation) => {
    dispatch(manageUserReport(reportId, confirmation));
  };

  return (
    <div className={classes.reportContainer}>
      <ActivityHeading
        authorId={senderUser.userId}
        authorName={senderUser.firstName + ' ' + senderUser.lastName}
        profilePhoto={senderUser.profilePhoto}
        createdDate={new Date(createdAt)}
        activityTitle={' wysłał(a) zgłoszenie'}
        userStatus={senderUser.activityStatus}
      />
      <Divider />
      <div className={classes.reportContent}>
        <Typography variant="subtitle2">
          <strong>Rodzaj zgłoszenia: </strong>
          {reportTypes[reportType]}
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold">
          Treść zgłoszenia:
        </Typography>
        <Typography variant="subtitle2">
          {description ? description : 'Brak'}
        </Typography>
      </div>
      <Divider />
      {isConfirmed === null ? (
        <div className={classes.reportActionsContainer}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleClickDecideReportUser(true)}
          >
            Potwierdź
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClickDecideReportUser(false)}
          >
            Odrzuć
          </Button>
        </div>
      ) : (
        <Typography variant="subtitle2" marginTop="10px" color="secondary">
          <strong>Stan zgłoszenia: </strong>
          {isConfirmed ? 'Potwierdzono' : 'Odrzucono'}
        </Typography>
      )}
    </div>
  );
};

UserReport.propTypes = {
  classes: PropTypes.object.isRequired,
  reportId: PropTypes.number.isRequired,
  reportType: PropTypes.string.isRequired,
  senderUser: PropTypes.object.isRequired,
  description: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool,
};

export default withStyles(styles)(UserReport);
