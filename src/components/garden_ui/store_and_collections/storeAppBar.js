import React from 'react'
import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AppBar from "@material-ui/core/AppBar";
import coin from './imgs/coin.png'

const useStyles = makeStyles((theme) => ({

    topBar: {
        top: 0,
        background:'#464646',
        fontFamily: '"Press Start 2P"',
        // fontStyle: 'cursive',
        color: 'white',
        fontSize: '0.8em',
    },

    coins: {
        marginLeft: theme.spacing(2),
        color: 'white',
        position: 'absolute',
        right:'3%',
        display: 'flex',
        flexDirection: 'row',
    },
    exitButton: {
        marginRight: theme.spacing(2),
        color: 'white',
    },
    title: {
        // flexGrow: 1,
        // fontFamily: "'VT323', monospace",
        fontFamily: '"Press Start 2P"',
        // fontStyle: 'cursive',
        color: 'white',
        fontSize: '0.8em',
    },
}));

const gardenNav  = () => {
    window.location = '/garden'
}

export default function StoreBar(props) {
    const classes = useStyles();
    return(

        <AppBar position="fixed" className={classes.topBar}>
            <Toolbar position="relative">
                <IconButton edge="start" className={classes.exitButton} onClick={gardenNav} color={"inherit"} size={"medium"}>
                    <ArrowBackIcon />
                </IconButton>
                <h1 className={classes.title}>{props.title}</h1>
                <div className={classes.coins}>
                    <img src={coin} alt="coin-img" style={{width: '40px', height: '40px'}}/>
                    <h4>{props.coins}</h4>
                </div>
            </Toolbar>
        </AppBar>

    )
}