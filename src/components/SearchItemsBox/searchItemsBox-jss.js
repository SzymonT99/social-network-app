const styles = (theme) => ({
  actionContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '15px 0px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  searchbar: {
    '&.MuiFormControl-root': {
      margin: 0,
      backgroundColor: '#FFF',
    },
    '&.MuiTextField-root': {
      borderRadius: '5px',
      width: '60%',
      marginRight: '15px',
      [theme.breakpoints.down('xl')]: {
        width: '45%',
      },
      [theme.breakpoints.down('md')]: {
        width: '80%',
        marginRight: '0px',
        marginBottom: '10px',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  },
  itemsOrderBox: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  itemsOrderSelect: {
    '&.MuiOutlinedInput-root': {
      [theme.breakpoints.down('sm')]: {
        marginTop: '10px',
      },
      width: '220px',
      backgroundColor: '#FFF',
    },
  },
});

export default styles;
