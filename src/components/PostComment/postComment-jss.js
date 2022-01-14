const styles = (theme) => ({
  postContainer: {
    padding: '15px',
    marginBottom: '15px',
  },
  authorContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: '15px',
  },
  userPhoto: {
    width: '60px',
    height: '60px',
    borderRadius: '60px',
    cursor: 'pointer',
  },
  userPhotoSmall: {
    width: '50px',
    height: '50px',
    borderRadius: '60px',
    cursor: 'pointer',
    marginRight: '20px',
  },
  actionName: {
    fontSize: 16,
    fontWeight: 300,
  },
  postContent: {
    margin: '15px 0',
  },
  postClasses: {
    '& input': {
      marginBottom: '20px',
    },
  },
  commentContainer: {
    paddingTop: '15px',
  },
  postReactionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 0',
  },
  postReactionItem: {
    display: 'flex',
    alignItems: 'center',
  },
  commentInput: {
    '& .MuiInputBase-root': {
      backgroundColor: '#ECEEF1',
      borderRadius: '15px',
      fontSize: '17px',
      border: 'none',
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
  postImageList: {
    width: '100%',
    height: '330px',
    '& img': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  likedBtn: {
    textTransform: 'none',
  },
  likedBtnClicked: {
    '&.MuiButton-root': {
      backgroundColor: 'rgba(7, 220, 192, 0.3)',
      '&:hover': {
        backgroundColor: '#5fe8ce',
      },
    },
  },
});

export default styles;
