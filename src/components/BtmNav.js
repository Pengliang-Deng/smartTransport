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
    const [value, setValue] = React.useState(0);
    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={styles.container}
        >
            <BottomNavigationAction label="Tracker" icon={<Timer />} />
            <Link to='/garden' >
                <BottomNavigationAction icon={<House />} />
            </Link>
            <BottomNavigationAction label="Challenges" icon={<QuestionAnswer />}/>
        </BottomNavigation>
    )
}