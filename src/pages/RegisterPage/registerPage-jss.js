const styles = (theme) => ({
  wrapper: {
    width: '60vw',
    padding: '90px',
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
    height: '50px',
    alignSelf: 'center',
    '&.MuiButton-contained': {
      fontSize: '16px',
      fontWeight: 'bold',
      width: '50%',
    },
  },
});

export default styles;
