const styles = (theme) => ({
  statsContainer: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '15px',
    },
  },
  statsHeading: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
      marginBottom: '10px',
    },
  },
  statsItem: {
    borderTop: '1px solid rgba(0, 0, 0, 0.22)',
    padding: '10px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  memberInformation: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    margin: '0px 10px',
  },
  memberPhoto: {
    '&.MuiAvatar-root': {
      width: '50px',
      height: '50px',
    },
  },
  memberNameText: {
    '&.MuiTypography-root': {
      marginLeft: '8px',
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
  },
});

export default styles;
