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
    marginTop: '12px',
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
        borderColor: theme.palette.secondary.main,
        color: theme.palette.secondary.main,
      },
    },
    '&.MuiButton-outlined': {
      fontSize: '16px',
      color: 'white',
      fontWeight: 'bold',
    },
  },
  publicContentBtn: {
    '&.MuiButton-root': {
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
    height: '50px',
    '&.MuiButton-contained': {
      fontSize: '16px',
      fontWeight: 'bold',
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
  warningText: {
    height: '40px',
    paddingTop: '5px',
    color: '#FF1C00',
  },
});

export default styles;
