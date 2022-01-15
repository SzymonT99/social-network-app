import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import styles from './popup-jss';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

const Popup = (props) => {
  const { children, classes, type, open, handleClose, title } = props;

  const widthValues = {
    createPost: '43%',
  };

  return (
    <Dialog
      open={open}
      fullWidth
      className={classes.dialogContainer}
      sx={{
        '& .MuiPaper-root': { maxWidth: widthValues[type] },
      }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div className={classes.dialogTitleContainer}>
          <Typography variant="h4" fontWeight="bold">
            {title}
          </Typography>
          <Button className={classes.closeButton} onClick={() => handleClose()}>
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

Popup.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  type: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(Popup);