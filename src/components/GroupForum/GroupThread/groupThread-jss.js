const styles = (theme) => ({
  threadContainer: { '&.MuiAccordion-root': { marginBottom: '10px' } },
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
  memberNameText: {
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
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
      width: '65px',
      height: '65px',
    },
  },
  threadAnswersNumberInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '@media (max-width: 450px)': {
    threadAnswersNumberInfo: {
      display: 'none',
    },
  },
  threadManageContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    paddingLeft: '20px',
  },
  threadDetailsContainer: {
    '&.MuiAccordionDetails-root': {
      padding: '0px 15px 15px 15px',
    },
  },
  manageThreadAction: {
    '&.MuiButton-root': {
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
      marginBottom: '5px',
    },
  },
  createAnswerContainer: {
    margin: '15px 0px',
    display: 'flex',
  },
  createAnswerContent: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xxl')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  memberPhotoSmall: {
    '&.MuiAvatar-root': {
      width: '50px',
      height: '50px',
      marginRight: '20px',
    },
  },
  answerInput: {
    '&.MuiFormControl-root': {
      width: '70%',
      marginBottom: 0,
      [theme.breakpoints.down('xxl')]: {
        width: '100%',
        marginBottom: '10px',
      },
      '& .MuiInputBase-root': {
        minHeight: '55px',
        borderRadius: '10px',
        fontSize: '15px',
        [theme.breakpoints.down('sm')]: {
          fontSize: '13px',
        },
        border: '1px solid rgba(0, 0, 0, 0.22)',

        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: 0,
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderWidth: 0,
        },
      },
    },
  },
  answerBtn: {
    '&.MuiButton-root': {
      borderRadius: '10px',
      marginLeft: '20px',
      fontSize: '17px',
      height: '55px',
      width: '26%',
      [theme.breakpoints.down('xxl')]: {
        marginLeft: '0px',
        width: '40%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '60%',
      },
    },
  },
  avatarBadge: {
    '& .MuiBadge-badge': {
      width: '14px',
      height: '14px',
      borderRadius: '50px',
      border: `2px solid ${theme.palette.background.paper}`,
    },
  },
});

export default styles;
