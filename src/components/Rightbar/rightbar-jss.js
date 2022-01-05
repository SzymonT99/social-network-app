const styles = (theme) => ({
  rightbarContainer: {
    flex: 2,
    position: 'sticky',
    overflowY: 'scroll',
    height: 'calc(100vh - 80px)',
    top: '80px',
    backgroundColor: theme.palette.primary.contrastText,
  },
  rightbarWrapper: {
    padding: '20px',
  },
  friendsHeading: {
    paddingBottom: '10px',
  },
});

export default styles;
