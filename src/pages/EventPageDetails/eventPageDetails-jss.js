const styles = (theme) => ({
  eventHeadingContainer: {
    '&.MuiPaper-root': {
      marginTop: '20px',
      borderRadius: '10px',
      position: 'relative',
    },
  },
  backToEventsBtn: {
    '&.MuiButton-root': {
      position: 'absolute',
      top: '15px',
      left: '15px',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#adadad',
      borderRadius: '16px',
      color: 'black',
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: '#949494',
      },
    },
  },
  eventImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  eventTitleBox: {
    padding: '20px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
  },
  dateInfoBox: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center',
  },
  dateItem: {
    borderRadius: '10px',
    backgroundColor: '#ECEEF1',
    border: '1px solid #bbbbbe',
    padding: '10px',
    textAlign: 'center',
    marginRight: '10px',
  },
  eventActionContainer: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  eventActionBtn: {
    '&.MuiButton-root': {
      borderRadius: '5px',
      fontSize: '17px',
      marginLeft: '20px',
      display: 'flex',
      alignItems: 'center',
    },
  },
  eventManageBtnContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '80px',
  },
  eventManageActionBtn: {
    '&.MuiButton-root': {
      backgroundColor: theme.palette.secondary.dark,
      '&:hover': {
        backgroundColor: '#b6290d',
      },
      borderRadius: '5px',
      fontSize: '17px',
      display: 'flex',
      alignItems: 'center',
      marginLeft: '20px',
    },
  },
  eventInvitationsList: {
    padding: '0px 50px',
  },
});

export default styles;
