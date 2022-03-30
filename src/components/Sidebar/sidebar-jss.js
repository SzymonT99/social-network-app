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
  },
  sidebarWrapper: {
    padding: '15px',
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
  iconItem: {
    color: 'white',
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
