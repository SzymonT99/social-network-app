const styles = (theme) => ({
  threadHeadingContainer: {
    '&.MuiAccordionSummary-root': {
      padding: '6px 15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& .Mui-expanded': {
        margin: '12px 0',
      },
    },
  },
  threadHeadingContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    padding: '0px 20px',
  },
  memberPhoto: {
    '&.MuiAvatar-root': {
      width: '60px',
      height: '60px',
    },
  },
  threadAnswersNumberInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  threadManageContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    paddingLeft: '20px',
  },
  threadDetailsContainer: {
    '&.MuiAccordionDetails-root': {
      padding: '0px 15px 15px 15px',
    },
  },
  manageThreadAction: {
    '&.MuiTypography-root': {
      display: 'flex',
      alignItems: 'center',
      marginRight: '20px',
      '& .MuiSvgIcon-root': {
        marginRight: '7px',
      },
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
  },
  threadDetailsContent: {
    padding: '20px 0px',
  },
  threadImage: {
    marginTop: '15px',
    width: '100%',
    height: '400px',
    objectFit: 'cover',
  },
  answersNumberText: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
      marginLeft: '20px',
    },
  },
});

export default styles;
