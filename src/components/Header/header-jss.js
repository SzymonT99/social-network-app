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
    '& .MuiFormControl-root': {
      marginBottom: 0,
    },
  },
  actionContainer: {
    flex: 4,
    display: 'flex',
    alignItems: 'center',
  },
  actionIcons: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '25%',
    paddingLeft: '10px',
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
    '&.MuiAvatar-root': {
      width: '50px',
      height: '50px',
    },
  },
  friendNotificationMenu: {
    '& .MuiPaper-root': {
      width: '18%',
      borderRadius: '5px',
      maxHeight: '80%',
    },
  },
  activityNotificationMenu: {
    '& .MuiPaper-root': {
      width: '24%',
      borderRadius: '5px',
      maxHeight: '80%',
      '& .MuiList-root': {
        padding: 0,
      },
    },
  },
  chatNotificationMenu: {
    '& .MuiPaper-root': {
      width: '20%',
      borderRadius: '5px',
      maxHeight: '80%',
      '& .MuiList-root': {
        padding: 0,
      },
    },
  },
  friendMenuBtn: {
    '&.MuiIconButton-root': {
      width: '32px',
      height: '32px',
      marginLeft: '10px',
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
      '&:hover': {
        border: 'none',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
    },
  },
  activityNotificationItem: {
    '&.MuiListItem-root': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& .MuiListItemText-root': {
        marginBottom: 0,
      },
      '&:hover': {
        backgroundColor: '#e5e5e5',
        cursor: 'pointer',
      },
    },
  },
  activityNotificationItemInfo: {
    display: 'flex',
    alignItems: 'center',
    width: '68%',
    padding: '5px 0px',
  },
  groupImage: {
    marginRight: '20px',
    height: '50px',
    width: '50px',
    borderRadius: '10px',
  },
  chatImage: {
    marginRight: '20px',
    height: '50px',
    width: '50px',
    borderRadius: '50%',
  },
  notificationNumber: {
    backgroundColor: theme.palette.secondary.main,
    padding: '4px 8px',
    borderRadius: '50px',
    fontSize: '12px',
    color: '#FFF',
    fontWeight: 'bold',
  },
  chatInformationContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '90%',
  },
  createAccountLink: {
    marginRight: '50px',
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontSize: '26px',
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  notificationBtn: {
    '&.MuiIconButton-root': {
      '& .MuiSvgIcon-root': {
        fontSize: '45px',
        cursor: 'pointer',
      },
    },
  },
  notificationNumberBox: {
    width: '10%',
    textAlign: 'right',
  },
});

export default styles;
