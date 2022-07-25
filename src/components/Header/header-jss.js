const styles = (theme) => ({
  headerContainer: {
    height: '80px',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    position: 'sticky',
    top: 0,
    zIndex: 99,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      height: '140px',
    },
  },
  logoContainer: {
    '&.MuiTypography-root': {
      flex: 2,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.palette.primary.main,
      borderBottom: `1px ${theme.palette.secondary.main} solid`,
      color: 'white',
    },
  },
  '@media (max-width: 1800px)': {
    logoContainer: {
      '&.MuiTypography-root': {
        backgroundColor: theme.palette.secondary.main,
        borderBottom: 'none',
        fontWeight: 500,
        flex: 3,
      },
    },
  },
  '@media (max-width: 1350px)': {
    logoContainer: {
      '&.MuiTypography-root': {
        flex: 4,
      },
    },
  },
  '@media (max-width: 1000px)': {
    logoContainer: {
      '&.MuiTypography-root': {
        display: 'none',
      },
    },
  },
  logo: {
    width: '58px',
    height: '50px',
    margin: '0px 20px',
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
    [theme.breakpoints.down('xl')]: {
      width: '90%',
    },
    [theme.breakpoints.down('lg')]: {
      marginLeft: '20px',
      width: '100%',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '10px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0px 10px 10px 10px',
    },
  },
  actionContainer: {
    flex: 4,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      flex: 2,
    },
    [theme.breakpoints.down('lg')]: {
      flex: 2,
    },
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-end',
    },
  },
  actionIcons: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '25%',
    paddingLeft: '10px',
    [theme.breakpoints.down('lg')]: {
      width: '75%',
      paddingRight: '30px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '25%',
      justifyContent: 'flex-start',
    },
  },
  userInfoBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '24px',
    width: '75%',
    [theme.breakpoints.down('xl')]: {
      marginRight: '10px',
    },
    [theme.breakpoints.down('lg')]: {
      width: '25%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '75%',
      marginRight: '0px',
    },
  },
  nameAndSurname: {
    '&.MuiTypography-root': {
      textAlign: 'right',
      width: '320px',
      color: 'white',
      paddingRight: '30px',
      [theme.breakpoints.down('xl')]: {
        width: '250px',
        paddingRight: '10px',
      },
      [theme.breakpoints.down('lg')]: {
        display: 'none',
      },
      [theme.breakpoints.down('sm')]: {
        paddingRight: '5px',
        width: '120px',
        display: 'block',
      },
    },
  },
  '@media (max-width: 440px)': {
    nameAndSurname: {
      '&.MuiTypography-root': {
        display: 'none',
      },
    },
  },
  userPhoto: {
    '&.MuiAvatar-root': {
      width: '50px',
      height: '50px',
    },
  },
  friendNotificationMenu: {
    '& .MuiPaper-root': {
      width: '20%',
      borderRadius: '5px',
      maxHeight: '80%',
      [theme.breakpoints.down('xl')]: {
        width: '30%',
      },
      [theme.breakpoints.down('lg')]: {
        width: '50%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
    },
  },
  activityNotificationMenu: {
    '& .MuiPaper-root': {
      width: '24%',
      borderRadius: '5px',
      maxHeight: '80%',
      [theme.breakpoints.down('xl')]: {
        width: '30%',
      },
      [theme.breakpoints.down('lg')]: {
        width: '50%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
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
      [theme.breakpoints.down('xl')]: {
        width: '30%',
      },
      [theme.breakpoints.down('lg')]: {
        width: '50%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
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
    [theme.breakpoints.down('xl')]: {
      fontSize: '20px',
    },
    [theme.breakpoints.down('lg')]: {
      display: 'block',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
      marginRight: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: '50px',
      display: 'inline',
    },
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
        [theme.breakpoints.down('sm')]: {
          fontSize: '38px',
        },
      },
    },
  },
  notificationNumberBox: {
    width: '10%',
    textAlign: 'right',
  },
  drawerBtnContainer: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '10px',
      flex: 0.8,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  drawerBtn: {
    '&.MuiIconButton-root': {
      '& .MuiSvgIcon-root': {
        fontSize: '45px',
        [theme.breakpoints.down('sm')]: {
          fontSize: '38px',
        },
      },
    },
  },
  friendListBtn: {
    display: 'none',
    position: 'fixed',
    top: '80px',
    right: '0px',
    padding: '3px 0px',
    textAlign: 'center',
    borderBottomRightRadius: '50px',
    borderBottomLeftRadius: '50px',
    backgroundColor: theme.palette.primary.light,
    border: `2px solid ${theme.palette.primary.main}`,
    borderTop: 'none',
    [theme.breakpoints.down('lg')]: {
      width: '300px',
      display: 'block',
    },
    [theme.breakpoints.down('sm')]: {
      width: '250px',
      top: '140px',
    },
    '&:hover': {
      cursor: 'pointer',
    },
    '& .MuiTypography-root': {
      fontSize: '16px',
      color: '#FFF',
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
      },
    },
  },
});

export default styles;
