const styles = (theme) => ({
  forgetPasswordContainer: {
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
  forgetPasswordContent: {
    '&.MuiPaper-root': {
      borderRadius: '20px',
      padding: '60px 120px',
      margin: '0px 20px',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('lg')]: {
        padding: '40px 90px',
      },
      [theme.breakpoints.down('md')]: {
        padding: '30px 60px',
      },
      [theme.breakpoints.down('sm')]: {
        margin: '0px',
        padding: '20px 30px',
      },
    },
  },
  forgetPassBtn: {
    '&.MuiButton-root': {
      marginTop: '10px',
      fontSize: '17px',
      fontWeight: 'bold',
      height: '50px',
    },
  },
  backToLoginLink: {
    marginTop: '20px',
    textDecoration: 'none',
    alignSelf: 'center',
    fontSize: '17px',
    color: theme.palette.secondary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export default styles;
