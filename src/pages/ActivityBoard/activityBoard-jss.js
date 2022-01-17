const styles = (theme) => ({
  boardContainer: {
    width: '100%',
    display: 'flex',
  },
  activityContent: {
    flex: 4.5,
  },
  activityWrapper: {
    padding: '20px 10px 20px 20px',
  },
  infoContent: {
    flex: 2.5,
  },
  infoWrapper: {
    padding: '20px 20px 20px 10px',
  },
  postCreateBox: {
    padding: '15px',
    marginBottom: '15px',
  },
  divider: {
    paddingTop: '5px',
  },
  postCreateContent: {
    display: 'flex',
    paddingTop: '10px',
  },
  userPhoto: {
    '&.MuiAvatar-root': {
      display: 'block',
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
      border: 'none',
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 0,
      },
    },
  },
  root: {
    background: 'linear-gradient(45deg, green 30%, orange 90%)',
    border: 0,
    borderRadius: 100,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 98,
    padding: '0 30px',
  },
  photoIcon: {
    marginTop: '30px',
    cursor: 'pointer',
  },
});

export default styles;
