import React from 'react';

import {makeStyles} from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import PixelAppBar from "../containers/PixelAppBar";
import {WaterCanIcon} from "../icons/toolIcons";
import PanToolIcon from '@material-ui/icons/PanTool';
import {HomeIcon} from '../icons/toolIcons';
import {PanTool} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    bottomBar: {
        top: 'auto',
        bottom: 0,
        marginBottom: theme.spacing(4),
        marginTop: 0,
        width: '80%',
        margin: '10%',
    },
    icon : {
        width: '2em',
        height: '2em',
    },
}));

export default function GardenToolsBar(props) {
    const classes = useStyles();
    return(
        <PixelAppBar className={classes.bottomBar} position={"fixed"}>
            <BottomNavigation
                value={props.currentTool}
                style={{background: 'none', height: '90px'}}
            >
                <BottomNavigationAction onClick={()=> props.onClick(0)} label={"SELECT"} icon={<PanToolIcon fontSize="large" />} />
                <BottomNavigationAction onClick={()=> props.onClick(1)}
                                        label={"WATER(" + props.resourcesNumber.fertilizer + ")"}
                                        icon={<WaterCanIcon fontSize="large" />} />
                <BottomNavigationAction onClick={()=> props.onClick(2)} label="Select" icon={<HomeIcon fontSize="large" />} />
                <BottomNavigationAction onClick={()=> props.onClick(3)} label="Select" icon={<HomeIcon fontSize="large" />} />
            </BottomNavigation>
        </PixelAppBar>
    );
}
