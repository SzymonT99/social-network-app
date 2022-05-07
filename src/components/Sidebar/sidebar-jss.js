const styles = (theme) => ({
  sidebarContainer: {
    flex: 2,
    position: 'sticky',
    backgroundColor: theme.palette.primary.main,
    height: 'calc(100vh - 80px)',
    top: '80px',
    color: theme.palette.primary.contrastText,
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: '0px',
    },
    [theme.breakpoints.down('xl')]: {
      flex: 2.5,
    },
    [theme.breakpoints.down('lg')]: {
      flex: 2.7,
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
      position: 'fixed',
      top: '80px',
      left: '0px',
      zIndex: 100,
      width: '45%',
    },
    [theme.breakpoints.down('sm')]: {
      top: '140px',
      width: '55%',
    },
  },
  '@media (max-width: 440px)': {
    sidebarContainer: {
      width: '70%',
    },
  },
  sidebarWrapper: {
    padding: '15px 15px 0px 15px',
  },
  userProfileBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '20px',
    color: 'white',
    textDecoration: 'none',
  },
  adminInfo: {
    '&.MuiTypography-root': {
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.secondary.dark,
      fontWeight: 'bold',
      '& .MuiSvgIcon-root': {
        marginRight: '7px',
      },
    },
  },
  userPhoto: {
    '&.MuiAvatar-root': {
      width: '100px',
      height: '100px',
      borderRadius: '60px',
      cursor: 'pointer',
      marginBottom: '10px',
    },
  },
  divider: {
    backgroundColor: theme.palette.primary.contrastText,
  },
  '@media (max-width: 1800px)': {
    navigationBtn: {
      '&.MuiListItemButton-root': {
        padding: '8px 4px',
        '& .MuiListItemIcon-root': {
          minWidth: '42px',
          '& .MuiSvgIcon-root': {
            fontSize: '30px',
          },
        },
        '& .MuiListItemText-root': {
          '& .MuiTypography-root': {
            fontSize: '18px',
          },
        },
      },
    },
  },
  navigationBtn: {
    '&.MuiListItemButton-root': {
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
      '& .MuiListItemText-root': {
        '& .MuiTypography-root': {
          fontWeight: 'bold',
          [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
          },
        },
      },
    },
  },
  avatarBadge: {
    '& .MuiBadge-badge': {
      width: '22px',
      height: '22px',
      borderRadius: '50px',
      border: `3px solid ${theme.palette.primary.main}`,
    },
  },
});

export default styles;
