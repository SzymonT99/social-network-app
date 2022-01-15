const styles = (theme) => ({
  commentContainer: {
    display: 'flex',
    marginTop: '20px',
  },
  userPhotoSmall: {
    width: '50px',
    height: '50px',
    borderRadius: '60px',
    cursor: 'pointer',
  },
  commentContent: {
    width: '100%',
  },
  commentText: {
    width: '100%',
    backgroundColor: '#ECEEF1',
    borderRadius: '15px',
    padding: '10px 15px',
  },
  commentTime: {
    fontSize: 13,
    fontWeight: 400,
  },
  authorName: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  commentActions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 15px 0px 15px',
  },
  commentActionItem: {
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
  commentInput: {
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
    marginTop: '8px',
  },
  editActionBtn: {
    '&.MuiButton-root': {
      textTransform: 'none',
      padding: '2px 15px',
      margin: 0,
      minWidth: 0,
      fontSize: '15px',
      borderRadius: '10px',
      fontWeight: 500,
      marginRight: '15px',
    },
  },
});

export default styles;