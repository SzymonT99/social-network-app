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
    display: 'block',
    width: '50px',
    height: '50px',
    borderRadius: '50px',
  },
});

export default styles;
