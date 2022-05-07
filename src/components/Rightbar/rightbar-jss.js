const styles = (theme) => ({
  rightbarContainer: {
    flex: 2,
    position: 'sticky',
    overflowY: 'scroll',
    scrollbarWidth: 'thin',
    height: 'calc(100vh - 80px)',
    top: '80px',
    backgroundColor: theme.palette.primary.contrastText,
    '&::-webkit-scrollbar': {
      width: '7px',
      backgroundColor: 'rgb(240,240,240)',
    },
    [theme.breakpoints.down('lg')]: {
      display: 'none',
      position: 'fixed',
      top: '80px',
      right: '0px',
      zIndex: 90,
      width: '300px',
      paddingTop: '20px',
      borderLeft: `1px solid ${theme.palette.primary.light}`,
    },
    [theme.breakpoints.down('sm')]: {
      top: '140px',
      width: '250px',
    },
  },
  rightbarWrapper: {
    padding: '15px',
  },
  friendListTitle: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
      [theme.breakpoints.down('lg')]: {
        display: 'none',
      },
    },
  },
});

export default styles;
