import React, { useState, useEffect } from 'react';
import BtmNav from './BtmNav';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import AvatarBar from './AvatarBar';
import PixelTypography from './PixelTypography';
import backgroundGif from '../imgs/road.gif';
import Tracker from './Tracker';
import http from '../util/axios_packaged';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        // minHeight:'90vh',
        // paddingTop:'200px',
        backgroundImage: `url(${backgroundGif})`,
        height: '900px',
        width: '100vw',
        backgroundRepeat:'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition:'center'
    },
    root2: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        height: '900px',
        width: '100vw',
    },
    formLabel: {
        color:'black',
        fontSize: '2rem',
        margin: theme.spacing(3),
        fontFamily: "'VT323', monospace"
    },
    radioGroup: {
        // fontSize: '1.2rem',
        paddingLeft: '35%',
    },
    button: {
        marginTop: '10%',
        backgroundColor: '#43341B',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '20vw'
    },
    button2: {
        marginTop: '2px',
        backgroundColor: '#43341B',
        // position: 'relative',
        // left: '50%',
        // transform: 'translateX(-50%)',
    },
    formControl: {
        // backgroundColor: '#FCFAF2',
        background: 'rgba(252, 250, 242, 0.93)',
        paddingBottom: '20px',
        borderRadius: '40px',
        boxShadow: '2px 4px #B4A582',
        border: '2px solid #DAC9A6',
        width: '80%'
    },
}));

export default function HomePage(props) {
    const classes = useStyles();

    const [value, setValue] = useState('driving');
    const [start, setStart] = useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    useEffect(() => {pullIsTracking()},[]);

    // function to get isTracking status
    const pullIsTracking = () => {
        let trackStatus;
        http.get('/gameData/get/trackStatus').then((res) => {
            trackStatus = res.data;
            setStart(trackStatus.isTracking)
        })
    }

    const toggle = (event) => {

        if (!start) {
            // save the travel mode
            console.log(value);
            http.post('/gameData/save/trackStatus', {attribute: 'mode', value: JSON.stringify(value)})
        }

        setStart(!start);
        // save latest isTracking status
        http.post('/gameData/save/trackStatus', {attribute: 'isTracking', value: true})
    }

    return (
        <div>
            <AvatarBar />
            {start? 
                <div className={classes.root2}> 
                    <Tracker />
                    {/* <Button onClick={toggle} className={classes.button2} size='large' variant="contained" color="secondary" >
                        <PixelTypography fontStyle='textS2' variant='h5' text="END JOURNEY" />
                    </Button> */}
                </div>
                :
            <div className={classes.root}>
                <FormControl className={classes.formControl} component="fieldset" >
                    <FormLabel className={classes.formLabel} focused={false}>Please Select Your Travel Mode: </FormLabel>
                    <RadioGroup className={classes.radioGroup} value={value} onChange={handleChange}>
                        <FormControlLabel
                            value="driving" 
                            control={<Radio color="secondary"/>}
                            label={<PixelTypography fontStyle='textS2' variant='h5' text="Driving" />}
                        />
                        <FormControlLabel
                            value="bicycling"
                            control={<Radio color="secondary"/>}
                            label={<PixelTypography fontStyle='textS2' variant='h5' text="Bicycling" />}
                        />
                        <FormControlLabel
                            value="transit" 
                            control={<Radio color="secondary"/>}
                            label={<PixelTypography fontStyle='textS2' variant='h5' text="Transit" />}
                        />
                        <FormControlLabel
                            value="walking" 
                            control={<Radio color="secondary"/>}
                            label={<PixelTypography fontStyle='textS2' variant='h5' text="Walking" />}
                        />                                                                        
                    </RadioGroup>
                    <Button onClick={toggle} className={classes.button} size='large' variant="contained" color="secondary" >
                        <PixelTypography fontStyle='textS2' variant='h5' text="START" />
                    </Button>
                </FormControl>
            </div>
            }
            <BtmNav current={0} />
        </div>
        
        
    )
    
}