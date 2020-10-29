import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles((theme) => ({
    progress: {

    }
}))

// This component is abandoned during the development process
export default function MyCircularProgress(props) {
    const classes = useStyle();

    return (
        <div>
            <CircularProgress className = {classes.progress} variant='static' value={props.counts*20}
                size={120} thickness={8}
            />
            <Typography>{`${props.counts}/5`}</Typography>
            <Typography>{props.text}</Typography>
        </div>
    )
    
}
