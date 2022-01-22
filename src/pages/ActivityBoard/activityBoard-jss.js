const styles = (theme) => ({
  boardContainer: {
    width: '100%',
    display: 'flex',
  },
  activityContent: {
    flex: 4.5,
  },
  activityWrapper: {
    padding: '20px 10px 20px 20px',
  },
  infoContent: {
    flex: 2.5,
  },
  infoWrapper: {
    padding: '20px 20px 20px 10px',
  },
  postCreateBox: {
    padding: '15px',
    marginBottom: '15px',
  },
  divider: {
    paddingTop: '5px',
  },
  postCreateContent: {
    display: 'flex',
    paddingTop: '10px',
  },
  userPhoto: {
    '&.MuiAvatar-root': {
      display: 'block',
      width: '50px',
      height: '50px',
      marginRight: '15px',
    },
  },
  postInput: {
    '& .MuiInputBase-root': {
      backgroundColor: '#ECEEF1',
      borderRadius: '15px',
      fontSize: '17px',
      border: 'none',
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 0,
      },
    },
  },
  photoIcon: {
    marginTop: '30px',
    cursor: 'pointer',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
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
  },
  moreCommentsLink: {
    '&.MuiLink-root': {
      textDecoration: 'none',
      alignSelf: 'center',
      color: 'white',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
});

export default styles;
