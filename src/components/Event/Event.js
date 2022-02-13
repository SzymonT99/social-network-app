import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './event-jss';
import { PropTypes } from 'prop-types';
import defaultEventImg from '../../assets/default-event-photo.png';
import { Button, Divider, Typography } from '@mui/material';
import { LocationOn, AccessTime, Share } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEvents,
  respondToEvent,
  shareEvent,
} from '../../redux/actions/eventActions';

const Event = (props) => {
  const {
    classes,
    eventId,
    updateEvents,
    title,
    date,
    members,
    address,
    eventImage,
    invitation,
    invitationDate,
  } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.user);

  const handleClickEventReaction = (event, reaction) => {
    dispatch(respondToEvent(eventId, reaction)).then(() =>
      dispatch(getEvents()).then((data) => {
        updateEvents(data);
      })
    );
    event.stopPropagation();
  };

  const handleClickShareEvent = (event, id) => {
    dispatch(shareEvent(id));
    event.stopPropagation();
  };

  return (
    <div
      className={classes.eventContainer}
      onClick={() => history.push('/app/events/' + eventId)}
    >
      {invitation && (
        <div className={classes.invitationInfo}>
          <Typography variant="subtitle2" fontWeight={500} textAlign="center">
            Zaproszono Cię na wydarzenie
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
        src={eventImage ? eventImage.url : defaultEventImg}
        className={classes.eventImage}
        alt="Zdjęcie wydarzenia"
      />
      <Typography variant="h6" fontWeight="bold" noWrap>
        {title}
      </Typography>
      <div className={classes.eventInformationRow}>
        <AccessTime className={classes.timeIcon} />
        <Typography variant="subtitle2">
          {new Date(date).toJSON().slice(0, 10).split('-').reverse().join('.') +
            new Date(date).toJSON().slice(10, 16).replace('T', ' ')}
        </Typography>
      </div>
      <div className={classes.eventInformationRow}>
        <LocationOn className={classes.timeIcon} />
        <Typography variant="subtitle2" noWrap>
          {address.country +
            ', ' +
            address.city +
            ', ' +
            address.street +
            ', ' +
            address.zipCode}
        </Typography>
      </div>
      {!invitation && (
        <Typography variant="body1" fontWeight={300}>
          {`${
            members.filter(
              (member) => member.participationStatus === 'INTERESTED'
            ).length
          } os. interesuje sie | ${
            members.filter(
              (member) => member.participationStatus === 'TAKE_PART'
            ).length
          } os. weźmie udział`}
        </Typography>
      )}
      <div className={classes.eventBtnContainer}>
        <Button
          color="secondary"
          variant="contained"
          className={classes.eventReactionBtn}
          onClick={(event) => handleClickEventReaction(event, 'INTERESTED')}
          disabled={
            members.filter(
              (member) =>
                member.eventMember.userId === loggedUser.userId &&
                member.participationStatus === 'INTERESTED'
            ).length > 0
          }
        >
          Interesuje mnie
        </Button>
        <Button
          color="secondary"
          variant="contained"
          className={classes.eventReactionBtn}
          onClick={(event) => handleClickEventReaction(event, 'TAKE_PART')}
          disabled={
            members.filter(
              (member) =>
                member.eventMember.userId === loggedUser.userId &&
                member.participationStatus === 'TAKE_PART'
            ).length > 0
          }
        >
          Weź udział
        </Button>
        {!invitation && (
          <Button
            color="primary"
            variant="contained"
            className={classes.eventReactionBtn}
            onClick={(event) => handleClickShareEvent(event, eventId)}
          >
            <Share />
          </Button>
        )}
        {invitation && (
          <Button
            color="secondary"
            variant="contained"
            className={classes.eventReactionBtn}
            onClick={(event) => handleClickEventReaction(event, 'REJECTED')}
          >
            Odrzuć
          </Button>
        )}
      </div>
    </div>
  );
};

Event.propTypes = {
  classes: PropTypes.object.isRequired,
  eventId: PropTypes.number.isRequired,
  updateEvents: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
  eventImage: PropTypes.object,
  invitation: PropTypes.bool,
  invitationDate: PropTypes.string,
};

export default withStyles(styles)(Event);
