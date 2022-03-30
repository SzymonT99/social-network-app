const styles = (theme) => ({
  wrapper: {
    margin: '20px 0px',
  },
  postContainer: {
    width: '70%',
    margin: '15px auto',
  },
  moreItemsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15px',
    backgroundColor: theme.palette.primary.main,
    padding: '5px',
    borderRadius: '10px',
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
      '& .MuiLink-root': {
        textDecoration: 'underline',
      },
    },
  },
  moreCommentsLink: {
    '&.MuiLink-root': {
      textDecoration: 'none',
      alignSelf: 'center',
      color: 'white',
    },
  },
});

export default styles;
