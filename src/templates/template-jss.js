const styles = (theme) => ({
  authContainer: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    backgroundSize: 'cover',
  },
  authContent: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 18, 38, 0.76)',
  },
  appContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    backgroundColor: '#E0E5EA',
    flex: 8,
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100%',
  },
  contentApp: {
    width: '85%',
    [theme.breakpoints.down('xl')]: {
      width: '90%',
    },
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
  extendsContentApp: {
    width: '97%',
  },
});
export default styles;
