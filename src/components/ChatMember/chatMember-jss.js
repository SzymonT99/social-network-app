const styles = (theme) => ({
  manageMemberBox: { display: 'none' },
  memberContainer: {
    margin: '15px 0px',
    display: 'flex',
    alignItems: 'center',
    '&:hover $manageMemberBox': {
      display: 'block',
    },
  },
  memberContent: {
    width: '180px',
    [theme.breakpoints.down('sm')]: {
      width: '105px',
    },
  },
  memberPhoto: {
    '&.MuiAvatar-root': {
      width: '40px',
      height: '40px',
      marginRight: '10px',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  memberJoiningDate: {
    '&.MuiTypography-root': {
      fontSize: '12px',
      lineHeight: 1.2,
      [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
      },
    },
  },
});

export default styles;
