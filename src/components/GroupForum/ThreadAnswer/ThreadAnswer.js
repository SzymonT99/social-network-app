import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './threadAnswer-jss';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ThreadAnswer = (props) => {
  const { classes } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  return <div></div>;
};

ThreadAnswer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThreadAnswer);
