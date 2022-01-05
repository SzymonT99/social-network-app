const styles = (theme) => ({
  postContainer: {
    padding: '15px',
    marginBottom: '15px',
  },
  authorContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: '15px',
  },
  userPhoto: {
    width: '50px',
    height: '50px',
    borderRadius: '60px',
    cursor: 'pointer',
    marginRight: '20px',
  },
  actionName: {
    fontSize: 16,
    fontWeight: 300,
  },
  postContent: {
    margin: '15px 0',
  },
  postClasses: {
    '& input': {
      marginBottom: '20px',
    },
  },
  commentContainer: {
    display: 'flex',
    paddingTop: '15px',
  },
  postReactionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 0',
  },
  postReactionItem: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default styles;
