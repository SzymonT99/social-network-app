const styles = (theme) => ({
  rightbarContainer: {
    flex: 2,
    position: 'sticky',
    overflowY: 'scroll',
    scrollbarWidth: 'thin',
    height: 'calc(100vh - 80px)',
    top: '80px',
    backgroundColor: theme.palette.primary.contrastText,
    '&::-webkit-scrollbar': {
      width: '7px',
      backgroundColor: 'rgb(240,240,240)',
    },
  },
  rightbarWrapper: {
    padding: '15px',
  },
});

export default styles;
