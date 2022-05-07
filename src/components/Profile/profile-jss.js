const styles = (theme) => ({
  profileInformationItemContainer: {
    display: 'flex',
    width: '100%',
    padding: '5px 0',
  },
  profileInformationItemTitle: {
    '&.MuiTypography-root': {
      paddingRight: '20px',
      width: '200px',
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        width: '150px',
        paddingRight: '5px',
      },
    },
  },
  profileInformationItemContent: {
    '&.MuiTypography-root': {
      flex: 1,
      width: '120px',
      [theme.breakpoints.down('sm')]: {
        width: '100px',
      },
    },
  },
  profileInfoItemContainer: {
    paddingBottom: '15px',
  },
  schoolItemType: {
    fontWeight: 'bold',
    paddingBottom: '5px',
  },
  profileInfoItemContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfoItemDetails: {
    marginLeft: '20px',
    flex: 1,
    width: '200px',
    [theme.breakpoints.down('sm')]: {
      width: '120px',
    },
  },
  profileInfoItemSettingsBtn: {
    '&.MuiButtonBase-root': {
      backgroundColor: 'rgb(212, 212, 212)',
      color: theme.palette.primary.dark,
      '&:hover': {
        backgroundColor: 'rgb(161,161,161)',
      },
    },
  },
  userFavouriteTypeList: {
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
  userInfoContainer: {
    width: '49%',
    height: '150px',
    display: 'flex',
    border: '1px solid rgba(0, 0, 0, 0.22)',
    margin: '10px 0px',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '130px',
    },
  },
  friendPhoto: {
    height: '100%',
    width: '30%',
    objectFit: 'cover',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  userInfoContent: {
    width: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0px 20px',
    [theme.breakpoints.down('md')]: {
      padding: '0px 10px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px 8px',
    },
  },
  userNameLink: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
      margin: 0,
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '15px',
      },
    },
  },
  friendManageBtn: {
    '&.MuiButton-root': {
      width: '120px',
    },
  },
  friendDeleteBtn: {
    '&.MuiButton-root': {
      width: '120px',
      '&:hover': {
        backgroundColor: '#FF1C00',
      },
    },
  },
  '@media (max-width: 1800px)': {
    userInfoContent: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
  },
  '@media (max-width: 900px)': {
    userInfoContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  '@media (max-width: 600px)': {
    userInfoContent: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
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
    },
  },
  userInformationBox: {
    width: '180px',
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
  imageList: {
    '&.MuiImageList-root': {
      margin: 0,
      padding: 0,
    },
  },
  imageListItem: {
    '&.MuiImageListItem-root': {
      '& .MuiImageListItemBar-root': {
        border: '1px solid rgba(0, 0, 0, 0.17)',
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
});

export default styles;
