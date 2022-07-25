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
  favouritesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '15px',
  },
  favouritesContent: {
    width: '70%',
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
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
  postsPagination: {
    '&.MuiPagination-root': {
      padding: '15px',
      '& .MuiPagination-ul': {
        justifyContent: 'center',
      },
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
