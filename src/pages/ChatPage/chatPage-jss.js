const styles = (theme) => ({
  wrapper: {
    height: 'calc(100vh - 80px)',
    padding: '20px 0px',
    [theme.breakpoints.down('lg')]: {
      margin: '10px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '5px',
    },
  },
  chatContainer: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      display: 'flex',
      height: '100%',
      position: 'relative',
    },
  },
  conversationsContainer: {
    flex: 1,
    [theme.breakpoints.down('md')]: {
      flex: 0,
      position: 'absolute',
      left: '0px',
      top: '66px',
      zIndex: 10,
      backgroundColor: '#FFF',
      height: 'calc(100% - 66px)',
      borderRight: '1px solid rgba(0, 0, 0, 0.22)',
      width: '50%',
    },
  },
  conversationsContent: {
    '&::-webkit-scrollbar': {
      width: '7px',
      backgroundColor: 'rgb(240,240,240)',
    },
    overflowY: 'scroll',
    scrollbarWidth: 'thin',
    height: 'calc(100% - 67px)',
  },
  conversationsHeadingBox: {
    padding: '10px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.22)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addNewChatBtn: {
    '&.MuiIconButton-root': { '& .MuiSvgIcon-root': { fontSize: '30px' } },
  },
  chatMessagesContainer: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.22)',
    borderRight: '1px solid rgba(0, 0, 0, 0.22)',
    flex: 3,
    height: '100%',
    position: 'relative',
    [theme.breakpoints.down('xl')]: {
      borderRight: 'none',
      borderTopRightRadius: '10px',
      paddingTop: '10px',
    },
    [theme.breakpoints.down('md')]: {
      borderLeft: 'none',
      borderLeftRightRadius: '10px',
    },
  },
  messagesContent: {
    height: '90%',
    '&::-webkit-scrollbar': {
      width: '7px',
      backgroundColor: 'rgb(240,240,240)',
    },
    overflowY: 'scroll',
    scrollbarWidth: 'thin',
    padding: '10px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.22)',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  showConversationsBtn: {
    '&.MuiIconButton-root': {
      padding: '5px 10px',
      display: 'block',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  },
  chatHeader: {
    display: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '67px',
    width: '100%',
    padding: '10px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.22)',
    zIndex: 10,
    backgroundColor: '#FFF',
    borderTopRightRadius: '10px',
    '& .MuiIconButton-root': {
      '& .MuiSvgIcon-root': {
        backgroundColor: 'transparent !important',
        fontSize: '36px',
        [theme.breakpoints.down('sm')]: {
          fontSize: '28px !important',
        },
      },
    },
    [theme.breakpoints.down('xl')]: {
      display: 'flex',
      alignItems: 'center',
    },
    [theme.breakpoints.down('md')]: {
      borderTopLeftRadius: '10px',
    },
  },
  headerTitle: {
    '&.MuiTypography-root': {
      flex: 1,
      fontWeight: 500,
      lineHeight: 1,
      textAlign: 'center',
      width: '200px',
    },
  },
  chatSettingsContainer: {
    flex: 1.1,
    [theme.breakpoints.down('xl')]: {
      flex: 0,
      position: 'absolute',
      right: '0px',
      top: '66px',
      zIndex: 10,
      backgroundColor: '#FFF',
      width: '35%',
      height: 'calc(100% - 66px)',
      borderLeft: '1px solid rgba(0, 0, 0, 0.22)',
      borderTop: '1px solid rgba(0, 0, 0, 0.22)',
    },
    [theme.breakpoints.down('lg')]: {
      width: '40%',
    },
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
  },
  '@media (max-width: 750px)': {
    conversationsContainer: {
      display: 'none',
    },
    chatMessagesContainer: {
      borderLeft: 'none',
    },
  },
  chatSettingsContent: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 235px)',
    '&::-webkit-scrollbar': {
      width: '7px',
      backgroundColor: 'rgb(240,240,240)',
    },
    overflowY: 'scroll',
    scrollbarWidth: 'thin',
  },
  chatInfoContainer: {
    padding: '10px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.22)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationManageBtn: {
    '&.MuiIconButton-root': {
      position: 'absolute',
      top: '10px',
      right: '10px',
    },
  },
  notificationManageBtnClicked: {
    '&.MuiIconButton-root': {
      backgroundColor: theme.palette.secondary.light,
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  },
  conversationsTitle: {
    '&.MuiTypography-root': {
      margin: '20px 10px 0px 10px',
      fontWeight: 500,
    },
  },
  divider: {
    '&.MuiDivider-root': {
      margin: '4px 10px',
    },
  },
  noConversationsInfo: {
    '&.MuiTypography-root': {
      margin: '5px 10px 0px 10px',
    },
  },
  activeChatImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  chatNameText: {
    '&.MuiTypography-root': {
      width: '220px',
      overflow: 'hidden',
      fontWeight: 500,
      marginTop: '10px',
      textAlign: 'center',
    },
  },
  activeChatInfoBox: {
    '&.MuiAccordion-root': {
      borderRadius: '0px !important',
      boxShadow: 'none',
      borderBottom: '1px solid rgba(0, 0, 0, 0.22)',
      '& .MuiAccordionSummary-root': {
        padding: '0px 10px',
        '&.Mui-expanded': {
          minHeight: 'auto',
        },
      },
      '& .MuiAccordionDetails-root': {
        borderTop: '1px solid rgba(0, 0, 0, 0.22)',
        padding: '10px 0px 0px 0px',
        margin: '0px 0px 10px 10px',
      },
    },
  },
  chatInfoRow: {
    '&.MuiTypography-root': {
      margin: '10px 0px',
      display: 'flex',
      alignItems: 'center',
      '& .MuiSvgIcon-root': {
        marginRight: '7px',
      },
    },
  },
  activeChatAuthorLink: {
    marginLeft: '3px',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  chatManageBtnContainer: {
    margin: '10px 0px',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  friendProfileLink: {
    '&.MuiLink-root': {
      textDecoration: 'none',
      color: '#000',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  leaveChatBtn: {
    '&.MuiButton-root': {
      alignSelf: 'center',
      fontSize: '16px',
      width: '200px',
      marginTop: '50px',
      '& .MuiSvgIcon-root': {
        marginRight: '7px',
      },
    },
  },
  chatInvitationsContainer: {
    padding: '10px',
    minHeight: '400px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
  },
  chatImageListContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '10px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  chatImageListItem: {
    height: '120px',
    width: '100%',
    objectFit: 'cover',
  },
});

export default styles;
