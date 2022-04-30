const styles = (theme) => ({
  profileInformationItemContainer: {
    display: 'flex',
    width: '100%',
    padding: '5px 0',
  },
  profileInformationItemTitle: {
    width: '30%',
    paddingRight: '20px',
    '&.MuiTypography-root': {
      textOverflow: 'ellipsis',
      fontWeight: 'bold',
    },
  },
  profileInformationItemContent: {
    width: '70%',
    '&.MuiTypography-root': {
      textOverflow: 'ellipsis',
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
  },
  userNameLink: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
      margin: 0,
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
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
  friendManageBtnContent: {
    '&.MuiTypography-root ': {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold',
    },
  },
  userInformationBox: {
    width: '180px',
  },
});

export default styles;
