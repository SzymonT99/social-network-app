const styles = (theme) => ({
  memberPhotoSmall: {
    '&.MuiAvatar-root': {
      width: '50px',
      height: '50px',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  answerContainer: {
    margin: '15px 0px',
  },
  answerContent: {
    borderRadius: '10px',
    border: '1px solid rgba(0, 0, 0, 0.22)',
    padding: '10px 15px',
  },
  answerHeading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      alignItems: 'flex-start',
    },
  },
  answerTime: {
    fontSize: 13,
    fontWeight: 400,
  },
  authorName: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    [theme.breakpoints.down('sm')]: {
      width: '120px',
    },
  },
  answerInput: {
    '& .MuiInputBase-root': {
      '& .Mui-disabled': {
        WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
      },
      fontSize: '15px',
      padding: 0,
      margin: 0,
      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderWidth: 0,
        },
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 0,
      },
    },
  },
  editActionContainer: {
    marginTop: '10px',
  },
  editActionBtn: {
    '&.MuiButton-root': {
      padding: '4px 20px',
      margin: 0,
      minWidth: 0,
      fontSize: '15px',
      borderRadius: '10px',
      fontWeight: 500,
      marginRight: '15px',
    },
  },
  answerActionItem: {
    backgroundColor: 'white',
    '&.MuiButton-root': {
      textTransform: 'none',
      padding: 0,
      margin: 0,
      minWidth: 0,
      fontSize: '15px',
      color: 'rgba(0, 0, 0, 0.87)',
      fontWeight: 400,
      '&:hover': {
        backgroundColor: 'transparent',
        textDecoration: 'underline',
      },
    },
  },
  answerBtnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '5px',
  },
  avatarBadge: {
    '& .MuiBadge-badge': {
      width: '14px',
      height: '14px',
      borderRadius: '50px',
      border: `2px solid ${theme.palette.background.paper}`,
    },
  },
});

export default styles;
