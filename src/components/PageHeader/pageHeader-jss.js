const styles = (theme) => ({
  headingContainer: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.dark,
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    padding: '30px',
    minHeight: '100px',
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
  },
  headingIcon: {
    '&.MuiSvgIcon-root': {
      display: 'block',
      fontSize: '55px',
      marginRight: '20px',
    },
  },
  headingText: {
    '&.MuiTypography-root': {
      maxHeight: '100%',
      fontWeight: 'bold',
      borderLeft: `4px solid ${theme.palette.primary.dark}`,
      paddingLeft: '20px',
    },
  },
});

export default styles;
