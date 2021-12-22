import React from 'react';
import styles from './template-jss';
import { withStyles } from '@mui/styles';

const AuthTemplate = (props) => {
    const {
        classes,
        children
    } = props;

    return (
        <div className={classes.mainContainer}>
            <main className={classes.authContent}>
                {children}
            </main>
        </div>
    )
};

export default withStyles(styles)(AuthTemplate);