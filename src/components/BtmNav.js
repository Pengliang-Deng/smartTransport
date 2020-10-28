import React, { useState } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import House from '@material-ui/icons/House';
import Timer from '@material-ui/icons/Timer';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import AppBar from '@material-ui/core/AppBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PixelTypography from './PixelTypography';


const useStyles = makeStyles({
    container: {
        marginTop: 0,
        backgroundColor: '#FFAB00'
    },
    appbar: {
        bottom: 0,
        top: 'auto',
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: '#FFAB00'
    },
    item: {
        marginLeft: '10px',
        marginRight: '10px',
        backgroundColor:'#FCFAF2',
        borderRadius:'13px',
        boxShadow: '2px 4px #DAC9A6',
        paddingTop:'10px'
    },
    gardenButton: {
        marginLeft: '10px',
        marginRight: '10px',
        backgroundColor:'#FCFAF2',
        borderRadius:'50px',
        boxShadow: '2px 4px #DAC9A6',
        paddingTop:'10px'
    }
})

export default function BtmNav(props) {
    const styles = useStyles();
    const [value, setValue] = React.useState(props.current);

    const trackNav = () => {
        window.location = '/homepage'
    }

    const gardenNav  = () => {
        window.location = '/garden'
    }

    const challengesNav = () => {
        window.location = '/challenges'
    }


    return (
        <AppBar className={styles.appbar} position={'fixed'}>
            <BottomNavigation

                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={styles.container}
            >
                
                <BottomNavigationAction className={styles.item} onClick={trackNav} 
                label={<PixelTypography fontStyle='textS2' variant='button' text="Tracker" />}
                icon={<Timer />} /> 
                    
            
                <BottomNavigationAction className={styles.gardenButton} onClick={gardenNav} 
                label={<PixelTypography fontStyle='textS2' variant='button' text="Garden" />} 
                icon={<House />} />
        

                <BottomNavigationAction className={styles.item} onClick={challengesNav}
                 label={<PixelTypography fontStyle='textS2' variant='button' text="Challenges" />}
                 icon={<QuestionAnswer />} />

            </BottomNavigation>
        </AppBar>
    )
} 