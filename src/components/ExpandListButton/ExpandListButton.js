import { makeStyles } from '@mui/styles';
import { Link } from '@mui/material';
import React from 'react';
import { PropTypes } from 'prop-types';

const useStyles = makeStyles((theme) => ({
  moreItemsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15px',
    backgroundColor: theme.palette.primary.main,
    padding: '5px',
    borderRadius: '10px',
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
      '& .MuiLink-root': {
        textDecoration: 'underline',
      },
    },
  },
  moreItemsLink: {
    '&.MuiLink-root': {
      textDecoration: 'none',
      alignSelf: 'center',
      color: 'white',
    },
  },
}));

const ExpandListButton = ({ fetchMore }) => {
  const classes = useStyles();

  return (
    <div className={classes.moreItemsContainer} onClick={fetchMore}>
      <Link
        component="button"
        variant="subtitle2"
        className={classes.moreItemsLink}
      >
        Zobacz więcej
      </Link>
    </div>
  );
};

ExpandListButton.propTypes = {
  fetchMore: PropTypes.func.isRequired,
};

export default ExpandListButton;
