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
      '& .MuiSvgIcon-root': {
        marginRight: '7px',
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
      '& .MuiSvgIcon-root': {
        marginRight: '5px',
      },
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
      '& .MuiSvgIcon-root': {
        marginRight: '5px',
      },
    },
  },
  eventInvitationsList: {
    padding: '0px 50px',
  },
  eventDetailsContainer: {
    display: 'flex',
  },
  eventDetailsLeftContent: {
    flex: 3.5,
    padding: '20px 10px 20px 0px',
  },
  eventDetailsRightContent: {
    flex: 2.5,
    padding: '20px 0px 20px 10px',
  },
  eventDetailsInfo: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      padding: '20px',
    },
  },
  eventDetailsItem: {
    display: 'flex',
    width: '100%',
    margin: '14px 0',
  },
  detailsItemText: {
    '&.MuiTypography-root ': {
      marginLeft: '8px',
    },
  },
  detailsItemTextLink: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  detailsItemTitle: {
    fontWeight: 500,
  },
  eventMembersStatsBox: {
    padding: '4px 20px 4px 20px',
    backgroundColor: '#ECEEF1',
    borderTop: '1px solid rgba(0, 0, 0, 0.22)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.22)',
  },
  eventMembersStatsBoxItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '14px 0',
    width: 'auto',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#cecfd3',
    },
  },
  eventSharingStats: {
    display: 'flex',
    marginTop: '14px',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  eventTimeText: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
      marginLeft: '40px',
      color: '#FF1C00',
    },
  },
});

export default styles;
