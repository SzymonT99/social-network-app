const styles = (theme) => ({
  eventContainer: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
    },
  },
  eventHover: {
    '&.MuiPaper-root': {
      '&:hover': {
        cursor: 'pointer',
        boxShadow: '0px 0px 21px 0px rgba(0, 0, 0, 10)',
      },
    },
  },
  eventImage: {
    borderRadius: '10px 10px 0 0',
    width: '100%',
    height: '240px',
    objectFit: 'cover',
    marginBottom: '5px',
  },
  eventInformationContainer: {
    padding: '0px 15px 15px 15px',
  },
  eventTitleText: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
    },
  },
  eventInformationRow: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0',
    [theme.breakpoints.down('xl')]: {
      width: '270px',
    },
    [theme.breakpoints.down('lg')]: {
      width: '300px',
    },
  },
  '@media (max-width: 400px)': {
    eventInformationRow: {
      width: '200px',
    },
  },
  timeIcon: {
    '&.MuiSvgIcon-root': {
      color: 'rgba(0, 0, 0, 0.87)',
      marginRight: '5px',
    },
  },
  eventBtnContainer: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  eventReactionBtn: {
    '&.MuiButton-root': {
      borderRadius: '5px',
      [theme.breakpoints.down('sm')]: {
        marginTop: '10px',
        width: '100% !important',
      },
    },
  },
  invitationInfo: {
    margin: '15px 15px 15px 15px',
    padding: '5px 0',
    border: '1px solid rgba(0, 0, 0, 0.22)',
    backgroundColor: 'rgb(240,240,240)',
  },
});

export default styles;
