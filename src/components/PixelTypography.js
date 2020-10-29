import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles((theme) => ({
    textS1: {
        fontFamily: '"Press Start 2P"'
    },
    textS2: {
        fontFamily: "'VT323', monospace"
    }
}))

// Pixel style font family is used
export default function PixelTypography(props) {
    const classes = useStyle();
    return (
        props.fontStyle === 'textS1'?
        <Typography className={classes.textS1} variant={props.variant}>{props.text}</Typography> :
        <Typography className={classes.textS2} variant={props.variant}>{props.text}</Typography>
    )
}

