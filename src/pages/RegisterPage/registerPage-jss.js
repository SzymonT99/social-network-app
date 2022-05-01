const styles = (theme) => ({
  registerContainer: {
    '&.MuiPaper-root': {
      width: '60vw',
      padding: '60px',
      borderRadius: '20px',
    },
  },
  registerForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    marginTop: '20px',
    textDecoration: 'none',
    alignSelf: 'center',
    fontSize: '17px',
    color: theme.palette.secondary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  registerBtn: {
    '&.MuiButton-root': {
      height: '50px',
      marginTop: '30px',
      alignSelf: 'center',
      fontSize: '17px',
      fontWeight: 'bold',
      width: '50%',
    },
  },
});

export default styles;
