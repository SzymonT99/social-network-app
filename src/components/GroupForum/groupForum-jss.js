const styles = (theme) => ({
  forumContainer: {
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('xl')]: {
      flexDirection: 'column',
    },
  },
  forumLeftContent: {
    flex: 5,
    paddingRight: '15px',
    [theme.breakpoints.down('xl')]: {
      padding: '0px 0px',
    },
  },
  forumRightContent: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xl')]: {
      width: '70%',
      margin: '0 auto',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      margin: '0 auto',
    },
  },
  forumActionsContainer: {
    '&.MuiPaper-root': {
      backgroundColor: theme.palette.primary.light,
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
  },
  threadsOrderBox: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  orderText: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
      marginRight: '20px',
      [theme.breakpoints.down('sm')]: {
        margin: '0px 0px 5px 0px',
      },
    },
  },
  threadsOrderSelect: {
    '&.MuiFormControl-root': {
      '& .MuiOutlinedInput-root': {
        backgroundColor: 'white',
      },
      marginBottom: 0,
      width: '260px',
      [theme.breakpoints.down('xxl')]: {
        width: '240px',
      },
      [theme.breakpoints.down('sm')]: {
        width: '300px',
      },
    },
  },
  createThreadBtn: {
    '&.MuiButton-root': {
      backgroundColor: theme.palette.primary.dark,
      borderRadius: '10px',
      fontSize: '16px',
      padding: '8px 20px',
      [theme.breakpoints.down('sm')]: {
        marginTop: '10px',
        width: '80%',
      },
    },
  },
  noContent: {
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: ' center',
  },
  threadsPagination: {
    '&.MuiPagination-root': {
      padding: '15px',
      '& .MuiPagination-ul': {
        justifyContent: 'center',
      },
    },
  },
});

export default styles;
