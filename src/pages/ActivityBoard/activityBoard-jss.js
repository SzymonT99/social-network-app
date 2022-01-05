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
    padding: '10px 0',
  },
  userPhoto: {
    display: 'block',
    width: '45px',
    height: '45px',
    borderRadius: '50px',
    marginRight: '15px',
  },
  postCreateInput: {
    '& input': {
      marginBottom: '20px',
    },
  },
});

export default styles;
