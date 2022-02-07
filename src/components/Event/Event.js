import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './event-jss';
import { PropTypes } from 'prop-types';
import defaultEventImg from '../../assets/default-event-photo.png';
import { Button, Typography } from '@mui/material';
import { LocationOn, AccessTime, Share } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

const Event = (props) => {
  const { classes, eventId, title, date, members, eventImage } = props;

  const history = useHistory();

  return (
    <div
      className={classes.eventContainer}
      onClick={() => history.push('/app/events/' + eventId)}
    >
      <img
        src={defaultEventImg}
        className={classes.eventImage}
        alt="Zdjęcie wydarzenia"
      />
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
      <div className={classes.eventInformationRow}>
        <AccessTime className={classes.timeIcon} />
        <Typography variant="subtitle2">{date}</Typography>
      </div>
      <div className={classes.eventInformationRow}>
        <LocationOn className={classes.timeIcon} />
        <Typography variant="subtitle2">Adres</Typography>
      </div>
      <Typography variant="body1" fontWeight={300}>
        12 os. zainteresowanych | 12 os. weźmie udział
      </Typography>
      <div className={classes.eventBtnContainer}>
        <Button color="secondary" variant="contained">
          Interesuje mnie
        </Button>
        <Button color="secondary" variant="contained">
          Weź udział
        </Button>
        <Button color="primary" variant="contained">
          <Share />
        </Button>
      </div>
    </div>
  );
};

Event.propTypes = {
  classes: PropTypes.object.isRequired,
  eventId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
  eventImage: PropTypes.object,
};

export default withStyles(styles)(Event);
