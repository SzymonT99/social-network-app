import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './eventsPage-jss';
import { PropTypes } from 'prop-types';
import EventIcon from '@mui/icons-material/Event';
import {
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  Tab,
  TextField,
  Typography,
} from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import TabPanelMUI from '@mui/lab/TabPanel';
import SearchIcon from '@mui/icons-material/Search';
import Event from '../../components/Event/Event';
import {
  getEventInvitations,
  getEvents,
} from '../../redux/actions/eventActions';
import Popup from '../../components/Popup/Popup';
import EventForm from '../../components/Forms/EventForm';
import CircularProgress from '@mui/material/CircularProgress';
import {
  refreshUserToken,
  setTokenRefreshing,
} from '../../redux/actions/authActions';

const EventsPage = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();

  const events = useSelector((state) => state.events.allEvents);
  const eventInvitations = useSelector(
    (state) => state.events.eventInvitations
  );
  const loggedUser = useSelector((state) => state.auth.user);
  const isUserRemember = useSelector((state) => state.auth.remember);

  const [eventTabType, setEventTabType] = useState('1');
  const [eventsOrder, setEventsOrder] = useState(1);
  const [openEventCreation, setOpenEventCreation] = useState(false);
  const [searchedEventText, setSearchedEventText] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventsPageNumber, setEventsPageNumber] = useState(1);

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
      dispatch(getEvents()).then((data) => {
        setFilteredEvents(data);
      });
      dispatch(getEventInvitations());
    })();
  }, []);

  const handleChangeEventTabType = (event, newValue) => {
    setEventTabType(newValue);
  };

  const handleChangeEventsOrder = (event) => {
    let currentEventOrder = event.target.value;
    setEventsOrder(currentEventOrder);
  };

  const sortEvents = (eventOrderType) => {
    if (eventOrderType === 1) {
      filteredEvents.sort(
        (x, y) => new Date(y.createdAt) - new Date(x.createdAt)
      );
    } else if (eventOrderType === 2) {
      filteredEvents.sort((x, y) => {
        return (
          y.members.filter(
            (member) =>
              member.participationStatus === 'INTERESTED' ||
              member.participationStatus === 'TAKE_PART'
          ).length -
          x.members.filter(
            (member) =>
              member.participationStatus === 'INTERESTED' ||
              member.participationStatus === 'TAKE_PART'
          ).length
        );
      });
    } else if (eventOrderType === 3) {
      filteredEvents.sort((a, b) => {
        let x = a.title.toUpperCase(),
          y = b.title.toUpperCase();
        return x === y ? 0 : x > y ? 1 : -1;
      });
    }
    return filteredEvents;
  };

  const handleCloseEventCreation = () => {
    setOpenEventCreation(false);
  };

  const handleChangeSearchedEvent = (event) => {
    const typedText = event.target.value;
    setSearchedEventText(typedText);

    setFilteredEvents(
      events.filter((event) =>
        event.title.toUpperCase().includes(typedText.toUpperCase())
      )
    );
  };

  const handleChangeEventsPageNumber = (event, value) => {
    setEventsPageNumber(value);
  };

  const updateEvents = (updatedEvents) => {
    setFilteredEvents(updatedEvents);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.headingEventBox}>
        <EventIcon className={classes.eventIcon} />
        <Typography className={classes.eventHeadingText} variant="h3">
          Wydarzenia
        </Typography>
      </div>
      <TabContext value={eventTabType}>
        <Paper elevation={4} className={classes.eventsTopContainer}>
          <TabList
            onChange={handleChangeEventTabType}
            className={classes.tabsContainer}
          >
            <Tab
              className={classes.tabItem}
              label="Wszystkie wydarzenia"
              value={'1'}
            />
            <Tab
              className={classes.tabItem}
              label="Zaproszenia na wydarzenie"
              value={'2'}
            />
          </TabList>
          <Button
            variant="contained"
            color="primary"
            className={classes.addEventBtn}
            onClick={() => setOpenEventCreation(true)}
          >
            Utwórz nowe wydarzenie
          </Button>
          <Popup
            open={openEventCreation}
            type="event"
            title="Utwórz wydarzenie"
            onClose={handleCloseEventCreation}
          >
            <EventForm
              closePopup={handleCloseEventCreation}
              updateEvents={updateEvents}
            />
          </Popup>
        </Paper>
        {eventTabType !== '2' && (
          <Paper elevation={4} className={classes.eventSearchbarContainer}>
            <TextField
              id="event-searchbar"
              placeholder="Szukaj wydarzenia"
              className={classes.eventSearchbar}
              value={searchedEventText}
              onChange={handleChangeSearchedEvent}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <div className={classes.eventsOrderBox}>
              <Typography
                component="p"
                variant="subtitle1"
                fontWeight="bold"
                marginRight="10px"
              >
                Sortuj według:
              </Typography>
              <FormControl>
                <Select
                  className={classes.eventOrderSelect}
                  value={eventsOrder}
                  onChange={handleChangeEventsOrder}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <MenuItem value={1}>Daty utworzenia</MenuItem>
                  <MenuItem value={2}>Ilości uczestników</MenuItem>
                  <MenuItem value={3}>Kolejności alfabetycznej</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Paper>
        )}
        <TabPanelMUI value="1" sx={{ padding: 0 }}>
          <div className={classes.eventsListContainer}>
            {events ? (
              sortEvents(eventsOrder)
                .slice((eventsPageNumber - 1) * 6, eventsPageNumber * 6)
                .map((event) => (
                  <Event
                    key={event.eventId}
                    eventId={event.eventId}
                    updateEvents={updateEvents}
                    title={event.title}
                    date={event.eventDate}
                    eventImage={event.image}
                    address={event.eventAddress}
                    members={event.members}
                  />
                ))
            ) : (
              <div className={classes.loadingContainer}>
                <CircularProgress color="secondary" />
              </div>
            )}
            {filteredEvents.length > 6 && (
              <Paper elevation={4} className={classes.paginationContainer}>
                <Pagination
                  className={classes.eventsPagination}
                  count={events && Math.ceil(events.length / 10)}
                  color="secondary"
                  size="large"
                  showFirstButton
                  showLastButton
                  page={eventsPageNumber}
                  onChange={handleChangeEventsPageNumber}
                />
              </Paper>
            )}
          </div>
        </TabPanelMUI>
        <TabPanelMUI value="2" sx={{ padding: 0 }}>
          <div className={classes.eventsListContainer}>
            {eventInvitations ? (
              eventInvitations.map((invitation) => (
                <Event
                  key={invitation.eventId}
                  invitation
                  invitationDate={invitation.invitationDate}
                  eventId={invitation.eventId}
                  updateEvents={updateEvents}
                  title={invitation.title}
                  date={invitation.eventDate}
                  eventImage={invitation.image}
                  address={invitation.eventAddress}
                  members={invitation.eventMembers}
                />
              ))
            ) : (
              <div className={classes.loadingContainer}>
                <CircularProgress color="secondary" />
              </div>
            )}
          </div>
        </TabPanelMUI>
      </TabContext>
    </div>
  );
};

EventsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventsPage);
