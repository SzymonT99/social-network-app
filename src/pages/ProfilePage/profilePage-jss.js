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
    right: '20px',
    bottom: '20px',
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
  },
  userProfilePhotoBox: {
    top: '-95px',
    position: 'relative',
  },
  userPhoto: {
    width: '240px',
    height: '240px',
    borderRadius: '10px',
  },
  profileInfoText: {
    width: '100%',
    padding: '22px 0px 0px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    },
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
    paddingTop: '10px',
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
      '& .MuiImageListItemBar-root': {
        '& .MuiImageListItemBar-titleWrap': {
          padding: 0,
        },
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
});

export default styles;
