const styles = (theme) => ({
  wrapper: {
    margin: '20px 0px',
    [theme.breakpoints.down('lg')]: {
      margin: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '10px',
    },
  },
  friendsContainer: {
    '&.MuiPaper-root': {
      marginTop: '15px',
      width: '100%',
      borderRadius: '10px',
      padding: '20px',
    },
  },
  friendsNavContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  tabsContainer: {
    '&.MuiTabs-root': {
      minHeight: 'auto',
      '& .MuiTabs-flexContainer': {
        [theme.breakpoints.down('xl')]: {
          flexDirection: 'column',
        },
      },
      '& .MuiTabs-indicator': {
        [theme.breakpoints.down('xl')]: {
          display: 'none',
        },
      },
    },
  },
  tabItem: {
    '&.MuiTab-root': {
      '&.MuiButtonBase-root': {
        minHeight: '30px',
        padding: 0,
        paddingBottom: '10px',
        textTransform: 'none',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '17px',
        fontWeight: 400,
        marginRight: '20px',
        [theme.breakpoints.down('xl')]: {
          padding: '10px',
          alignItems: 'flex-start',
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: '15px',
        },
        '&.Mui-selected': {
          fontWeight: 700,
          [theme.breakpoints.down('xl')]: {
            backgroundColor: theme.palette.secondary.light,
          },
        },
      },
    },
  },
  userFriendsListBtn: {
    '&.MuiButton-root': {
      fontSize: '17px',
      borderRadius: '10px',
    },
  },
  friendsListContent: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px -5px 10px -5px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  noContent: {
    width: '100%',
    textAlign: 'center',
    marginTop: '15px',
  },
});

export default styles;
