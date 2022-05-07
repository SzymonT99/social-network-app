const styles = (theme) => ({
  wrapper: {
    width: '25%',
    padding: '5px',
    [theme.breakpoints.down('xl')]: {
      width: '33.3%',
    },
    [theme.breakpoints.down('lg')]: {
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  friendContainer: {
    border: '1px solid rgba(0, 0, 0, 0.22)',
    borderRadius: '10px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  friendPhoto: {
    width: '100%',
    objectFit: 'cover',
    height: '200px',
    borderRadius: '10px',
  },
  friendInformationBox: {
    padding: '10px 10px 10px 10px',
  },
  actionFriendBtn: {
    '&.MuiButton-root': {
      alignSelf: 'center',
      fontSize: '15px',
      borderRadius: '10px',
    },
  },
  rejectFriendBtn: {
    '&.MuiButton-root': {
      marginTop: '10px',
      backgroundColor: '#D4D4D4',
      color: 'black',
      '&:hover': {
        backgroundColor: '#8a8a8a',
      },
    },
  },
  friendNameLink: {
    '&.MuiTypography-root': {
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
  },
  invitationDateText: {
    '&.MuiTypography-root': {
      textAlign: 'center',
      marginBottom: '10px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.22)',
      paddingBottom: '5px',
    },
  },
});

export default styles;
