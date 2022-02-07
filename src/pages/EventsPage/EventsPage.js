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
  Select,
  Tab,
  TextField,
  Typography,
} from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import TabPanelMUI from '@mui/lab/TabPanel';
import SearchIcon from '@mui/icons-material/Search';
import Event from '../../components/Event/Event';
import { getEvents } from '../../redux/actions/eventActions';
import Popup from '../../components/Popup/Popup';
import EventForm from '../../components/Forms/EventForm';

const EventsPage = (props) => {
  const { classes } = props;

  const dispatch = useDispatch();

  const events = useSelector((state) => state.events.allEvents);

  const [eventTabType, setEventTabType] = useState('1');
  const [eventsOrder, setEventsOrder] = useState(1);
  const [openEventCreation, setOpenEventCreation] = useState(false);

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  const handleChangeEventTabType = (event, newValue) => {
    setEventTabType(newValue);
  };

  const handleChangeEventsOrder = (event) => {
    setEventsOrder(event.target.value);
  };

  const handleCloseEventCreation = () => {
    setOpenEventCreation(false);
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
            <EventForm closePopup={handleCloseEventCreation} />
          </Popup>
        </Paper>
        <Paper elevation={4} className={classes.eventSearchbarContainer}>
          <TextField
            id="event-searchbar"
            placeholder="Szukaj wydarzenia"
            className={classes.eventSearchbar}
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
                sx={{ backgroundColor: 'white' }}
                value={eventsOrder}
                onChange={handleChangeEventTabType}
              >
                <MenuItem value={1}>Daty utworzenia</MenuItem>
                <MenuItem value={2}>Ilości uczestników</MenuItem>
                <MenuItem value={3}>Kolejności alfabetycznej</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Paper>
        <TabPanelMUI value="1" sx={{ padding: 0 }}>
          <div className={classes.eventsListContainer}>
            <Event />
            <Event />
            <Event />
            <Event />
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
