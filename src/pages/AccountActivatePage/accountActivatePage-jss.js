const styles = (theme) => ({
  activateAccountContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '200px',
    width: '43%',
    [theme.breakpoints.down('xl')]: {
      width: '55%',
    },
    [theme.breakpoints.down('lg')]: {
      width: '70%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  logo: {
    width: '122px',
    height: '105px',
    marginRight: '40px',
    [theme.breakpoints.down('md')]: {
      marginRight: '0px',
    },
  },
  appName: {
    '&.MuiTypography-root': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: ' center',
      color: theme.palette.secondary.main,
      '&:hover': {
        cursor: 'pointer',
      },
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },
  },
  appInfoBox: {
    marginBottom: '20px',
  },
  activateAccountContent: {
    '&.MuiPaper-root': {
      borderRadius: '20px',
      padding: '60px 30px',
      margin: '0px 20px',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('md')]: {
        padding: '40px 20px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '30px 15px',
      },
    },
  },
  activateAccountHeading: {
    '&.MuiTypography-root': {
      width: '100%',
      textAlign: 'center',
      fontWeight: 'bold',
      paddingBottom: '20px',
      marginBottom: '20px',
      borderBottom: `2px solid ${theme.palette.secondary.dark}`,
    },
  },
  activateInfoBox: {
    padding: '20px 20px 0px 20px',
    textAlign: 'center',
  },
  activateUserText: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
  activateAccountBtn: {
    '&.MuiButton-root': {
      marginTop: '20px',
      borderRadius: '5px',
      height: '50px',
      fontSize: '17px',
      width: '50%',
      alignSelf: 'center',
      [theme.breakpoints.down('md')]: {
        width: '70%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
});

export default styles;
