const styles = (theme) => ({
  boardContainer: {
    width: '100%',
    display: 'flex',
    margin: '20px 0px',
  },
  activityContent: {
    flex: 4.5,
    marginRight: '20px',
  },
  infoContent: {
    flex: 2.5,
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
    height: '100%',
  },
});

export default styles;
