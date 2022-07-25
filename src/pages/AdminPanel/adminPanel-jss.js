const styles = (theme) => ({
  wrapper: {
    margin: '20px 0px',
    [theme.breakpoints.down('lg')]: {
      margin: '10px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '5px',
    },
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
    height: 650,
  },
  reportCellContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  reportIcon: {
    '&.MuiSvgIcon-root': {
      color: 'rgba(0, 0, 0, 0.54)',
    },
  },
});

export default styles;
