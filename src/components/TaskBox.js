import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PixelTypography from './PixelTypography';
import {makeStyles} from '@material-ui/core/styles';
// import { Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    img: {
        width: '60px',
        height: '60px',
        marginLeft: '8px',
        display:'block',
        borderRadius: '10px'
    },

    grid: {
        flexWrap:'noWrap',
    },
    linearProgress: {
        borderRadius: 5,
        height: '6.5px'
    },
    paper: {
        minWidth: '68vw'
    }
}));

export default function TaskBox(props) {
    const classes = useStyles();
    const text = `${props.type}: Click to claim for 100 coins (${props.counts}/${props.goal})`;
    return (
        props.canClaim ? 
        <div>
            <Paper className={classes.paper}>
                <Grid style={{padding: '0px', display:'flex', justifyContent:'center'}} className={classes.grid} container spacing={2}>
                    <Grid item>
                        <PixelTypography  fontStyle="textS2" variant='h6' text={text} />
                    </Grid>
                </Grid>
            </Paper>
        </div>
        :
        <div>
            <Paper className={classes.paper}>
                <Grid className={classes.grid} container spacing={2}>
                    <Grid item>
                        <div ><img className={classes.img} alt="img" src={props.url} /></div>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid  item xs container direction="column" spacing={2}>
                            <Grid style={{padding: '0px', display:'flex', justifyContent:'flex-start'}} item xs>
                                <PixelTypography style={{fontWeight:'bold'}} fontStyle="textS2" variant='h6' text={props.text} />
                            </Grid>
                            <Grid style={{padding: '0px', display:'flex', justifyContent:'flex-end'}} item xs>
                                <PixelTypography fontStyle="textS2" variant='h7' text={`Progress(${props.counts}/${props.goal})`} />
                            </Grid>
                            <Grid style={{paddingTop: '1.5px', paddingBottom:'9px'}} item xs>
                                <LinearProgress className={classes.linearProgress} variant="determinate" value={`${props.counts/props.goal * 100}`}></LinearProgress>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}