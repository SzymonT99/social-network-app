const styles = (theme) => ({
  wrapper: {
    margin: '20px 0px',
    [theme.breakpoints.down('lg')]: {
      margin: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '10px',
    },
  },
  settingsContainer: {
    '&.MuiPaper-root': {
      marginTop: '15px',
      display: 'flex',
      borderRadius: '10px',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        padding: '15px',
      },
    },
  },
  settingsNav: {
    width: '30%',
    borderRight: '1px solid rgba(0, 0, 0, 0.22)',
    [theme.breakpoints.down('lg')]: {
      width: '35%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      border: 'none',
      paddingBottom: '15px',
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
  settingsContent: {
    width: '70%',
    padding: '30px',
    [theme.breakpoints.down('lg')]: {
      width: '65%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center',
    },
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
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          border: 'none',
          justifyContent: 'center',
        },
        '& .MuiButtonBase-root': {
          display: 'flex',
          flexDirection: 'row',
          fontWeight: 400,
          textTransform: 'none',
          justifyContent: 'flex-start',
          alignItems: 'center',
          textAlign: 'left',
          [theme.breakpoints.down('xl')]: {
            paddingLeft: '10px',
          },
          [theme.breakpoints.down('sm')]: {
            padding: '10px',
            margin: 0,
          },
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
            [theme.breakpoints.down('sm')]: {
              border: 'none',
            },
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
