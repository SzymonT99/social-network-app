import React from 'react';
import styles from './registerPage-jss';
import { withStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';

const RegisterPage = (props) => {
    const {
        classes,
        children
    } = props;

    return (
        <>
            <Paper className={classes.wrapper} elevation={7}>
                <p>Register Page!</p>
            </Paper>
        </>
    )
};

export default withStyles(styles)(RegisterPage);