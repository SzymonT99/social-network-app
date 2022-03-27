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
  userMenu: {
    '&.MuiPaper-root': {
      padding: '0px 10px',
      borderRadius: '5px',
      backgroundColor: theme.palette.secondary.light,
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      marginTop: '4.5px',
      '& .MuiAvatar-root': {
        width: '35px',
        height: '35px',
        marginLeft: '-5.5px',
        marginRight: '6px',
      },
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: '1px',
        right: '27px',
        width: '15px',
        height: '15px',
        backgroundColor: theme.palette.secondary.light,
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
  },
  userMenuItem: {
    '&.MuiMenuItem-root': {
      '&.Mui-disabled': {
        color: 'rgba(0, 0, 0, 0.87)',
        opacity: 1,
      },
      '& .MuiListItemText-root': {
        marginLeft: '5px',
        '& .MuiTypography-root': {
          color: 'rgba(0, 0, 0, 0.87)',
        },
      },
      '& .MuiListItemIcon-root': {
        color: 'rgba(0, 0, 0, 0.87)',
      },
    },
  },
  divider: {
    '&.MuiDivider-root': {
      borderColor: theme.palette.secondary.main,
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
});

export default styles;
