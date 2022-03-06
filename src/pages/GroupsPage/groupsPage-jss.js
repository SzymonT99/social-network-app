const styles = (theme) => ({
  wrapper: {
    margin: '20px 0',
  },
  groupsTopContainer: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '15px',
      padding: '26px',
    },
  },
  tabsContainer: {
    '&.MuiTabs-root': {
      minHeight: 'auto',
    },
  },
  tabItem: {
    '&.MuiTab-root': {
      textAlign: 'left',
      '&.MuiButtonBase-root': {
        minHeight: '30px',
        padding: 0,
        textTransform: 'none',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '17px',
        fontWeight: 400,
        marginRight: '20px',
        '&.Mui-selected': {
          fontWeight: 700,
        },
      },
    },
  },
  addGroupBtn: {
    '&.MuiButton-root': {
      borderRadius: '10px',
      fontSize: '16px',
    },
  },
});

export default styles;
