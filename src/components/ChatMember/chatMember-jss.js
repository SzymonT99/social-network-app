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
});

export default styles;
