const styles = (theme) => ({
  eventContainer: {
    width: '352px',
    padding: '15px',
    backgroundColor: 'white',
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    borderRadius: '10px',
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0px 0px 21px 0px rgba(0, 0, 0, 10)',
    },
  },
  eventImage: {
    borderRadius: '10px',
    width: '100%',
    height: '240px',
    objectFit: 'cover',
    marginBottom: '5px',
  },
  eventInformationRow: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0',
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
    marginBottom: '10px',
    padding: '5px 0',
    border: '1px solid rgba(0, 0, 0, 0.22)',
    backgroundColor: 'rgb(240,240,240)',
  },
});

export default styles;
