const styles = (theme) => ({
  boardContainer: {
    width: '100%',
    display: 'flex',
    margin: '20px 0px',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 4.5,
    marginRight: '20px',
    [theme.breakpoints.down('xl')]: {
      margin: 0,
      flex: 0.8,
    },
    [theme.breakpoints.down('lg')]: {
      flex: 0.8,
    },
    [theme.breakpoints.down('sm')]: {
      flex: 0.94,
    },
  },
  infoContent: {
    flex: 2.5,
    [theme.breakpoints.down('xl')]: {
      flex: 0,
      display: 'none',
    },
  },
  activityInvitationInfo: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      padding: '15px',
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
});

export default styles;
