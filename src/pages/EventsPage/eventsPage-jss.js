const styles = (theme) => ({
  wrapper: {
    margin: '20px 0',
  },
  headingEventBox: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.dark,
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    padding: '30px',
    minHeight: '100px',
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
  },
  eventIcon: {
    '&.MuiSvgIcon-root': {
      display: 'block',
      fontSize: '55px',
      marginRight: '20px',
    },
  },
  eventHeadingText: {
    '&.MuiTypography-root': {
      maxHeight: '100%',
      fontWeight: 'bold',
      borderLeft: `4px solid ${theme.palette.primary.dark}`,
      paddingLeft: '20px',
    },
  },
  eventsTopContainer: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '15px',
      padding: '26px',
    },
  },
  tabsContainer: {
    '&.MuiTabs-root': {
      minHeight: 'auto',
    },
  },
  tabItem: {
    '&.MuiTab-root': {
      textAlign: 'left',
      '&.MuiButtonBase-root': {
        minHeight: '30px',
        padding: 0,
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
  addEventBtn: {
    '&.MuiButton-root': {
      borderRadius: '10px',
      fontSize: '16px',
    },
  },
  eventSearchbarContainer: {
    '&.MuiPaper-root': {
      backgroundColor: theme.palette.primary.light,
      marginTop: '15px',
      minHeight: '92px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  eventSearchbar: {
    '&.MuiTextField-root': {
      backgroundColor: 'white',
      borderRadius: '5px',
      width: '50%',
      marginRight: '15px',
    },
  },
  eventsOrderBox: {
    display: 'flex',
    alignItems: 'center',
  },
  eventsListContainer: {
    marginTop: '15px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  eventOrderSelect: {
    '&.MuiOutlinedInput-root': {
      backgroundColor: 'white',
      width: '220px',
    },
  },
  eventsPagination: {
    '&.MuiPagination-root': {
      padding: '15px',
      '& .MuiPagination-ul': {
        justifyContent: 'center',
      },
    },
  },
  paginationContainer: {
    '&.MuiPaper-root': {
      width: '100%',
      borderRadius: '10px',
      display: 'flex',
      alignItems: ' center',
      justifyContent: 'center',
    },
  },
});

export default styles;
