import React, { useState } from 'react';
// import MyCircularProgress from './Components/MyCircularProgress';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BtmNav from "./Components/BtmNav";
// import LinearProgress from '@material-ui/core/LinearProgress';
// import Fab from '@material-ui/core/Fab';
// import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import AvatarBar from './Components/AvatarBar';
import TaskBox from './Components/TaskBox';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import PixelTypography from './Components/PixelTypography';
import Quiz from './Quiz'

import transitImg from './imgs/bus.png';
import walkingImg from './imgs/walk.png';
import bicycleImg from './imgs/bicycle.png';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`task-tabpanel-${index}`}
            aria-labelledby={`task-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3} >
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `task-tabpanel-${index}`,
        'aria-controls': `task-tabpanel-${index}`,
    };
}

// const styles = ({
//     quizBtn:{
//         marginTop: 30,
//         marginBottom: 50
//     },
//     sectionTitle:{
//         marginTop: 30,
//         marginBottom: 20
//     },
//     linearProgress:{
//         marginLeft:'10%',
//         marginRight:'10%',
//         marginBottom:50,
//         padding:5
//     },
//     modal: {
//         paddingTop: '10%',
//         paddingBottom: '10%',
//         paddingLeft: '6%',
//         paddingRight: '6%',
//         fontWeight: 'bold',
//         fontSize: '1.2rem',
//         marginLeft: '5%',
//         marginRight: '5%',
//         marginTop:'50%',
//     }
// })

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '150px',
        marginLeft: '6vw',
        marginRight: '6vw',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: '#FCFAF2',
        flexDirection: 'column',
        border: '2px solid #DAC9A6',
        borderRadius: '10px',
        boxShadow: '2px 4px #B4A582',
        // minHeight: '1200px'
    },
    paper: {
        marginTop: '10px',
        width: '80vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    tabs: {
        marginLeft: '10%',
        marginRight: '10%'
    },
    taskBoxContainer: {
        marginBottom: 40,
        marginTop: 40,
        boxShadow:'2px 2px #877F6C',
        borderRadius: '4px',
    },
}));

export default function Challenges(props) {
    const classes = useStyles();
    // constructor(props) {
    //     super(props);

    //     this.quizNav = this.quizNav.bind(this);
    //     this.handleClose = this.handleClose.bind(this);
    //     // getting last Date from database
    //     const lastDate = 'WedSep302020';
    //     const today = this.getMyDate();

    //     this.state = {
    //         countsPublicTrans: 2,
    //         countsWalk: 4,
    //         countsBike: 1,
    //         countsQuiz: 2,
    //         open: false,
    //         lastTrial: lastDate, // should have a default value
    //         today: today,
    //     }
    // }

    const [value, setValue] = useState(0)
    
    const [taskInfo, setTaskInfo] = useState({
        bicycleComplete: 1,
        walkingComplete: 1,
        transitComplete: 2,
    })

    const { bicycleComplete, walkingComplete, transitComplete } = taskInfo;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const getMyDate = () => {
        let date = new Date();
        let myDateArray = date.toString().split(' ');
        let myDate = myDateArray[0] + myDateArray[1] + myDateArray[2] + myDateArray[3];
        return myDate
    }

    const quizNav = () => {
       
        // console.log(this.state.lastTrial)
        // console.log(this.state.today)
        if (this.state.lastTrial !== this.state.today) {
            this.setState({lastTrial : this.state.today})
            // update the database
            window.location = '/quiz';
        } else {
            this.setState({open:true});
            // console.log(this.state.open)
        }
    }

    const handleClose = () => {
        this.setState({open:false})
        // console.log(this.state.open)
    }


    return (
        <div>
            <AvatarBar />
            <div className={classes.root} >
                <Paper className={classes.paper}>
                    <Tabs
                        className={classes.tabs}
                        value={value}
                        indicatorColor="secondary"
                        textColor="secondary"
                        onChange={handleChange}
                    >
                        <Tab label=
                        {<PixelTypography className={classes.title} fontStyle='textS2' variant='h5' text='WEEKLY TASKS' />}
                        {...a11yProps(0)} />
                        <Tab label=
                        {<PixelTypography className={classes.title} fontStyle='textS2' variant='h5' text='DAILY QUIZ' />}
                        {...a11yProps(1)} />
                    </Tabs>
                </Paper>

                <TabPanel value={value} index={0} >

                    <div className={classes.taskBoxContainer}>
                        <TaskBox  text="Take Public Transit Three Times" complete={transitComplete} goal="3" url={transitImg}/>
                    </div>

                    <div className={classes.taskBoxContainer}>
                        <TaskBox  text="Take Bicycle Three Times" complete={bicycleComplete} goal="3" url={bicycleImg}/>
                    </div>
                    
                    <div className={classes.taskBoxContainer}>
                        <TaskBox text="Walk Three Times" complete={walkingComplete} goal="3" url={walkingImg}/>
                    </div>
                    
                </TabPanel>

                <TabPanel value={value} index={1} >
                    <Quiz />
                </TabPanel>
            </div>
            <BtmNav current={2}/>
        </div>
    )
}