import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './actionConfirmation-jss';
import { PropTypes } from 'prop-types';
import Typography from '@mui/material/Typography';
import { Button, Divider } from '@mui/material';

const ActionConfirmation = (props) => {
  const { classes, title, confirmationAction, rejectionAction } = props;

  return (
    <>
      <Typography variant="h6" marginBottom="15px">
        {title}
      </Typography>
      <Divider />
      <div className={classes.dialogActionContainer}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.dialogActionBtn}
          sx={{ marginRight: '20px' }}
          onClick={confirmationAction}
        >
          Potwierdź
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.dialogActionBtn}
          onClick={rejectionAction}
        >
          Anuluj
        </Button>
      </div>
    </>
  );
};

ActionConfirmation.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  confirmationAction: PropTypes.func.isRequired,
  rejectionAction: PropTypes.func.isRequired,
};

export default withStyles(styles)(ActionConfirmation);
