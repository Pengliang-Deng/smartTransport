import React, { Component } from 'react';
import MyCircularProgress from './Components/MyCircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BtmNav from "./Components/BtmNav";
import LinearProgress from '@material-ui/core/LinearProgress';
import Fab from '@material-ui/core/Fab'
// import Paper from '@material-ui/core/Paper';

const styles = ({
    quizBtn:{
        marginTop: 30,
        marginBottom: 50
    },
    sectionTitle:{
        marginTop: 30,
        marginBottom: 20
    },
    linearProgress:{
        marginLeft:'10%',
        marginRight:'10%',
        marginBottom:50,
        padding:5
    }
})


export default class Challenges extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countsPublicTrans: 2,
            countsWalk: 4,
            countsBike: 1,
            countsQuiz: 2
        }
    }

    quizNav() {
        window.location = '/quiz'
    }

    render() {
        return (
            <div>
                <Typography style={styles.sectionTitle} variant='h4'>Weekly Challenge</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <MyCircularProgress counts={this.state.countsPublicTrans} text='Public Transportation' />
                    </Grid>
                    <Grid item xs={6}>
                        <MyCircularProgress counts={this.state.countsWalk} text='Walk' />
                    </Grid>
                    <Grid item xs={6}>
                        <MyCircularProgress counts={this.state.countsBike} text='Bike' />
                    </Grid>
                </Grid>
                <Typography style={styles.sectionTitle} variant='h4'>Extra Challenge</Typography>
                <Fab onClick={this.quizNav} style={styles.quizBtn} variant="extended" aria-label="Add" size="medium" color='primary'>
                    Start Quiz
                </Fab>
                <LinearProgress style={styles.linearProgress} variant='determinate' value={this.state.countsQuiz*25}></LinearProgress>
                
                <Typography variant='h6'>{`Progress: ${this.state.countsQuiz}/4`}</Typography>
                <BtmNav current={2}/>
            </div>
        )
    }
}