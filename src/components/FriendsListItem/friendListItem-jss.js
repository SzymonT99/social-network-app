const styles = (theme) => ({
  friendBox: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '18px 0',
    '&:hover': {
      backgroundColor: '#f5f7f8',
      cursor: 'pointer',
    },
  },
  userPhoto: {
    '&.MuiAvatar-root': {
      width: '50px',
      height: '50px',
    },
  },
  friendNameText: {
    '&.MuiTypography-root ': {
      flex: 1,
      marginLeft: '10px',
    },
  },
});

export default styles;
