import React, { useState, useEffect } from 'react';
// import MyCircularProgress from './Components/MyCircularProgress';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BtmNav from "./components/BtmNav";
// import LinearProgress from '@material-ui/core/LinearProgress';
// import Fab from '@material-ui/core/Fab';
// import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import AvatarBar from './components/AvatarBar';
import TaskBox from './components/TaskBox';
import ButtonBase from '@material-ui/core/ButtonBase';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import PixelTypography from './components/PixelTypography';
import Quiz from './Quiz';
import http from '../src/util/axios_packaged'

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
    box: {
        minHeight: '800px'
    }
}));

export default function Challenges(props) {
    const classes = useStyles();

    const [value, setValue] = useState(0)
    
    const [taskInfo, setTaskInfo] = useState({
        bicycleComplete: 0,
        walkingComplete: 0,
        transitComplete: 0,
    })

    const { bicycleComplete, walkingComplete, transitComplete } = taskInfo;

    const pullTaskInfo = async () => {
        let taskStatus;
        await http.get('/gameData/get/taskStatus')
        .then((res) => {
            taskStatus = res.data;
        })
        .catch((reason) => {
            // window.location = '/';
        })

        // console.log(taskStatus)
        setTaskInfo({
            bicycleComplete: taskStatus.bicycle,
            walkingComplete: taskStatus.walk,
            transitComplete: taskStatus.transit,
        })
}

useEffect(() => {pullTaskInfo()})



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
        <div className={classes.box}>
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
                        {<PixelTypography className={classes.title} fontStyle='textS2' variant='h5' text='TASKS' />}
                        {...a11yProps(0)} />
                        <Tab label=
                        {<PixelTypography className={classes.title} fontStyle='textS2' variant='h5' text='QUIZ' />}
                        {...a11yProps(1)} />
                    </Tabs>
                </Paper>
                
                <TabPanel value={value} index={0} >
                    
                        <div className={classes.taskBoxContainer}>
                            <ButtonBase>
                                <TaskBox  text="Take Transit Three Times" complete={transitComplete} goal="3" url={transitImg}/>
                            </ButtonBase>
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