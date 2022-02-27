const styles = (theme) => ({
  wrapper: {
    margin: '20px 0px',
  },
  settingsContainer: {
    '&.MuiPaper-root': {
      marginTop: '15px',
      display: 'flex',
      borderRadius: '10px',
    },
  },
  settingsNav: {
    width: '30%',
    borderRight: '1px solid rgba(0, 0, 0, 0.22)',
  },
  settingsContent: {
    width: '70%',
    padding: '30px',
  },
  settingsTabList: {
    '&.MuiTabs-root': {
      height: '100%',
      '&:first-child': {
        borderTopLeftRadius: '10px',
      },
      '& .MuiTabs-flexContainer': {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        '& .MuiButtonBase-root': {
          display: 'flex',
          flexDirection: 'row',
          fontWeight: 400,
          textTransform: 'none',
          justifyContent: 'flex-start',
          alignItems: 'center',
          minHeight: 'auto',
          fontSize: '17px',
          padding: '15px 20px',
          color: theme.palette.primary.main,
          '& .MuiSvgIcon-root': {
            margin: '0px 8px 0px 0px',
          },
          '&.Mui-selected': {
            fontWeight: 'bold',
            backgroundColor: 'rgba(90, 107, 133, 0.3)',
            borderLeft: `4px solid ${theme.palette.primary.main}`,
          },
        },
      },
    },
  },
  currentValueText: {
    fontWeight: 500,
  },
  editAccountForm: {
    padding: '10px 30px',
  },
});

export default styles;
