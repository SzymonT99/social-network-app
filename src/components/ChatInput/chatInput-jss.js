const styles = (theme) => ({
  messageCreationContainer: {
    height: '10%',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  },
  messageInput: {
    '&.MuiFormControl-root': {
      margin: '0px 10px',
    },
  },
  messageImageBade: {
    '& .MuiBadge-badge': {
      backgroundColor: theme.palette.secondary.main,
      color: '#FFF',
      fontSize: '12px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
      },
    },
  },
  sendMessageBtn: {
    '&.MuiButton-root': {
      padding: '6px 30px',
      fontSize: '17px',
      height: '55px',
      '& .MuiSvgIcon-root': {
        marginLeft: '7px',
      },
    },
  },
  messageImageList: {
    '&.MuiImageList-root': {
      minHeight: '280px',
      width: '100%',
      gridTemplateColumns: 'repeat(3, 1fr)',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
    },
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
});

export default styles;
