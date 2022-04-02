import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotification } from '../../redux/actions/notificationActions';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.notification.visible);
  const message = useSelector((state) => state.notification.message);
  const variant = useSelector((state) => state.notification.variant);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeNotification());
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      {variant !== 'none' ? (
        <Alert
          onClose={handleClose}
          severity={variant}
          sx={{
            width: '100%',
            fontSize: '20px',
            alignItems: 'center',
          }}
        >
          {message}
        </Alert>
      ) : (
        <div />
      )}
    </Snackbar>
  );
};

export default Notification;
