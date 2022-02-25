import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './eventDetailsPage-jss';
import { PropTypes } from 'prop-types';
import {
  deleteEvent,
  getEventById,
  respondToEvent,
  shareEvent,
} from '../../redux/actions/eventActions';
import { useHistory, useParams } from 'react-router-dom';
import defaultEventImgLandscape from '../../assets/default-event-photo-landscape.png';
import { Button, Divider, Tooltip, Typography } from '@mui/material';
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
import EventIcon from '@mui/icons-material/Event';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import InfoIcon from '@mui/icons-material/Info';
import LanguageIcon from '@mui/icons-material/Language';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import PeopleIcon from '@mui/icons-material/People';
import UsersListPopup from '../../components/UsersListPopup/UsersListPopup';
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';

const EventsPageDetails = (props) => {
  const { classes } = props;

  let { eventId } = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  const event = useSelector((state) => state.events.eventDetails);
  const loggedUser = useSelector((state) => state.auth.user);
  const isUserRemember = useSelector((state) => state.auth.remember);
  const loggedUserFriends = useSelector((state) => state.friends.userFriends);

  const [openEventEditionPopup, setOpenEventEditionPopup] = useState(false);
  const [openDeleteEventPopup, setOpenDeleteEventPopup] = useState(false);
  const [openEventInvitationsPopup, setOpenEventInvitationsPopup] =
    useState(false);
  const [openUsersInterestedPopup, setOpenUsersInterestedPopup] =
    useState(false);
  const [openUsersTakePartPopup, setOpenUsersTakePartPopup] = useState(false);
  const [openUserSharingPopup, setOpenUserSharingPopup] = useState(false);

  useEffect(() => {
    (async () => {
      if (
        isUserRemember &&
        new Date() > new Date(loggedUser.accessTokenExpirationDate)
      ) {
        dispatch(setTokenRefreshing(true));
        await dispatch(refreshUserToken(loggedUser.refreshToken)).then(() => {
          dispatch(setTokenRefreshing(false));
        });
      }
      dispatch(getEventById(eventId));
    })();
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

  const calculateDifferenceBetweenDate = (date1, date2) => {
    const difference = date1 - date2;

    if (difference < 0) {
      return 'Wydarzenie już się odbyło!';
    } else {
      let days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      let hours = Math.ceil((difference / (1000 * 60 * 60)) % 24);

      return days + ' dni i ' + hours + ' godz.';
    }
  };

  const handleCloseUsersInterestedPopup = () => {
    setOpenUsersInterestedPopup(false);
  };

  const handleCloseUsersTakePartPopup = () => {
    setOpenUsersTakePartPopup(false);
  };

  const handleCloseUserSharingPopup = () => {
    setOpenUserSharingPopup(false);
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
          <div className={classes.eventDetailsContainer}>
            <div className={classes.eventDetailsLeftContent}>
              <Paper elevation={4} className={classes.eventDetailsInfo}>
                <Typography variant="h6" fontWeight="bold">
                  Szczegóły
                </Typography>
                <div className={classes.eventDetailsItem}>
                  <EventIcon fontSize="medium" />
                  <Typography
                    variant="subtitle2"
                    className={classes.detailsItemText}
                  >
                    <span className={classes.detailsItemTitle}>
                      {'Nazwa: '}
                    </span>
                    {event.title}
                  </Typography>
                </div>
                <div className={classes.eventDetailsItem}>
                  <AccessTimeFilledIcon fontSize="medium" />
                  <Typography
                    variant="subtitle2"
                    className={classes.detailsItemText}
                  >
                    <span className={classes.detailsItemTitle}>
                      {'Rozpoczyna się za: '}
                    </span>
                    {calculateDifferenceBetweenDate(
                      new Date(event.eventDate),
                      new Date()
                    )}
                  </Typography>
                </div>
                <div className={classes.eventDetailsItem}>
                  <AddCircleIcon fontSize="medium" />
                  <Typography
                    variant="subtitle2"
                    className={classes.detailsItemText}
                  >
                    <span className={classes.detailsItemTitle}>
                      {'Data utworzenia: '}
                    </span>
                    {new Date(event.createdAt)
                      .toJSON()
                      .slice(0, 10)
                      .split('-')
                      .reverse()
                      .join('.') +
                      new Date(event.createdAt)
                        .toJSON()
                        .slice(10, 16)
                        .replace('T', ' ')}
                  </Typography>
                </div>
                <div className={classes.eventDetailsItem}>
                  <PersonIcon fontSize="medium" />
                  <Tooltip title="Zobacz profil" placement="right">
                    <Typography
                      variant="subtitle2"
                      className={classes.detailsItemText}
                    >
                      <span className={classes.detailsItemTitle}>
                        {'Organizator: '}
                      </span>
                      <span
                        className={classes.detailsItemTextLink}
                        onClick={() =>
                          history.push(
                            '/app/profile/' + event.eventAuthor.userId
                          )
                        }
                      >
                        {event.eventAuthor.firstName +
                          ' ' +
                          event.eventAuthor.lastName}
                      </span>
                    </Typography>
                  </Tooltip>
                </div>
                <div className={classes.eventDetailsItem}>
                  <InfoIcon fontSize="medium" />
                  <Typography
                    variant="subtitle2"
                    className={classes.detailsItemText}
                  >
                    <span className={classes.detailsItemTitle}>{'Opis: '}</span>
                    {event.description}
                  </Typography>
                </div>
                <Divider />
                <div className={classes.eventDetailsItem}>
                  <LanguageIcon fontSize="medium" />
                  <Typography
                    variant="subtitle2"
                    className={classes.detailsItemText}
                  >
                    <span className={classes.detailsItemTitle}>
                      {'Państwo: '}
                    </span>
                    {event.eventAddress.country}
                  </Typography>
                </div>
                <div className={classes.eventDetailsItem}>
                  <LocationCityIcon fontSize="medium" />
                  <Typography
                    variant="subtitle2"
                    className={classes.detailsItemText}
                  >
                    <span className={classes.detailsItemTitle}>
                      {'Miasto: '}
                    </span>
                    {event.eventAddress.city}
                  </Typography>
                </div>
                <div className={classes.eventDetailsItem}>
                  <CalendarViewDayIcon fontSize="medium" />
                  <Typography
                    variant="subtitle2"
                    className={classes.detailsItemText}
                  >
                    <span className={classes.detailsItemTitle}>
                      {'Ulica: '}
                    </span>
                    {event.eventAddress.city ? event.eventAddress.city : '-'}
                  </Typography>
                </div>
                <div style={{ display: 'flex', marginTop: '14px' }}>
                  <MarkAsUnreadIcon fontSize="medium" />
                  <Typography
                    variant="subtitle2"
                    className={classes.detailsItemText}
                  >
                    <span className={classes.detailsItemTitle}>
                      {'Kod pocztowy: '}
                    </span>
                    {event.eventAddress.zipCode}
                  </Typography>
                </div>
              </Paper>
            </div>
            <div className={classes.eventDetailsRightContent}>
              <Paper elevation={4} className={classes.eventDetailsInfo}>
                <Typography variant="h6" fontWeight="bold">
                  Uczestnicy
                </Typography>
                <div className={classes.eventDetailsItem}>
                  <PeopleIcon fontSize="large" />
                  <Typography variant="subtitle1" marginLeft="10px">
                    {event.members.filter(
                      (member) =>
                        member.participationStatus === 'INTERESTED' ||
                        member.participationStatus === 'TAKE_PART'
                    ).length + ' - liczba reakcji na wydarzenie'}
                  </Typography>
                </div>
                <div className={classes.eventMembersStatsBox}>
                  <div
                    className={classes.eventMembersStatsBoxItem}
                    onClick={() => setOpenUsersInterestedPopup(true)}
                  >
                    <GradeIcon fontSize="medium" />
                    <Typography variant="subtitle1" marginLeft="10px">
                      {event.members.filter(
                        (member) => member.participationStatus === 'INTERESTED'
                      ).length + ' - liczba os. zainteresowanych'}
                    </Typography>
                  </div>
                  <UsersListPopup
                    title="Użytkownicy zainteresowani"
                    open={openUsersInterestedPopup}
                    users={event.members
                      .filter(
                        (member) => member.participationStatus === 'INTERESTED'
                      )
                      .map((member) => member.eventMember)}
                    onClose={handleCloseUsersInterestedPopup}
                  />
                  <div
                    className={classes.eventMembersStatsBoxItem}
                    onClick={() => setOpenUsersTakePartPopup(true)}
                  >
                    <CheckCircleIcon fontSize="medium" />
                    <Typography variant="subtitle1" marginLeft="10px">
                      {event.members.filter(
                        (member) => member.participationStatus === 'TAKE_PART'
                      ).length + ' - liczba os. biorących udział'}
                    </Typography>
                  </div>
                  <UsersListPopup
                    title="Użytkownicy biorący udział"
                    open={openUsersTakePartPopup}
                    users={event.members
                      .filter(
                        (member) => member.participationStatus === 'TAKE_PART'
                      )
                      .map((member) => member.eventMember)}
                    onClose={handleCloseUsersTakePartPopup}
                  />
                </div>
                <Typography variant="h6" fontWeight="bold" marginTop="14px">
                  Udostępnienia
                </Typography>
                <div
                  className={classes.eventSharingStats}
                  onClick={() => setOpenUserSharingPopup(true)}
                >
                  <ShareIcon fontSize="large" />
                  <Typography variant="subtitle1" marginLeft="10px">
                    {event.sharing.length + ' - liczba udostępnień wydarzenia'}
                  </Typography>
                </div>
                <UsersListPopup
                  title="Udostępnienia użytkowników"
                  open={openUserSharingPopup}
                  users={event.sharing.map((el) => el.authorOfSharing)}
                  onClose={handleCloseUserSharingPopup}
                />
              </Paper>
            </div>
          </div>
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
