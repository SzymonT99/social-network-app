const styles = (theme) => ({
  otherMessageContainer: {
    display: 'flex',
    padding: '10px 0px',
  },
  userMessageContainer: {
    display: 'flex',
    padding: '10px 0px',
    flexDirection: 'row-reverse',
    textAlign: 'right',
  },
  otherAuthorContainer: {
    marginTop: '5px',
    marginRight: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  userAuthorContainer: {
    marginTop: '5px',
    marginLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  authorPhoto: {
    '&.MuiAvatar-root': {
      width: '50px',
      height: '50px',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  avatarBadge: {
    '& .MuiBadge-badge': {
      width: '14px',
      height: '14px',
      borderRadius: '50px',
      border: `2px solid ${theme.palette.background.paper}`,
    },
  },
  messageTimeText: {
    '&.MuiTypography-root': {
      textAlign: 'center',
      marginTop: '5px',
      fontWeight: 300,
    },
  },
  manageMessageBox: { display: 'none' },
  messageContent: { width: '50%' },
  messageDetailsContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '&:hover $manageMessageBox': {
      display: 'block',
    },
  },
  otherMessageField: {
    display: 'inline-block',
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    marginTop: '3px',
    textAlign: 'left',
    borderRadius: '10px',
    backgroundColor: '#ECEEF1',
    padding: '10px',
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.87)',
    borderWidth: 0,
    wordWrap: 'break-word',
    maxWidth: '100%',
    '&:focus': {
      border: 'none',
    },
  },
  userMessageField: {
    display: 'inline-block',
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    marginTop: '3px',
    borderRadius: '10px',
    backgroundColor: theme.palette.secondary.light,
    padding: '10px',
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: '100%',
    wordWrap: 'break-word',
    '&:focus': {
      border: 'none',
    },
    '&.MuiTypography-root': {
      textDecoration: 'ltr',
    },
  },
  messageEditBtn: {
    '&.MuiLink-root': {
      textDecoration: 'none',
      marginLeft: '10px',
      fontSize: '12px',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  messageTypeText: {
    fontWeight: 400,
    color: theme.palette.primary.main,
  },
  typingContainer: {
    backgroundColor: theme.palette.secondary.light,
    width: '80px',
    height: '40px',
    position: 'relative',
    padding: '10px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '@keyframes loadingFade': {
    '0%': {
      opacity: 0.2,
    },
    '50%': {
      opacity: 0.8,
    },
    '100%': {
      opacity: 0.2,
    },
  },
  typingDot: {
    width: '7px',
    height: '7px',
    margin: '0 4px',
    backgroundColor: '#2c2c2c',
    borderRadius: '50px',
    opacity: 0,
    animationName: '$loadingFade',
    animation: 'loadingFade 1s infinite',
    '&:nth-child(1)': {
      animationDelay: '0s',
    },
    '&:nth-child(2)': {
      animationDelay: '0.2s',
    },
    '&:nth-child(3)': {
      animationDelay: '0.4s',
    },
  },
  authorIsNotMemberText: {
    fontWeight: 300,
    fontSize: '15px',
  },
  authorMessageTyping: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  sentImage: {
    width: '200px',
    height: '200px',
    borderRadius: '10px',
    marginTop: '5px',
    objectFit: 'cover',
  },
});

export default styles;
