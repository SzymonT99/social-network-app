const styles = (theme) => ({
  postContainer: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '15px',
    },
  },
  headingBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  authorContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  userPhoto: {
    '&.MuiAvatar-root': {
      width: '60px',
      height: '60px',
      cursor: 'pointer',
    },
  },
  userPhotoSmall: {
    '&.MuiAvatar-root': {
      width: '50px',
      height: '50px',
      marginRight: '20px',
    },
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
  addCommentContainer: {
    display: 'flex',
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
  postBtn: {
    '&.MuiButton-root': {
      textTransform: 'none',
    },
  },
  likedBtnClicked: {
    '&.MuiButton-root': {
      backgroundColor: 'rgba(7, 220, 192, 0.3)',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#5fe8ce',
      },
    },
  },
  moreCommentsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15px',
  },
  moreCommentsLink: {
    '&.MuiLink-root': {
      textDecoration: 'none',
      alignSelf: 'center',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  likedUserAvatar: {
    '&.MuiAvatar-root': {
      width: '30px',
      height: '30px',
    },
  },
  likesContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  optionMenu: {
    '& .MuiList-root': {
      padding: '6px',
    },
  },
  postMenuItem: {
    '&.MuiMenuItem-root': {
      padding: '10px',
    },
  },
  activityInformationContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  activityUserNameText: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
      marginLeft: '10px',
    },
  },
  userPhotoInfo: {
    '&.MuiAvatar-root': {
      width: '40px',
      height: '40px',
    },
  },
  activityActionDescription: {
    fontWeight: 300,
  },
  activityDateText: {
    '&.MuiTypography-root': {
      lineHeight: 0,
      marginLeft: '3px',
    },
  },
  postImageListContainer: {
    display: 'grid',
    gridGap: '10px',
    marginBottom: '10px',
  },
  postSmallImage: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
  },
  postLargeImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
  },
});

export default styles;
