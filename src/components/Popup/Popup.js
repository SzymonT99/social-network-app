import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import styles from './popup-jss';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

const Popup = (props) => {
  const { children, classes, type, open, onClose, title } = props;

  const widthValues = {
    post: '43%',
    event: '43%',
    profileInfo: '35%',
    profileForm: '60%',
    addressForm: '35%',
  };

  return (
    <Dialog
      onBackdropClick={onClose}
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
          <Button className={classes.closeButton} onClick={() => onClose()}>
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
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(Popup);
