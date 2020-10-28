import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import BtmNav from "./components/BtmNav";
import Paper from '@material-ui/core/Paper';
import AvatarBar from './components/AvatarBar';
import TaskBox from './components/TaskBox';
import ButtonBase from '@material-ui/core/ButtonBase';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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
        bicycleComplete: [0, false],
        walkingComplete: [0, false],
        transitComplete: [0, false]
    })

    const { bicycleComplete, walkingComplete, transitComplete } = taskInfo;

    /**
     * Function to check whether users can claim task rewards or not
     * @param {Number} counts 
     */
    const canClaim = (counts) => {
        if (counts >= 3) {
            return true
        }
        return false
    }

    const pullTaskInfo = async () => {
        let taskStatus;
        await http.get('/gameData/get/taskStatus')
        .then((res) => {
            taskStatus = res.data;
        })
        .catch((reason) => {
            window.location = '/';
        })

        // console.log(taskStatus)
        // Reload the current page if did not retrieve data from the server
        if (typeof taskStatus === 'undefined' ) {
            window.location.reload();
        }

        // console.log(canClaim(taskStatus.transit))
        setTaskInfo({
            bicycleComplete: [taskStatus.bicycle, canClaim(taskStatus.bicycle)],
            walkingComplete: [taskStatus.walk, canClaim(taskStatus.walk)],
            transitComplete: [taskStatus.transit, canClaim(taskStatus.transit)],
        })
}

useEffect(() => {pullTaskInfo()}, [])



    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    /**
     * claim task rewarding
     */
    const claimReward = (event) => {
        // console.log(event.target.innerText)
        // Output: Transit: Click to claim for 100 coins (3/3)

        let type = event.target.innerText.split(':')[0].toLowerCase();
        // console.log(type) : ["Transit", " Click to claim for 100 coins (3/3)"]
        http.post('/gameData/change', {increment: -3, mode: type})
        .then(
            http.post('/gameData/add/coins', {increment: 100}),
            window.alert("100 Coins added"),
            window.location.reload()
        )
        .catch(res => {
            // nothing
        })
        
    }

    // const handleChangeIndex = (index) => {
    //     setValue(index);
    // };

    // const getMyDate = () => {
    //     let date = new Date();
    //     let myDateArray = date.toString().split(' ');
    //     let myDate = myDateArray[0] + myDateArray[1] + myDateArray[2] + myDateArray[3];
    //     return myDate
    // }

    // const quizNav = () => {
       
    //     // console.log(this.state.lastTrial)
    //     // console.log(this.state.today)
    //     if (this.state.lastTrial !== this.state.today) {
    //         this.setState({lastTrial : this.state.today})
    //         // update the database
    //         window.location = '/quiz';
    //     } else {
    //         this.setState({open:true});
    //         // console.log(this.state.open)
    //     }
    // }

    // const handleClose = () => {
    //     this.setState({open:false})
    //     // console.log(this.state.open)
    // }


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
                        {transitComplete[1]?
                            <ButtonBase onClick={claimReward}>
                                <TaskBox  text="Transit 3 Times" type='Transit' canClaim={transitComplete[1]} counts={transitComplete[0]} goal="3" url={transitImg}/>
                            </ButtonBase>
                            :
                            <TaskBox  text="Transit 3 Times" type='Transit' canClaim={transitComplete[1]} counts={transitComplete[0]} goal="3" url={transitImg}/>
                        }
                    </div>
                    
                    <div className={classes.taskBoxContainer}>
                        {bicycleComplete[1]?
                            <ButtonBase onClick={claimReward}>
                                <TaskBox  text="Bicycle 3 Times" type='Bicycle' canClaim={bicycleComplete[1]} counts={bicycleComplete[0]} goal="3" url={bicycleImg}/>
                            </ButtonBase>
                            :
                            <TaskBox  text="Bicycle 3 Times" type='Bicycle' canClaim={bicycleComplete[1]} counts={bicycleComplete[0]} goal="3" url={bicycleImg}/>
                        }
                    </div>

                    <div className={classes.taskBoxContainer}>
                        {walkingComplete[1]?
                            <ButtonBase onClick={claimReward}>
                                <TaskBox text="Walk 3 Times" type='Walk' canClaim={walkingComplete[1]} counts={walkingComplete[0]} goal="3" url={walkingImg}/>
                            </ButtonBase>
                            :
                            <TaskBox text="Walk 3 Times" type='Walk' canClaim={walkingComplete[1]} counts={walkingComplete[0]} goal="3" url={walkingImg}/>
                        }   
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