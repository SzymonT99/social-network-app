const styles = (theme) => ({
  registerContainer: {
    '&.MuiPaper-root': {
      padding: '60px',
      borderRadius: '20px',
      margin: '20px 0px',
      [theme.breakpoints.down('md')]: {
        width: '90vw',
        padding: '20px',
      },
      [theme.breakpoints.up('md')]: {
        width: '80vw',
      },
      [theme.breakpoints.up('lg')]: {
        width: '60vw',
      },
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
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
    },
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
      [theme.breakpoints.down('sm')]: {
        marginTop: '10px',
        width: '100%',
      },
    },
  },
});

export default styles;
