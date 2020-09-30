import React, { Component } from 'react';
import MyCircularProgress from './Components/MyCircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BtmNav from "./Components/BtmNav";
import LinearProgress from '@material-ui/core/LinearProgress';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';


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
    },
    modal: {
        paddingTop: '10%',
        paddingBottom: '10%',
        paddingLeft: '6%',
        paddingRight: '6%',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop:'50%',
    }
})

export default class Challenges extends Component {
    constructor(props) {
        super(props);

        this.quizNav = this.quizNav.bind(this);
        this.handleClose = this.handleClose.bind(this);
        // getting last Date from database
        const lastDate = 'WedSep302020';
        const today = this.getMyDate();

        this.state = {
            countsPublicTrans: 2,
            countsWalk: 4,
            countsBike: 1,
            countsQuiz: 2,
            open: false,
            lastTrial: lastDate, // should have a default value
            today: today,
        }
    }

    getMyDate() {
        let date = new Date();
        let myDateArray = date.toString().split(' ');
        let myDate = myDateArray[0] + myDateArray[1] + myDateArray[2] + myDateArray[3];
        return myDate
    }

    quizNav() {
       
        // console.log(this.state.lastTrial)
        // console.log(this.state.today)
        if (this.state.lastTrial != this.state.today) {
            this.setState({lastTrial : this.state.today})
            // update the database
            window.location = '/quiz';
        } else {
            this.setState({open:true});
            // console.log(this.state.open)
        }
        
    }

    handleClose() {
        this.setState({open:false})
        // console.log(this.state.open)
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
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <Paper style={styles.modal}>
                        You have tried today.
                    </Paper>
                </Modal>
            </div>
        )
    }
}