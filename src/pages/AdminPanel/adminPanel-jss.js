const styles = (theme) => ({
  wrapper: {
    margin: '20px 0px',
  },
  adminPanelContainer: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      padding: '15px',
      height: 'calc(100vh - 120px)',
    },
  },
  divider: {
    '&.MuiDivider-root': {
      margin: '10px 0px 20px 0px',
    },
  },
  usersTableContainer: {
    width: '100%',
    height: 750,
  },
});

export default styles;
