const styles = (theme) => ({
  profileInformationItemContainer: {
    display: 'flex',
    width: '100%',
    padding: '5px 0',
  },
  profileInformationItemTitle: {
    width: '30%',
    paddingRight: '20px',
    '&.MuiTypography-root': {
      textOverflow: 'ellipsis',
      fontWeight: 'bold',
    },
  },
  profileInformationItemContent: {
    width: '70%',
    '&.MuiTypography-root': {
      textOverflow: 'ellipsis',
    },
  },
  schoolItemContainer: {},
  schoolItemType: {
    fontWeight: 'bold',
    paddingBottom: '10px',
  },
  schoolItemContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  schoolItemDetails: {
    marginLeft: '20px',
    flex: 1,
  },
  schoolSettingsBtn: {
    '&.MuiButtonBase-root': {
      backgroundColor: 'rgb(212, 212, 212)',
      color: theme.palette.primary.dark,
      '&:hover': {
        backgroundColor: 'rgb(161,161,161)',
      },
    },
  },
});

export default styles;
