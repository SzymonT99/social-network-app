import React from 'react';
import styles from './loginPage-jss';
import { withStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';

const LoginPage = (props) => {
    const {
        classes,
    } = props;

    return (
        <>
            <Paper className={classes.wrapper} elevation={7}>
                <p>Login Page!</p>
            </Paper>
        </>
    )
};

export default withStyles(styles)(LoginPage);