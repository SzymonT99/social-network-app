const styles = (theme) => ({
  wrapper: {
    height: 'calc(100vh - 80px)',
    padding: '20px 0px',
  },
  chatContainer: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      display: 'flex',
      height: '100%',
    },
  },
  conversationsContainer: {
    flex: 1,
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
  messageCreationContainer: {
    height: '10%',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  },
  chatSettingsContainer: {
    flex: 1.1,
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
  messageInput: {
    '&.MuiFormControl-root': {
      margin: '0px 10px',
    },
  },
  sendMessageBtn: {
    '&.MuiButton-root': {
      padding: '6px 30px',
      fontSize: '17px',
      '& .MuiSvgIcon-root': {
        marginLeft: '7px',
      },
    },
  },
  activeChatImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
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
});

export default styles;
