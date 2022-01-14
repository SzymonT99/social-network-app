const styles = (theme) => ({
  headerContainer: {
    height: '80px',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    position: 'sticky',
    top: 0,
    zIndex: 100,
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
    flex: 6,
    display: 'flex',
    justifyContent: 'center',
  },
  searchbar: {
    width: '94%',
    display: 'flex',
    alignItems: 'center',
  },
  actionContainer: {
    flex: 4,
    display: 'flex',
    alignItems: 'center',
  },
  actionIcons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '35%',
  },
  iconItem: {
    marginRight: '24px',
    cursor: 'pointer',
  },
  userInfoBox: {
    display: 'flex',
    alignItems: 'center',
    width: '75%',
    justifyContent: 'flex-end',
    marginRight: '24px',
  },
  nameAndSurname: {
    textAlign: 'right',
    width: '320px',
    color: 'white',
    paddingRight: '30px',
  },
  userPhoto: {
    display: 'block',
    width: '55px',
    height: '55px',
    borderRadius: '50px',
    cursor: 'pointer',
  },
});

export default styles;
