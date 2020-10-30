import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import StoreIcon from "@material-ui/icons/Store";
import PixelAppBar from "../containers/PixelAppBar";
import { Link }from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

    topBar: {
        top: '4px',
        width: '95%',
        margin: '2.5%',
        marginTop: '0',
    },
    menuButton: {
        marginLeft: theme.spacing(2),
        color: 'black',
        position: 'absolute',
        right:'3%',
    },
    exitButton: {
        marginRight: theme.spacing(2),
        color: 'black',
    },
    title: {
        // flexGrow: 1,
        // fontFamily: "'VT323', monospace",
        fontFamily: '"Press Start 2P"',
        // fontStyle: 'cursive',
        color: 'black',
        fontSize: '0.8em',
    },
}));

/* App Bar on the top of garden UI*/
export default function TopBar(props) {
    const classes = useStyles();
    return(

        <PixelAppBar position="fixed" className={classes.topBar}>
            <Toolbar position="relative">
                <Link to='/homepage'>
                    <IconButton edge="start" className={classes.exitButton} color={"inherit"}>
                        <ArrowBackIcon />
                    </IconButton>
                </Link>
                <h1 className={classes.title}>{props.title}</h1>
                <Link to={'/store'} className={classes.menuButton}>
                    <IconButton edge="end" color="default" aria-label="menu">
                        <StoreIcon style={{fontSize: '40'}} />
                    </IconButton>
                </Link>
            </Toolbar>
        </PixelAppBar>

    )
}