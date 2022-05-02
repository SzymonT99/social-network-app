const styles = (theme) => ({
  wrapper: {
    width: '90%',
    display: 'flex',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  contentColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 50px',
    [theme.breakpoints.down('xl')]: {
      margin: '0 7px',
    },
    [theme.breakpoints.down('lg')]: {
      margin: '20px 0px',
      width: '65%',
      textAlign: 'center',
    },
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  loginForm: {
    '&.MuiPaper-root': {
      borderRadius: '20px',
      width: '80%',
      alignSelf: 'flex-end',
      padding: '60px 70px',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('xl')]: {
        width: '100%',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '20px 30px',
      },
    },
  },
  registerLink: {
    marginTop: '20px',
    textDecoration: 'none',
    alignSelf: 'center',
    fontSize: '17px',
    color: theme.palette.secondary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  logo: {
    width: '122px',
    height: '105px',
    marginRight: '40px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0px',
    },
  },
  appName: {
    '&.MuiTypography-root': {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.secondary.main,
      [theme.breakpoints.down('lg')]: {
        justifyContent: 'center',
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
  },
  appDescription: {
    color: 'white',
    padding: '20px 0 60x 0',
  },
  btnContainer: {
    display: 'flex',
    marginTop: '60px',
    [theme.breakpoints.down('lg')]: {
      marginTop: '20px',
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: '80%',
      alignSelf: 'center',
    },
  },
  registerBtn: {
    '&.MuiButton-root': {
      border: '1.5px white solid',
      borderRadius: '10px',
      padding: '15px 60px',
      [theme.breakpoints.down('xl')]: {
        padding: '15px 20px',
        marginRight: '40px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '15px',
        padding: '10px 15px',
        marginRight: '0px',
      },
      marginRight: '60px',
      '&:hover': {
        border: `1.5px ${theme.palette.secondary.main} solid`,
        color: theme.palette.secondary.main,
      },
    },
    '&.MuiButton-outlined': {
      textTransform: 'none',
      fontSize: '16px',
      color: 'white',
      fontWeight: 'bold',
    },
  },
  publicContentBtn: {
    '&.MuiButton-root': {
      textTransform: 'none',
      borderRadius: '10px',
      padding: '15px 60px',
      [theme.breakpoints.down('xl')]: {
        padding: '15px 20px',
        marginRight: '0px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '15px',
        padding: '10px 15px',
        marginTop: '20px',
      },
      marginRight: '60px',
      backgroundColor: '#07DCC0',
      '&:hover': {
        backgroundColor: '#5fe8ce',
      },
    },
    '&.MuiButton-contained': {
      fontSize: '16px',
      color: 'black',
      fontWeight: 'bold',
    },
  },
  loginBtn: {
    '&.MuiButton-root': {
      textTransform: 'none',
      fontSize: '17px',
      fontWeight: 'bold',
      height: '50px',
    },
  },
  afterInputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  forgotPasswordLink: {
    textDecoration: 'none',
    color: 'black',
    fontSize: '17px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export default styles;
