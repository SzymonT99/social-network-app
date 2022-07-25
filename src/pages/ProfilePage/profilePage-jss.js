const styles = (theme) => ({
  wrapper: {
    margin: '20px 0px',
    [theme.breakpoints.down('lg')]: {
      margin: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '10px',
    },
  },
  profileHeadingContainer: {
    '&.MuiPaper-root': {
      width: '100%',
      marginBottom: '15px',
      borderRadius: '10px',
    },
  },
  profileCoverBackground: {
    borderRadius: '10px 10px 0px 0px',
    height: '230px',
    position: 'relative',
    backgroundColor: theme.palette.primary.light,
    [theme.breakpoints.down('sm')]: {
      height: '110px',
    },
  },
  profileInfoBox: {
    position: 'relative',
    padding: '0px 50px',
    display: 'flex',
    [theme.breakpoints.down('xl')]: {
      padding: '0px 26px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '0px 15px',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  uploadCoverImageBtn: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '40px',
    position: 'absolute',
    right: '12px',
    bottom: '12px',
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
  },
  deleteProfileImageBtn: {
    display: 'none',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '40px',
    position: 'absolute',
    right: '12px',
    top: '12px',
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
  },
  userProfilePhotoBox: {
    top: '-95px',
    position: 'relative',
    '&:hover': {
      '& $deleteProfileImageBtn': {
        display: 'block',
      },
    },
    [theme.breakpoints.down('sm')]: {
      top: '-65px',
    },
  },
  userPhoto: {
    width: '240px',
    height: '240px',
    borderRadius: '10px',
    objectFit: 'cover',
  },
  profileHeadingInfo: {
    width: '100%',
    padding: '22px 0px 0px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      padding: '0px',
    },
  },
  profileHeadingInfoContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userActionBtnContainer: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '250px',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },
  friendChatBtn: {
    '&.MuiButton-root': {
      fontSize: '17px',
      marginTop: '10px',
      padding: '6px 20px',
      '& .MuiSvgIcon-root': {
        marginRight: '7px',
      },
      [theme.breakpoints.down('xl')]: {
        fontSize: '15px',
      },
    },
  },
  profileHeadingText: {
    display: 'block',
    '&.MuiTypography-root': {
      width: '400px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      [theme.breakpoints.down('lg')]: {
        width: '300px',
      },
      [theme.breakpoints.down('md')]: {
        width: '270px',
      },
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      },
    },
  },
  profileInfoList: {
    '&.MuiList-root': {
      borderLeft: '1px solid black',
      display: 'flex',
      marginBottom: '34px',
      padding: 0,
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
  },
  profileInfoListItem: {
    '&.MuiListItem-root': {
      padding: '5px 20px',
      width: 'auto',
      height: '40px',
      borderRight: '1px solid black',
      textAlign: 'center',
      [theme.breakpoints.down('xl')]: {
        padding: '5px 8px',
      },
      '& .MuiTypography-root': {
        [theme.breakpoints.down('lg')]: {
          fontSize: '14px',
        },
      },
    },
  },
  profileNavigationContainer: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
    },
  },
  tabsContainer: {
    '&.MuiTabs-root': {
      width: '100%',
      marginBottom: '15px',
      '& .MuiTabs-flexContainer': {
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
        },
      },
    },
  },
  tabItem: {
    '&.MuiTab-root': {
      flex: 1,
      borderRadius: '10px',
      padding: '20px 0',
      '&.MuiButtonBase-root': {
        textTransform: 'none',
        fontSize: '17px',
        color: 'rgba(0, 0, 0, 0.87)',
        [theme.breakpoints.down('lg')]: {
          fontSize: '15px',
        },
        [theme.breakpoints.down('sm')]: {
          minWidth: '100%',
        },
        '&.Mui-selected': {
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
  },
  tabContent: {
    width: '100%',
    display: 'flex',
  },
  leftActivityContent: {
    flex: 2.8,
    marginRight: '10px',
    [theme.breakpoints.down('xl')]: {
      display: 'none',
    },
  },
  rightActivityContent: {
    flex: 4.2,
    marginLeft: '10px',
    [theme.breakpoints.down('xl')]: {
      margin: 0,
    },
  },
  activityTabsContainer: {
    borderBottom: 1,
    borderColor: 'divider',
    marginBottom: '5px',
  },
  activityTabList: {
    '&.MuiTabs-root': {
      '& .MuiTabs-flexContainer': {
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      '& .MuiTabs-indicator': {
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      },
    },
  },
  activityTabItem: {
    '&.MuiButtonBase-root': {
      textTransform: 'none',
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '15px',
      '&.Mui-selected': {
        color: theme.palette.secondary.main,
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
          backgroundColor: 'rgba(255,161,103,0.65)',
        },
      },
    },
  },
  profileActivityNavigation: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      padding: '0px 15px',
    },
  },
  tabPanelActivityContainer: {
    '&.MuiTabPanel-root': {
      padding: '15px 0px 0px',
      [theme.breakpoints.down('xl')]: {
        width: '80%',
        margin: '0px auto',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
  },
  profileInformationContainer: {
    '&.MuiPaper-root': {
      width: '100%',
      borderRadius: '10px',
      padding: '0px 15px',
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
  },
  profileInformationTabs: {
    width: '30%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
      margin: '15px 0px',
    },
  },
  profileInformationTabList: {
    '&.MuiTabs-root': {
      padding: '15px 0',
      height: '100%',
      [theme.breakpoints.down('sm')]: {
        padding: 0,
        paddingBottom: '15px',
      },
      '& .MuiTabs-flexContainer': {
        borderRight: `1px solid ${theme.palette.primary.main}`,
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          border: 'none',
          justifyContent: 'center',
        },
        '& .MuiButtonBase-root': {
          fontWeight: 400,
          textTransform: 'none',
          alignItems: 'flex-start',
          paddingLeft: '55px',
          textAlign: 'left',
          [theme.breakpoints.down('xl')]: {
            paddingLeft: '10px',
          },
          [theme.breakpoints.down('sm')]: {
            padding: '0 10px',
            margin: 0,
          },
          marginRight: '15px',
          fontSize: '16px',
          color: theme.palette.primary.dark,
          '&.Mui-selected': {
            fontWeight: 'bold',
            backgroundColor: 'rgba(90, 107, 133, 0.3)',
          },
        },
      },
    },
  },
  profileInformationContent: {
    width: '70%',
    padding: '15px',
    marginLeft: '15px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 0,
      padding: '0px 10px 10px 10px',
    },
  },
  profileInformationTabItem: {
    '&.MuiTabPanel-root': {
      padding: '10px 0',
    },
  },
  profileInformationHeading: {
    '&.MuiTypography-root ': {
      paddingBottom: '14px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.4)',
      marginBottom: '15px',
    },
  },
  profileInformationHeadingWithAction: {
    paddingBottom: '14px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.4)',
    marginBottom: '15px',
    display: 'flex',
    alignItems: ' center',
    justifyContent: 'space-between',
  },
  addProfileInfoItemBtn: {
    '&.MuiButton-root': {
      margin: '5px 0 15px 0',
      paddingLeft: 0,
      textTransform: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  editBaseInformationBtn: {
    '&.MuiButtonBase-root': {
      backgroundColor: 'rgb(212, 212, 212)',
      color: theme.palette.primary.dark,
      '&:hover': {
        backgroundColor: 'rgb(161,161,161)',
      },
    },
  },
  userInterestList: {
    '&.MuiList-root': {
      width: '100%',
      '& .MuiListItem-root': {
        '& .MuiListItemText-root': {
          marginLeft: '20px',
          marginRight: '30px',
        },
        '& .MuiListItemSecondaryAction-root': {
          display: 'none',
        },
        '&:hover': {
          '& .MuiListItemSecondaryAction-root': {
            display: 'flex',
          },
        },
      },
    },
  },
  imagesPagination: {
    '&.MuiPagination-root': {
      padding: '15px',
      '& .MuiPagination-ul': {
        justifyContent: 'center',
      },
    },
  },
  friendDeleteBtn: {
    '&.MuiButton-root': {
      '&:hover': {
        backgroundColor: '#FF1C00',
      },
    },
  },
  friendManageBtnContent: {
    '&.MuiTypography-root ': {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold',
      '& .MuiSvgIcon-root': {
        marginRight: '7px',
      },
      [theme.breakpoints.down('xl')]: {
        fontSize: '15px',
      },
    },
  },
  profileNavHeadingBox: {
    margin: '20px 20px 0px 20px',
  },
  friendSectionContainer: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      width: '100%',
      padding: '20px',
    },
  },
  friendTitle: {
    '&.MuiTypography-root ': {
      marginBottom: '10px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
    },
  },
  friendNumber: {
    backgroundColor: theme.palette.primary.main,
    fontSize: '15px',
    borderRadius: '50px',
    color: 'white',
    padding: '5px 10px',
    marginLeft: '5px',
  },
  userFriendsActionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '15px 0px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  friendsOrderBox: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  friendSearchbar: {
    '&.MuiFormControl-root': {
      margin: 0,
    },
    '&.MuiTextField-root': {
      borderRadius: '5px',
      width: '60%',
      marginRight: '15px',
      [theme.breakpoints.down('xl')]: {
        width: '45%',
      },
      [theme.breakpoints.down('md')]: {
        width: '80%',
        marginRight: '0px',
        marginBottom: '10px',
      },
    },
  },
  friendOrderSelect: {
    '&.MuiOutlinedInput-root': {
      width: '220px',
    },
  },
  friendsPagination: {
    '&.MuiPagination-root': {
      '& .MuiPagination-ul': {
        justifyContent: 'center',
      },
    },
  },
  friendInformationContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px 0px',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  groupsListContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '15px',
    margin: '0px auto',
    [theme.breakpoints.down('xxl')]: {
      width: '80%',
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.down('xl')]: {
      width: '100%',
    },
    [theme.breakpoints.down('md')]: {
      width: '70%',
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  '@media (max-width: 1800px)': {
    profileHeadingInfoContent: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    userActionBtnContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: '100%',
      margin: '10px 0px',
      '& .MuiButton-root': {
        width: '40%',
        height: '45px',
        marginRight: '10px',
      },
    },
    friendChatBtn: {
      '&.MuiButton-root': {
        marginTop: 0,
      },
    },
  },
  '@media (max-width: 1200px)': {
    userActionBtnContainer: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      '& .MuiButton-root': {
        marginRight: '0px',
        marginBottom: '10px',
        width: '250px',
      },
    },
  },
  '@media (max-width: 600px)': {
    profileHeadingInfoContent: {
      width: '100%',
      alignItems: 'center',
      position: 'relative',
      top: '-20px',
    },
    userActionBtnContainer: {
      alignItems: 'center',
    },
  },
  groupsPagination: {
    '&.MuiPagination-root': {
      padding: '15px',
      '& .MuiPagination-ul': {
        justifyContent: 'center',
      },
    },
  },
  paginationContainer: {
    '&.MuiPaper-root': {
      marginTop: '15px',
      width: '100%',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  noContent: {
    width: '100%',
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addedImageListItem: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.7,
    },
    [theme.breakpoints.down('lg')]: {
      height: '320px',
    },
  },
  reportUserLink: {
    '&.MuiLink-root': {
      position: 'absolute',
      textDecoration: 'none',
      color: theme.palette.secondary.dark,
      bottom: '60px',
      left: '100px',
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
      [theme.breakpoints.down('xl')]: {
        left: '80px',
      },
      [theme.breakpoints.down('md')]: {
        bottom: '60px',
        left: '70px',
      },
      [theme.breakpoints.down('sm')]: {
        position: 'relative',
      },
    },
  },
  imagesList: {
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '15px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
      padding: '10px',
    },
  },
  noFriendsText: {
    '&.MuiTypography-root': {
      width: '100%',
      margin: '10px 0px',
      textAlign: 'center',
    },
  },
});

export default styles;
