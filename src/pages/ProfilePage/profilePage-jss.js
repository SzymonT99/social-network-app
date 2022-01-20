const styles = (theme) => ({
  wrapper: {
    padding: '20px 0px',
  },
  profileHeadingContainer: {
    width: '100%',
    marginBottom: '15px',
  },
  profileCoverImage: {
    borderRadius: '10px 10px 0px 0px',
    height: '230px',
    position: 'relative',
    backgroundColor: theme.palette.primary.light,
  },
  profileInfoBox: {
    position: 'relative',
    padding: '0px 50px',
    display: 'flex',
  },
  uploadCoverImageBtn: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '40px',
    position: 'absolute',
    right: '20px',
    bottom: '20px',
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
  },
  userProfilePhotoBox: {
    top: '-95px',
    position: 'relative',
  },
  userPhoto: {
    width: '240px',
    height: '240px',
    borderRadius: '10px',
  },
  profileInfoText: {
    width: '100%',
    padding: '22px 0px 0px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  profileInfoList: {
    '&.MuiList-root': {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '34px',
      padding: 0,
    },
  },
  profileInfoListItem: {
    '&.MuiListItem-root': {
      padding: '5px 20px',
      width: 'auto',
      height: '40px',
      borderRight: '1px solid black',
    },
  },
  profileContent: {
    width: '100%',
    display: 'flex',
  },
});

export default styles;
