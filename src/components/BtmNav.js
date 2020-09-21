import React, { useState } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import House from '@material-ui/icons/House';
import Timer from '@material-ui/icons/Timer';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer'
import { Link } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
    container: {
        marginTop: 80
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
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={styles.container}
        >
        
            <BottomNavigationAction onClick={trackNav} label="Tracker" icon={<Timer />} /> 
                
          
            <BottomNavigationAction onClick={gardenNav} label="Garden" icon={<House />} />
     

            <BottomNavigationAction onClick={challengesNav} label="Challenges" icon={<QuestionAnswer />} />

        </BottomNavigation>
    )
}