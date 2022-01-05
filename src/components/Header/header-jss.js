const styles = (theme) => ({
  headerContainer: {
    height: '80px',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    display: 'flex',
  },
  logoContainer: {
    flex: 2,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    borderBottom: `1px ${theme.palette.secondary.main} solid`,
    color: 'white',
  },
  logo: {
    width: '58px',
    height: '50px',
    margin: '20px',
  },
  searchContainer: {
    flex: 5,
    display: 'flex',
    justifyContent: 'center',
  },
  searchbar: {
    width: '92%',
    display: 'flex',
    alignItems: 'center',
  },
  actionContainer: {
    flex: 5,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionIcons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '200px',
    marginRight: '120px',
  },
  iconItem: {
    marginRight: '24px',
    cursor: 'pointer',
  },
  userInfoBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '24px',
  },
  nameAndSurname: {
    color: 'white',
    paddingRight: '30px',
  },
  userPhoto: {
    display: 'block',
    width: '50px',
    height: '50px',
    borderRadius: '50px',
    cursor: 'pointer',
  },
});

export default styles;
