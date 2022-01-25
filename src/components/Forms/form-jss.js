const styles = (theme) => ({
  postFormContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  postFormContent: {
    display: 'flex',
  },
  userPhoto: {
    '&.MuiAvatar-root': {
      display: 'block',
      width: '60px',
      height: '60px',
      marginRight: '15px',
    },
  },
  postInput: {
    '& .MuiInputBase-root': {
      borderRadius: '0px',
      fontSize: '17px',
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
  postFormAction: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 0',
  },
  accessPostContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  accessPostSelect: {
    width: '230px',
  },
  uploadImageToPostBtn: {
    '&.MuiButton-root': {
      fontSize: '16px',
      textTransform: 'none',
      width: '200px',
    },
  },
  publishPostBtn: {
    '&.MuiButton-root': {
      fontSize: '16px',
      fontWeight: 'bold',
      textTransform: 'none',
      width: '50%',
      height: '55px',
      alignSelf: 'center',
      margin: '15px',
    },
  },
  postImageList: {
    width: '100%',
    height: '300px',
  },
  uploadImageDeleteBtn: {},
  uploadImageItem: {
    position: 'relative',
    '&:hover $img': {
      opacity: '0.6',
      cursor: 'pointer',
    },
    '& $uploadImageDeleteBtn': {
      position: 'absolute',
      display: 'none',
      top: 0,
      right: 0,
      backgroundColor: theme.palette.secondary.dark,
      color: 'white',
      padding: 10,
      margin: 0,
      minWidth: 0,
      maxHeight: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '&:hover $uploadImageDeleteBtn': {
      display: 'flex',
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  schoolFormContainer: {
    width: '100%',
  },
  schoolDateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  graduationSchoolLabel: {
    '&.MuiFormControlLabel-root': {
      marginTop: '6px',
    },
  },
  graduationSchoolCheckbox: {
    '&.MuiCheckbox-root': {
      paddingLeft: 0,
    },
  },
  schoolActionBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px',
  },
  schoolActionBtn: {
    '&.MuiButton-root': {
      textTransform: 'none',
      fontSize: '17px',
      margin: '0px 15px',
      width: '26%',
    },
  },
  workFormContainer: {
    width: '100%',
  },
  workDateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  workActionBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px',
  },
  workActionBtn: {
    '&.MuiButton-root': {
      textTransform: 'none',
      fontSize: '17px',
      margin: '0px 15px',
      width: '26%',
    },
    userFavouriteItemFormContainer: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  userFavouriteItemFormAction: {
    marginTop: '15px',
  },
  userFavouriteActionBtn: {
    '&.MuiButton-root': {
      textTransform: 'none',
      width: '20%',
      fontSize: '17px',
    },
  },
});

export default styles;
