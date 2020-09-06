import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '17px',
    },
    lp: {
        colorPrimary: '#000000',
        height: '5px',
        color: '#000000',
        border: '5px solid black'
    }
});

function LinearProgressWithLabel(props) {
    const classes=useStyles();
    return (
        <Box display="flex" alignItems="center">
            {/*<Box minWidth={45}>*/}
            {/*    <Typography variant="body2" color="textSecondary">{props.barLabel}</Typography>*/}
            {/*</Box>*/}
            <Box width="100%" mr={1}>
                <LinearProgress className={classes.lp} variant="determinate" {...props} />
            </Box>
            {/*<Box minWidth={35}>*/}
            {/*    <Typography variant="body2" color="textSecondary">{`${Math.round(*/}
            {/*        props.value,*/}
            {/*    )}%`}</Typography>*/}
            {/*</Box>*/}
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};



export function LinearWithValueLabel(props) {
    const classes = useStyles();
    const [progress, setProgress] = React.useState(props.pre);


    React.useEffect(() => {
        setProgress(props.curr);
    }, []);

    return (
        <div className={classes.root}>
            <LinearProgressWithLabel barLabel={props.barLabel} color={props.color} value={progress} />
        </div>
    );
}

export default function ProgressBarSet(props) {
    /**@type {[number, number]}*/
    const growthValues = props.growthValues;
    /**@type {[number, number]}*/
    const waterValues = props.waterValues;

    return (
        <Fade in={true}>
            <Box {...props}>
                <LinearWithValueLabel  barlabel={"growth"} color={"secondary"}
                                      pre={growthValues[0]} curr={growthValues[1]}/>
                <LinearWithValueLabel barlabel={"water"} color={"primary"}
                                      pre={waterValues[0]} curr={waterValues[1]}/>
            </Box>
        </Fade>
    );
}