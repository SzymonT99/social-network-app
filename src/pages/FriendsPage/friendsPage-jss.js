const styles = (theme) => ({
  wrapper: {
    margin: '20px 0px',
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
        '&.Mui-selected': {
          fontWeight: 700,
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
  },
});

export default styles;
