const styles = (theme) => ({
  dialogContainer: {
    '& .MuiPaper-root': {
      borderRadius: '10px',
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
