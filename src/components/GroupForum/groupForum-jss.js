const styles = (theme) => ({
  forumContainer: {
    width: '100%',
    display: 'flex',
  },
  forumLeftContent: {
    flex: 5,
    paddingRight: '15px',
  },
  forumRightContent: {
    flex: 2,
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
    },
  },
  threadsOrderBox: {
    display: 'flex',
    alignItems: 'center',
  },
  orderText: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
      marginRight: '20px',
    },
  },
  threadsOrderSelect: {
    '&.MuiFormControl-root': {
      '& .MuiOutlinedInput-root': {
        backgroundColor: 'white',
      },
      marginBottom: 0,
      width: '260px',
    },
  },
  createThreadBtn: {
    '&.MuiButton-root': {
      backgroundColor: theme.palette.primary.dark,
      borderRadius: '10px',
      fontSize: '16px',
      padding: '8px 20px',
    },
  },
  noContent: {
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    height: '100%',
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
