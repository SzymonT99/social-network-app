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
    padding: '10px',
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
  },
  messageCreationContainer: {
    height: '10%',
  },
  chatMembersContainer: {
    padding: '10px',
    flex: 1,
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
});

export default styles;
