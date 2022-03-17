const styles = (theme) => ({
  wrapper: {
    padding: '20px 0px',
  },
  profileHeadingContainer: {
    width: '100%',
    marginBottom: '15px',
  },
  profileCoverImage: {
    borderRadius: '10px 10px 0px 0px',
    height: '230px',
    position: 'relative',
    backgroundColor: theme.palette.primary.light,
  },
  profileInfoBox: {
    position: 'relative',
    padding: '0px 50px',
    display: 'flex',
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
  },
  userPhoto: {
    width: '240px',
    height: '240px',
    borderRadius: '10px',
  },
  profileHeadingInfo: {
    width: '100%',
    padding: '22px 0px 0px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  profileHeadingInfoContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileHeadingText: {
    '&.MuiTypography-root ': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      width: '400px',
    },
  },
  profileInfoList: {
    '&.MuiList-root': {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '34px',
      padding: 0,
    },
  },
  profileInfoListItem: {
    '&.MuiListItem-root': {
      padding: '5px 20px',
      width: 'auto',
      height: '40px',
      borderRight: '1px solid black',
    },
  },
  tabsContainer: {
    '&.MuiTabs-root': {
      width: '100%',
      marginBottom: '15px',
    },
  },
  tabItem: {
    '&.MuiTab-root': {
      flex: 1,
      borderRadius: '10px',
      padding: '20px 0',
      '&.MuiButtonBase-root': {
        textTransform: 'none',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '17px',
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
  },
  rightActivityContent: {
    flex: 4.2,
    marginLeft: '10px',
  },
  activityTabsContainer: {
    borderBottom: 1,
    borderColor: 'divider',
    marginBottom: '5px',
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
      },
    },
  },
  postCreateBox: {
    padding: '15px',
    marginBottom: '15px',
  },
  postCreateContent: {
    display: 'flex',
    paddingTop: '15px',
  },
  postInput: {
    '& .MuiInputBase-root': {
      backgroundColor: '#ECEEF1',
      borderRadius: '15px',
      fontSize: '17px',
      border: 'none',
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 0,
      },
    },
  },
  postCreationUserPhoto: {
    '&.MuiAvatar-root': {
      display: 'block',
      width: '50px',
      height: '50px',
      marginRight: '15px',
    },
  },
  profileInfoBoxHeading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  profileInfoBoxContent: {
    padding: '15px',
    marginBottom: '15px',
  },
  imageListItemBox: {
    '&.MuiImageListItem-root': {
      border: '1px solid rgba(0, 0, 0, 0.47)',
      borderBottom: 'none',
      '& .MuiImageListItemBar-root': {
        border: '1px solid rgba(0, 0, 0, 0.47)',
        borderTop: 'none',
        width: '100%',
        '& .MuiTypography-root': {
          width: '100%',
        },
        '& .MuiImageListItemBar-titleWrap': {
          padding: 0,
          margin: 0,
        },
      },
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  imageListItemTitle: {
    textAlign: 'center',
    width: '120px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tabPanelActivityContainer: {
    '&.MuiTabPanel-root': {
      padding: '15px 0px 0px',
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  moreItemsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15px',
    backgroundColor: theme.palette.primary.main,
    padding: '5px',
    borderRadius: '10px',
    fontWeight: 'bold',
  },
  moreContentLink: {
    '&.MuiLink-root': {
      textDecoration: 'none',
      alignSelf: 'center',
      color: 'white',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  profileInformationContainer: {
    '&.MuiPaper-root': {
      width: '100%',
      borderRadius: '10px',
      padding: '0px 15px',
      display: 'flex',
    },
  },
  profileInformationTabs: {
    width: '30%',
  },
  profileInformationTabList: {
    '&.MuiTabs-root': {
      padding: '15px 0',
      height: '100%',
      '& .MuiTabs-flexContainer': {
        borderRight: `1px solid ${theme.palette.primary.main}`,
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        '& .MuiButtonBase-root': {
          fontWeight: 400,
          textTransform: 'none',
          alignItems: 'flex-start',
          paddingLeft: '55px',
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
  friendManageBtn: {
    '&.MuiButton-root': {
      marginRight: '10px',
    },
  },
  friendDeleteBtn: {
    '&.MuiButton-root': {
      marginRight: '10px',
      '&:hover': {
        backgroundColor: '#FF1C00',
      },
    },
  },
  friendManageBtnContent: {
    '&.MuiTypography-root ': {
      display: ' flex',
      alignItems: 'center',
      fontWeight: 'bold',
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
  },
  friendsOrderBox: {
    display: 'flex',
    alignItems: 'center',
  },
  friendSearchbar: {
    '&.MuiFormControl-root': {
      margin: 0,
    },
    '&.MuiTextField-root': {
      borderRadius: '5px',
      width: '60%',
      marginRight: '15px',
    },
  },
  friendOrderSelect: {
    '&.MuiOutlinedInput-root': {
      width: '220px',
    },
  },
  friendsPagination: {
    '&.MuiPagination-root': {
      marginBottom: '10px',
      '& .MuiPagination-ul': {
        justifyContent: 'center',
      },
    },
  },
  profileBasicInfoItem: {
    '&.MuiTypography-root': {
      margin: '5px 0px',
      display: 'flex',
      alignItems: 'center',
      '& .MuiSvgIcon-root': {
        marginRight: '7px',
      },
    },
  },
  friendInformationContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px 0px',
    justifyContent: 'space-between',
  },
  groupsListContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '15px',
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
      width: '100%',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  noContent: {
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
