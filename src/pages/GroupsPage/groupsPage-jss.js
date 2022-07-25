const styles = (theme) => ({
  wrapper: {
    margin: '20px 0',
    [theme.breakpoints.down('lg')]: {
      margin: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '10px',
    },
  },
  groupsTopContainer: {
    '&.MuiPaper-root': {
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '15px',
      padding: '26px',
      alignItems: 'center',
    },
  },
  tabsContainer: {
    '&.MuiTabs-root': {
      minHeight: 'auto',
      '& .MuiTabs-flexContainer': {
        [theme.breakpoints.down('xl')]: {
          flexDirection: 'column',
        },
      },
      '& .MuiTabs-indicator': {
        [theme.breakpoints.down('xl')]: {
          display: 'none',
        },
      },
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
        [theme.breakpoints.down('xl')]: {
          padding: '10px',
          alignItems: 'flex-start',
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: '15px',
        },
        '&.Mui-selected': {
          fontWeight: 700,
          [theme.breakpoints.down('xl')]: {
            backgroundColor: theme.palette.secondary.light,
          },
        },
      },
    },
  },
  addGroupBtn: {
    '&.MuiButton-root': {
      borderRadius: '10px',
      fontSize: '17px',
    },
  },
  groupSearchbarContainer: {
    '&.MuiPaper-root': {
      backgroundColor: theme.palette.primary.light,
      marginTop: '15px',
      minHeight: '92px',
      padding: '0px 60px',
      [theme.breakpoints.down('md')]: {
        padding: '0px 20px',
      },
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  groupsListContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '15px',
    margin: '15px auto',
    [theme.breakpoints.down('xxl')]: {
      width: '80%',
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.down('xl')]: {
      width: '100%',
    },
    [theme.breakpoints.down('md')]: {
      width: '70%',
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  groupsPagination: {
    '&.MuiPagination-root': {
      padding: '15px',
      '& .MuiPagination-ul': {
        justifyContent: 'center',
      },
    },
  },
  paginationContainer: {
    '&.MuiPaper-root': {
      width: '100%',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  noContent: {
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
