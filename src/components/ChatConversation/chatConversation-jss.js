const styles = (theme) => ({
  conversationContainer: {
    margin: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 5px',
    '&:hover': {
      backgroundColor: '#f3f3f3',
      cursor: 'pointer',
    },
  },
  selectedConversation: {
    backgroundColor: '#e5e5e5',
  },
  chatImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50px',
  },
  friendChatImage: {
    '&.MuiAvatar-root': {
      width: '50px',
      height: '50px',
      borderRadius: '50px',
    },
  },
  avatarBadge: {
    '& .MuiBadge-badge': {
      width: '12px',
      height: '12px',
      borderRadius: '50px',
      border: `2px solid ${theme.palette.background.paper}`,
    },
  },
  contentContainer: {
    marginLeft: '10px',
    flex: 1,
  },
  notificationNumber: {
    backgroundColor: theme.palette.secondary.main,
    padding: '4px 8px',
    borderRadius: '50px',
    fontSize: '12px',
    color: '#FFF',
    fontWeight: 'bold',
  },
  conversationLastMessageText: {
    '&.MuiTypography-root': {
      width: '130px',
    },
  },
  conversationNameText: {
    '&.MuiTypography-root': {
      fontWeight: 500,
      lineHeight: 1,
      width: '130px',
    },
  },
  conversationMessageText: {
    '&.MuiTypography-root': {
      lineHeight: 1.5,
      width: '130px',
    },
  },
});

export default styles;
