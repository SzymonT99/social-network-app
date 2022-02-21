const styles = (theme) => ({
  resetPasswordContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '90px',
    width: '43%',
  },
  logo: {
    width: '122px',
    height: '105px',
    marginRight: '40px',
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
    },
  },
  appInfoBox: {
    marginBottom: '20px',
  },
  resetPasswordContent: {
    '&.MuiPaper-root': {
      borderRadius: '20px',
      padding: '60px 120px',
      margin: '0px 20px',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  resetPassBtn: {
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
