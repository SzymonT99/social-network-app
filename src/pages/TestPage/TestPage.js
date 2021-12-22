import React from 'react';
import Paper from '@mui/material/Paper';

const TestPage = (props) => {
    const {
        classes,
        children
    } = props;

    return (
        <>
            <Paper className={classes.wrapper} elevation={7}>
                <p>Test Page!</p>
            </Paper>
        </>
    )
};

export default (TestPage);