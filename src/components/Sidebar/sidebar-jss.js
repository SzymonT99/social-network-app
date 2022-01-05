const styles = (theme) => ({
  sidebarContainer: {
    flex: 2,
    position: 'sticky',
    backgroundColor: theme.palette.primary.main,
    height: 'calc(100vh - 80px)',
    top: '80px',
    color: theme.palette.primary.contrastText,
  },
  sidebarWrapper: {
    padding: '15px',
  },
  userProfile: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '20px',
    color: 'white',
    textDecoration: 'none',
  },
  userPhoto: {
    display: 'block',
    width: '100px',
    height: '100px',
    borderRadius: '60px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  divider: {
    backgroundColor: theme.palette.primary.contrastText,
  },
  iconItem: {
    color: 'white',
  },
});

export default styles;
