const styles = (theme) => ({
  headingBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  authorContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  userPhoto: {
    '&.MuiAvatar-root': {
      width: '60px',
      height: '60px',
      cursor: 'pointer',
    },
  },
  authorName: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  actionName: {
    fontSize: 16,
    fontWeight: 300,
  },
});

export default styles;
