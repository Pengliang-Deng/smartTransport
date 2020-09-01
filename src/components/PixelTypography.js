import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles((theme) => ({
    text: {
        fontFamily: '"Press Start 2P"'
    }
}))

export default function PixelTypography(props) {
    const classes = useStyle();
    return (
        <Typography className={classes.text} variant={props.variant}>{props.text}</Typography>
    )
}

