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
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '320px',
    },
  },
  eventInformationRow: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '320px',
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
  },
  eventReactionBtn: {
    '&.MuiButton-root': {
      borderRadius: '5px',
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
