import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './groupThread-jss';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import defaultUserPhoto from '../../../assets/default-profile-photo.jpg';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const GroupThread = (props) => {
  const { classes } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  return (
    <Accordion
      elevation={4}
      style={{ borderRadius: '10px' }}
      className={classes.threadContainer}
    >
      <AccordionSummary className={classes.threadHeadingContainer}>
        <Avatar src={defaultUserPhoto} className={classes.memberPhoto} />
        <div className={classes.threadHeadingContent}>
          <Typography variant="h5">Tytuł wątku</Typography>
          <Typography variant="subtitle2" fontWeight={300}>
            Opublikowano dnia 12.03.2022r o godz. 12.30
          </Typography>
        </div>
        <div className={classes.threadAnswersNumberInfo}>
          <QuestionAnswerIcon fontSize="large" />
          <Typography variant="h5" marginLeft="10px">
            4
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.threadDetailsContainer}>
        <div className={classes.threadManageContainer}>
          <Typography variant="body1" className={classes.manageThreadAction}>
            <EditIcon /> Edytuj
          </Typography>
          <Typography variant="body1" className={classes.manageThreadAction}>
            <DeleteIcon /> Usuń
          </Typography>
        </div>
        <Divider />
        <div className={classes.threadDetailsContent}>
          <Typography variant="subtitle2">
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
          <img
            src={defaultUserPhoto}
            alt="Zdjęcie wątku"
            className={classes.threadImage}
          />
        </div>
        <Typography variant="subtitle2" className={classes.answersNumberText}>
          12 komentarzy
        </Typography>
        <Divider />
      </AccordionDetails>
    </Accordion>
  );
};

GroupThread.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupThread);
