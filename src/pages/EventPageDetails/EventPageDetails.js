import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './eventPageDetails-jss';
import { PropTypes } from 'prop-types';
import {
  deleteEvent,
  getEventById,
  respondToEvent,
  shareEvent,
} from '../../redux/actions/eventActions';
import { useHistory, useParams } from 'react-router-dom';
import defaultEventImgLandscape from '../../assets/default-event-photo-landscape.png';
import { Button, Typography } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import Popup from '../../components/Popup/Popup';
import EventForm from '../../components/Forms/EventForm';
import ActionConfirmation from '../../components/ActionConfirmation/ActionConfirmation';
import EventInvitation from '../../components/EventInvitation/EventInvitation';
import CircularProgress from '@mui/material/CircularProgress';

const EventsPageDetails = (props) => {
  const { classes } = props;

  let { eventId } = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  const event = useSelector((state) => state.events.eventDetails);
  const loggedUser = useSelector((state) => state.auth.user);
  const loggedUserFriends = useSelector((state) => state.auth.friends);

  const [openEventEditionPopup, setOpenEventEditionPopup] = useState(false);
  const [openDeleteEventPopup, setOpenDeleteEventPopup] = useState(false);
  const [openEventInvitationsPopup, setOpenEventInvitationsPopup] =
    useState(false);

  useEffect(() => {
    dispatch(getEventById(eventId));
  }, [eventId]);

  const handleClickEventReaction = (reaction) => {
    dispatch(respondToEvent(eventId, reaction));
  };

  const handleClickShareEvent = () => {
    dispatch(shareEvent(eventId));
  };

  const handleCloseEventEdition = () => {
    setOpenEventEditionPopup(false);
  };

  const handleClickDeleteEvent = () => {
    dispatch(deleteEvent(eventId)).then(() => history.push('/app/events'));
  };

  const handleCloseDeleteEventPopup = () => {
    setOpenDeleteEventPopup(false);
  };

  const handleCloseEventInvitationsPopup = () => {
    setOpenEventInvitationsPopup(false);
  };

  return (
    <>
      {event ? (
        <div>
          <Paper elevation={4} className={classes.eventHeadingContainer}>
            <Button
              variant="contained"
              className={classes.backToEventsBtn}
              onClick={() => history.push('/app/events')}
            >
              <ArrowBackIcon sx={{ marginRight: '5px' }} />
              Wróć do listy wydarzeń
            </Button>
            <img
              src={event.image ? event.image.url : defaultEventImgLandscape}
              alt="Zdjęcie wydarzenia"
              className={classes.eventImage}
            />
            <div className={classes.eventTitleBox}>
              <Typography variant="h3" fontWeight={400}>
                {event.title}
              </Typography>
              <Typography variant="subtitle1" marginTop="5px">
                {'• ' + event.description}
              </Typography>
              <div className={classes.dateInfoBox}>
                <div className={classes.dateItem}>
                  <Typography variant="body1" fontWeight="bold">
                    Dzień
                  </Typography>
                  {new Date(event.eventDate).getDay()}
                </div>
                <div className={classes.dateItem}>
                  <Typography variant="body1" fontWeight="bold">
                    Miesiąc
                  </Typography>
                  {new Date(event.eventDate).toLocaleString('default', {
                    month: 'long',
                  })}
                </div>
                <div className={classes.dateItem}>
                  <Typography variant="body1" fontWeight="bold">
                    Rok
                  </Typography>
                  {new Date(event.eventDate).getFullYear()}
                </div>
                <div
                  className={classes.dateItem}
                  style={{ marginRight: '40px' }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    Dzień tygodnia
                  </Typography>
                  {new Date(event.eventDate).toLocaleDateString('default', {
                    weekday: 'long',
                  })}
                </div>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="#FF1C00"
                >
                  {'o godz. ' +
                    new Date(event.eventDate)
                      .toLocaleTimeString()
                      .substring(0, 5)}
                </Typography>
                {event.eventAuthor.userId === loggedUser.userId && (
                  <div className={classes.eventManageBtnContainer}>
                    <Button
                      variant="contained"
                      className={classes.eventManageActionBtn}
                      onClick={() => setOpenEventEditionPopup(true)}
                    >
                      <EditIcon sx={{ marginRight: '5px' }} />
                      Edytuj wydarzenie
                    </Button>
                    <Button
                      variant="contained"
                      className={classes.eventManageActionBtn}
                      onClick={() => setOpenDeleteEventPopup(true)}
                    >
                      <DeleteIcon sx={{ marginRight: '5px' }} />
                      Usuń wydarzenie
                    </Button>
                    <Popup
                      open={openDeleteEventPopup}
                      type="confirmation"
                      title="Usuwanie wydarzenia"
                      onClose={handleCloseDeleteEventPopup}
                    >
                      <ActionConfirmation
                        title="Czy napewno chcesz usunąć to wydarzenie?"
                        confirmationAction={handleClickDeleteEvent}
                        rejectionAction={handleCloseDeleteEventPopup}
                      />
                    </Popup>
                  </div>
                )}
                <Popup
                  open={openEventEditionPopup}
                  type="event"
                  title="Edytuj wydarzenie"
                  onClose={handleCloseEventEdition}
                >
                  <EventForm
                    closePopup={handleCloseEventEdition}
                    edition
                    eventId={parseInt(eventId)}
                    editedTitle={event.title}
                    editedDescription={event.description}
                    editedDate={event.eventDate.substring(0, 10)}
                    editedTime={new Date(event.eventDate)
                      .toLocaleTimeString()
                      .substring(0, 5)}
                    editedCountry={event.eventAddress.country}
                    editedCity={event.eventAddress.city}
                    editedStreet={event.eventAddress.street}
                    editedZipCode={event.eventAddress.zipCode}
                    eventImage={event.image}
                  />
                </Popup>
              </div>
            </div>
            <div className={classes.eventActionContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classes.eventActionBtn}
                onClick={() => handleClickEventReaction('TAKE_PART')}
                disabled={
                  event.members.filter(
                    (member) =>
                      member.eventMember.userId === loggedUser.userId &&
                      member.participationStatus === 'TAKE_PART'
                  ).length > 0
                }
              >
                <CheckCircleIcon sx={{ marginRight: '5px' }} />
                Weź udział
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.eventActionBtn}
                onClick={() => handleClickEventReaction('INTERESTED')}
                disabled={
                  event.members.filter(
                    (member) =>
                      member.eventMember.userId === loggedUser.userId &&
                      member.participationStatus === 'INTERESTED'
                  ).length > 0
                }
              >
                <GradeIcon sx={{ marginRight: '5px' }} />
                Interesuje mnie
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.eventActionBtn}
                onClick={() => setOpenEventInvitationsPopup(true)}
              >
                <PersonAddAlt1Icon sx={{ marginRight: '5px' }} />
                Zaproś na wydarzenie
              </Button>
              <Popup
                open={openEventInvitationsPopup}
                type="eventInvitations"
                title="Zaproś na wydarzenie"
                onClose={handleCloseEventInvitationsPopup}
              >
                <div className={classes.eventInvitationsList}>
                  {loggedUserFriends.map((friend) => {
                    if (
                      event.members.filter(
                        (member) =>
                          member.eventMember.userId === friend.user.userId
                      ).length === 0
                    ) {
                      return (
                        <EventInvitation
                          key={friend.user.userId}
                          eventId={parseInt(eventId)}
                          userFriendId={friend.user.userId}
                          friendName={
                            friend.user.firstName + ' ' + friend.user.lastName
                          }
                          friendAvatar={friend.user.profilePhoto}
                        />
                      );
                    } else {
                      return (
                        <EventInvitation
                          key={friend.user.userId}
                          disabled
                          eventId={parseInt(eventId)}
                          userFriendId={friend.user.userId}
                          friendName={
                            friend.user.firstName + ' ' + friend.user.lastName
                          }
                          friendAvatar={friend.user.profilePhoto}
                        />
                      );
                    }
                  })}
                  {loggedUserFriends.length === 0 && (
                    <Typography
                      fontWeight="bold"
                      textAlign="center"
                      variant="h6"
                      marginBottom="20px"
                    >
                      Brak znajomych
                    </Typography>
                  )}
                </div>
              </Popup>
              <Button
                variant="contained"
                color="secondary"
                className={classes.eventActionBtn}
                onClick={handleClickShareEvent}
              >
                <ShareIcon sx={{ marginRight: '5px' }} />
                Udostępnij
              </Button>
            </div>
          </Paper>
        </div>
      ) : (
        <div className={classes.loadingContainer}>
          <CircularProgress color="secondary" />
        </div>
      )}
    </>
  );
};

EventsPageDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventsPageDetails);
