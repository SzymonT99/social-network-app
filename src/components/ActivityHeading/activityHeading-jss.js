const styles = (theme) => ({
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
  authorName: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  actionName: {
    fontSize: 16,
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      fontSize: '13px',
    },
  },
  groupActivityContainer: {
    position: 'relative',
    marginRight: '20px',
  },
  groupImageBox: {
    borderRadius: '10px',
    width: '60px',
    height: '60px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  groupMemberPhoto: {
    '&.MuiAvatar-root': {
      position: 'absolute',
      right: '-7px',
      bottom: '-7px',
      width: '32px',
      height: '32px',
      border: `3px solid ${theme.palette.background.paper}`,
    },
  },
  groupNameText: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
      lineHeight: 1,
      '&:hover': {
        textDecoration: 'underline',
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
});

export default styles;
