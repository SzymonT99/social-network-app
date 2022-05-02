const styles = (theme) => ({
  userMenu: {
    '&.MuiPaper-root': {
      padding: '0px 10px',
      borderRadius: '5px',
      backgroundColor: theme.palette.secondary.light,
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      marginTop: '4.5px',
      '& .MuiAvatar-root': {
        width: '35px',
        height: '35px',
        marginLeft: '-5.5px',
        marginRight: '6px',
      },
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: '1px',
        right: '27px',
        width: '15px',
        height: '15px',
        backgroundColor: theme.palette.secondary.light,
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
  },
  userMenuItem: {
    '&.MuiMenuItem-root': {
      '&.Mui-disabled': {
        color: 'rgba(0, 0, 0, 0.87)',
        opacity: 1,
      },
      '& .MuiListItemText-root': {
        marginLeft: '5px',
        '& .MuiTypography-root': {
          color: 'rgba(0, 0, 0, 0.87)',
        },
      },
      '& .MuiListItemIcon-root': {
        color: 'rgba(0, 0, 0, 0.87)',
      },
    },
  },
  divider: {
    '&.MuiDivider-root': {
      borderColor: theme.palette.secondary.main,
    },
  },
});

export default styles;
