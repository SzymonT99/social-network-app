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
    '&.MuiFormControl-root': {
      marginTop: '3px',
      marginBottom: 0,
      '& .MuiInputBase-root': {
        borderRadius: '10px',
        backgroundColor: '#ECEEF1',
        padding: '10px',
        fontSize: '14px',
        margin: 0,
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: 0,
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderWidth: 0,
        },
        '& .Mui-disabled': {
          WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
        },
      },
    },
  },
  userMessageField: {
    '&.MuiFormControl-root': {
      marginTop: '3px',
      marginBottom: 0,
      '& .MuiOutlinedInput-input': {
        textAlign: 'right',
        color: 'white',
      },
      '& .MuiInputBase-root': {
        borderRadius: '10px',
        backgroundColor: theme.palette.secondary.light,
        textAlign: 'right',
        padding: '10px',
        fontSize: '14px',
        margin: 0,
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: 0,
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderWidth: 0,
        },
        '& .Mui-disabled': {
          WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
        },
      },
    },
  },
});

export default styles;
