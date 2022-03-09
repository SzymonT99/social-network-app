const styles = (theme) => ({
  groupContainer: {
    backgroundColor: 'white',
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    borderRadius: '10px',
  },
  groupImage: {
    borderRadius: '10px 10px 0 0',
    width: '100%',
    height: '240px',
    objectFit: 'cover',
    marginBottom: '5px',
  },
  groupInformationContainer: {
    padding: '0px 15px 15px 15px',
  },
  groupTitleText: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '320px',
    },
  },
  groupInterestsBox: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '320px',
  },
  groupBtnContainer: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  groupBtn: {
    '&.MuiButton-root': {
      width: '47%',
      borderRadius: '5px',
    },
  },
  groupInvitationBtn: {
    '&.MuiButton-root': {
      width: '30%',
      borderRadius: '5px',
    },
  },
  showGroupBtn: {
    '&.MuiButton-root': {
      backgroundColor: '#D4D4D4',
      color: 'black',
      '&:hover': {
        backgroundColor: '#8a8a8a',
      },
    },
  },
  groupStatsBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0px',
  },
  postsNumberStats: {
    '&.MuiTypography-root': {
      padding: '0px 10px',
      margin: '0px 10px',
      borderLeft: '1px solid rgba(0, 0, 0, 0.22)',
      borderRight: '1px solid rgba(0, 0, 0, 0.22)',
    },
  },
  statsDescription: {
    fontWeight: 400,
  },
  invitationInfo: {
    margin: '15px 15px 15px 15px',
    padding: '5px 0',
    border: '1px solid rgba(0, 0, 0, 0.22)',
    backgroundColor: 'rgb(240,240,240)',
  },
});

export default styles;
