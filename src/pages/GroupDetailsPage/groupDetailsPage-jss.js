const styles = (theme) => ({
  groupHeadingContainer: {
    '&.MuiPaper-root': {
      marginTop: '20px',
      marginBottom: '15px',
      borderRadius: '10px',
      position: 'relative',
    },
  },
  backToGroupsBtn: {
    '&.MuiButton-root': {
      position: 'absolute',
      top: '15px',
      left: '15px',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#adadad',
      borderRadius: '16px',
      color: 'black',
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: '#949494',
      },
    },
  },
  groupImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  groupHeadingContent: {
    padding: '20px',
  },
  alignCenterRowInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  groupHeadingDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  groupActionBtn: {
    '&.MuiButton-root': {
      marginLeft: '26px',
      fontSize: '17px',
    },
  },
  groupNavContainer: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      marginBottom: '15px',
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
        '&.Mui-disabled': {
          color: 'rgb(166,174,193)',
          backgroundColor: 'rgb(224,224,224)',
        },
        '&.Mui-selected': {
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.secondary.dark,
        },
      },
    },
  },
  tabContent: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  leftActivityContent: {
    flex: 2.8,
    marginRight: '10px',
  },
  rightActivityContent: {
    flex: 4.2,
    marginLeft: '10px',
  },
  groupInfoBoxHeading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  groupInfoBoxContent: {
    padding: '15px',
    marginBottom: '15px',
  },
  groupInfoNewMemberBoxContent: {
    padding: '0px 15px',
    marginBottom: '15px',
  },
  groupBasicInfoItem: {
    '&.MuiTypography-root': {
      margin: '5px 0px',
      display: 'flex',
      alignItems: 'center',
      '& .MuiSvgIcon-root': {
        marginRight: '7px',
      },
    },
  },
  groupCreatorLink: {
    marginLeft: '4px',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
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
  postCreationUserPhoto: {
    '&.MuiAvatar-root': {
      display: 'block',
      width: '50px',
      height: '50px',
      marginRight: '15px',
    },
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
  moreItemsContainer: {
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15px',
    backgroundColor: theme.palette.primary.main,
    padding: '5px',
    borderRadius: '10px',
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
      '& .MuiLink-root': {
        textDecoration: 'underline',
      },
    },
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
  userPhotoSmall: {
    '&.MuiAvatar-root': {
      width: '50px',
      height: '50px',
      cursor: 'pointer',
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  newMemberBox: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 0px',
    margin: 0,
  },
  newMemberAddedDate: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 300,
  },
  noContent: {
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  informationSectionElement: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      width: '60%',
      marginBottom: '15px',
    },
  },
  groupInfoContainer: {
    padding: '15px',
  },
  memberPhotoGroup: {
    '&.MuiAvatarGroup-root': {
      display: 'inline-flex',
      marginBottom: '10px',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  ruleItemHeading: {
    '&.MuiAccordionSummary-root': {
      '&.Mui-expanded': {
        minHeight: 'auto',
      },
      '& .MuiAccordionSummary-content': {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px 0px',
      },
    },
  },
  memberSectionContainer: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      width: '100%',
      padding: '20px',
      marginBottom: '20px',
    },
  },
  memberSectionTitle: {
    '&.MuiTypography-root ': {
      marginBottom: '10px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
    },
  },
  membersNumber: {
    backgroundColor: theme.palette.primary.main,
    fontSize: '15px',
    borderRadius: '50px',
    color: 'white',
    padding: '5px 10px',
    marginLeft: '5px',
  },
  memberItemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  membersActionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '15px 0px',
  },
  memberSearchbar: {
    '&.MuiFormControl-root': {
      margin: 0,
    },
    '&.MuiTextField-root': {
      borderRadius: '5px',
      width: '60%',
      marginRight: '15px',
    },
  },
  membersOrderBox: {
    display: 'flex',
    alignItems: 'center',
  },
  memberOrderSelect: {
    '&.MuiOutlinedInput-root': {
      width: '220px',
    },
  },
  membersPagination: {
    '&.MuiPagination-root': {
      marginBottom: '10px',
      '& .MuiPagination-ul': {
        justifyContent: 'center',
      },
    },
  },
  memberPhotosHover: {
    '&.MuiAvatarGroup-root': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  moreCommentsLink: {
    '&.MuiLink-root': {
      textDecoration: 'none',
      alignSelf: 'center',
      color: 'white',
    },
  },
  newMemberName: {
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  settingsContainer: {
    '&.MuiPaper-root': {
      width: '100%',
      marginBottom: '20px',
      display: 'flex',
      borderRadius: '10px',
    },
  },
  groupSettingsNav: {
    width: '30%',
    borderRight: '1px solid rgba(0, 0, 0, 0.22)',
  },
  settingsContent: {
    width: '70%',
    padding: '30px',
  },
  settingsTabList: {
    '&.MuiTabs-root': {
      height: '100%',
      '&:first-child': {
        borderTopLeftRadius: '10px',
      },
      '& .MuiTabs-flexContainer': {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        '& .MuiButtonBase-root': {
          '&.Mui-disabled': {
            color: 'rgb(166,174,193)',
            backgroundColor: 'rgb(236,236,236)',
          },
          display: 'flex',
          flexDirection: 'row',
          fontWeight: 400,
          textTransform: 'none',
          justifyContent: 'flex-start',
          alignItems: 'center',
          minHeight: 'auto',
          fontSize: '17px',
          padding: '15px 20px',
          color: theme.palette.primary.main,
          '& .MuiSvgIcon-root': {
            margin: '0px 8px 0px 0px',
          },
          '&.Mui-selected': {
            fontWeight: 'bold',
            backgroundColor: 'rgba(90, 107, 133, 0.3)',
            borderLeft: `4px solid ${theme.palette.primary.main}`,
          },
        },
      },
    },
  },
  settingsInformationHeadingWithAction: {
    paddingBottom: '14px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.4)',
    marginBottom: '15px',
    display: 'flex',
    alignItems: ' center',
    justifyContent: 'space-between',
  },
  settingsInformationHeading: {
    '&.MuiTypography-root ': {
      paddingBottom: '14px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.4)',
      marginBottom: '15px',
    },
  },
  editGroupInformationBtn: {
    '&.MuiButtonBase-root': {
      backgroundColor: 'rgb(212, 212, 212)',
      color: theme.palette.primary.dark,
      '&:hover': {
        backgroundColor: 'rgb(161,161,161)',
      },
    },
  },
  interestList: {
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
  addGroupInfoItemBtn: {
    '&.MuiButton-root': {
      margin: '5px 0 15px 0',
      paddingLeft: 0,
      textTransform: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  groupInvitationsContainer: {
    minHeight: '200px',
  },
  deleteGroupContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '200px',
  },
  deleteGroupBtn: {
    '&.MuiButton-root': {
      marginTop: '15px',
      textTransform: 'none',
      fontSize: '16px',
      width: '30%',
      height: '45px',
    },
  },
});

export default styles;
