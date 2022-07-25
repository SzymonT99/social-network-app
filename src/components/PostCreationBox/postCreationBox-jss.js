import theme from '../../theme/appTheme';

const styles = (theme) => ({
  container: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '15px',
    },
  },
  divider: {
    paddingTop: '5px',
  },
  postCreationContent: {
    display: 'flex',
    paddingTop: '15px',
  },
  userPhoto: {
    '&.MuiAvatar-root': {
      width: '50px',
      height: '50px',
      marginRight: '15px',
    },
  },
  postInput: {
    '& .MuiInputBase-root': {
      backgroundColor: '#ECEEF1',
      borderRadius: '15px',
      fontSize: '17px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
      },
      border: 'none',
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 0,
      },
    },
  },
  photoIcon: {
    marginTop: '30px',
    cursor: 'pointer',
  },
});

export default styles;
