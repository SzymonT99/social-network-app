const styles = (theme) => ({
  dialogContainer: {
    '& .MuiPaper-root': {
      borderRadius: '10px',
      [theme.breakpoints.down('lg')]: {
        maxWidth: '70% !important',
      },
      [theme.breakpoints.down('md')]: {
        maxWidth: '80% !important',
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: '90% !important',
      },
    },
  },
  dialogTitle: {
    textAlign: 'center',
    fontSize: '30px',
  },
  dialogTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    '&.MuiButton-root': {
      backgroundColor: '#ECEEF1',
      height: '64px',
      borderRadius: '40px',
      '& .MuiSvgIcon-root ': {
        margin: 0,
      },
    },
  },
});

export default styles;
