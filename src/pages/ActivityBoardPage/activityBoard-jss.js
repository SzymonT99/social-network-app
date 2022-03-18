const styles = (theme) => ({
  boardContainer: {
    width: '100%',
    display: 'flex',
    margin: '20px 0px',
  },
  activityContent: {
    flex: 4.5,
    marginRight: '20px',
  },
  infoContent: {
    flex: 2.5,
  },
  activityInvitationInfo: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      padding: '15px',
    },
  },
  postCreateBox: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '15px',
    },
  },
  divider: {
    paddingTop: '5px',
  },
  postCreateContent: {
    display: 'flex',
    paddingTop: '15px',
  },
  userPhoto: {
    '&.MuiAvatar-root': {
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