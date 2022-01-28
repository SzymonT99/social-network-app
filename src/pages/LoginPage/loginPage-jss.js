const styles = (theme) => ({
  wrapper: {
    width: '90%',
    display: 'flex',
  },
  loginColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 50px',
  },
  loginForm: {
    width: '80%',
    alignSelf: 'flex-end',
    padding: '60px 70px',
    display: 'flex',
    flexDirection: 'column',
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
  },
  appName: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.secondary.main,
  },
  appDescription: {
    color: 'white',
    padding: '20px 0 60x 0',
  },
  btnContainer: {
    display: 'flex',
    marginTop: '60px',
  },
  registerBtn: {
    '&.MuiButton-root': {
      border: '1.5px white solid',
      borderRadius: '10px',
      padding: '15px 60px',
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
    marginBottom: '20px',
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
