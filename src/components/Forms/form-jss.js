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
  chatMemberPhoto: {
    '&.MuiAvatar-root': {
      width: '45px',
      height: '45px',
      '&:hover': {
        cursor: 'pointer',
      },
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
      width: '50%',
      height: '55px',
      alignSelf: 'center',
      margin: '15px',
      borderRadius: '5px',
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
  profileFormConfirmBtn: {
    height: '55px',
    alignSelf: 'center',
    '&.MuiButton-contained': {
      textTransform: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      width: '50%',
    },
  },
  formImageContainer: {
    position: 'relative',
  },
  formImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    backgroundColor: 'rgb(233,233,233)',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  formImageUploadBtn: {
    '&.MuiButton-root': {
      position: 'absolute',
      bottom: '25px',
      right: '10px',
    },
  },
  formImageDeleteBtn: {
    '&.MuiButton-root': {
      position: 'absolute',
      bottom: '25px',
      right: '140px',
    },
  },
  formConfirmBtn: {
    '&.MuiButton-root': {
      fontSize: '16px',
      fontWeight: 'bold',
      width: '50%',
      height: '55px',
      alignSelf: 'center',
      margin: '15px',
      borderRadius: '5px',
    },
  },
  editAccountForm: {
    textAlign: 'center',
    marginTop: '20px',
    padding: '30px 80px',
  },
  resendActivationLinkForm: {
    textAlign: 'center',
    marginTop: '20px',
    padding: '0px 20px 20px 20px',
  },
  accountFormBtn: {
    '&.MuiButton-root': {
      textTransform: 'none',
      fontSize: '16px',
      width: '50%',
      height: '55px',
    },
  },
  disabledFormBtn: {
    '& .MuiInputBase-root': {
      '& .Mui-disabled': {
        WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
      },
    },
  },
  addChatMembersContainer: {
    minHeight: '200px',
    display: 'flex',
    marginBottom: '15px',
  },
  membersSearchContainer: {
    width: '65%',
    paddingRight: '15px',
    borderRight: '1px solid rgba(0, 0, 0, 0.22)',
  },
  addedMemberContainer: {
    width: '35%',
    marginLeft: '15px',
  },
  addedChatMember: {
    '&.MuiTypography-root': {
      display: 'flex',
      alignItems: 'center',
      margin: '5px 0px',
      '& .MuiSvgIcon-root': {
        marginRight: '10px',
      },
      '&:hover': {
        cursor: ' pointer',
        textDecoration: 'underline',
      },
    },
  },
  invitationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px 0',
  },
  searchedUserName: {
    '&.MuiTypography-root': {
      marginLeft: '15px',
      flex: 1,
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
  },
  addChatMemberBtn: {
    '&.MuiButton-root': {
      marginLeft: '10px',
      backgroundColor: '#D4D4D4',
      borderRadius: '5px',
      color: 'black',
      '&:hover': {
        backgroundColor: '#8a8a8a',
      },
    },
  },
});

export default styles;
