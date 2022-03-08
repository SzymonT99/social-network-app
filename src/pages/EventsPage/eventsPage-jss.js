const styles = (theme) => ({
  wrapper: {
    margin: '20px 0',
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
      '& .MuiFormControl-root': {
        marginBottom: '0px',
      },
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
    margin: '15px 0px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '15px',
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
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  noContent: {
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
