const styles = (theme) => ({
  groupContainer: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
    },
  },
  groupContainerHover: {
    '&.MuiPaper-root': {
      '&:hover': {
        cursor: 'pointer',
        boxShadow: '0px 0px 21px 0px rgba(0, 0, 0, 10)',
      },
    },
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
      [theme.breakpoints.down('xl')]: {
        width: '300px',
      },
      [theme.breakpoints.down('lg')]: {
        width: '240px',
      },
      [theme.breakpoints.down('md')]: {
        width: '400px',
      },
    },
  },
  groupInterestsBox: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '320px',
    [theme.breakpoints.down('xl')]: {
      width: '300px',
    },
    [theme.breakpoints.down('lg')]: {
      width: '240px',
    },
    [theme.breakpoints.down('md')]: {
      width: '400px',
    },
  },
  '@media (max-width: 450px)': {
    groupTitleText: {
      '&.MuiTypography-root': {
        width: '240px',
      },
    },
    groupInterestsBox: {
      width: '240px',
    },
  },
  groupBtnContainer: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  groupBtn: {
    '&.MuiButton-root': {
      width: '47%',
      borderRadius: '5px',
      [theme.breakpoints.down('sm')]: {
        marginTop: '10px',
        width: '100%',
      },
    },
  },
  groupInvitationBtn: {
    '&.MuiButton-root': {
      width: '30%',
      borderRadius: '5px',
      [theme.breakpoints.down('sm')]: {
        marginTop: '5px',
        width: '100%',
      },
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
