import React from 'react';

import {makeStyles} from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import PixelAppBar from "../containers/PixelAppBar";
import {WaterCanIcon} from "../icons/toolIcons";
import {FertilizerIcon} from "../icons/toolIcons";
import {SunIcon} from "../icons/toolIcons";
import {SelectIcon} from "../icons/toolIcons";


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
                <BottomNavigationAction onClick={()=> props.onClick(0)} label={"SELECT"} icon={<SelectIcon fontSize="large" />} />
                <BottomNavigationAction onClick={()=> props.onClick(1)}
                                        label={"Fertilizer(" + props.resourcesNumber.fertilizer + ")"}
                                        icon={<FertilizerIcon fontSize="large" />} />
                <BottomNavigationAction onClick={()=> props.onClick(2)}
                                        label={"Water(" + props.resourcesNumber.water + ")"}
                                        icon={<WaterCanIcon fontSize="large" />} />
                <BottomNavigationAction onClick={()=> props.onClick(3)}
                                        label={"Sunny(" + props.resourcesNumber.sunny + ")"}
                                        icon={<SunIcon fontSize="large" />} />
            </BottomNavigation>
        </PixelAppBar>
    );
}
