const styles = (theme) => ({
  wrapper: {
    margin: '20px 0px',
  },
  favouritesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '15px',
  },
  favouritesContent: {
    width: '70%',
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
