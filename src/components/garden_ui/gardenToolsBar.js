import React from 'react';

import {createMuiTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import PixelAppBar from "../containers/PixelAppBar";
import {WaterCanIcon} from "./icons/toolIcons";
import {FertilizerIcon} from "./icons/toolIcons";
import {SunIcon} from "./icons/toolIcons";
import {SelectIcon} from "./icons/toolIcons";
import {blue} from "@material-ui/core/colors";


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

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

export default function GardenToolsBar(props) {
    const classes = useStyles();
    return(
        <PixelAppBar className={classes.bottomBar} position={"fixed"}>
            <ThemeProvider theme={theme}>
            <BottomNavigation
                value={props.currentTool}
                style={{background: 'none', height: '90px'}}
            >
                <BottomNavigationAction onClick={()=> props.onClick(0)} label={"SELECT"} icon={<SelectIcon style={{ fontSize: 40 }} />} />
                <BottomNavigationAction onClick={()=> props.onClick(1)}
                                        label={"Fertilizer(" + props.resourcesNumber.fertilizer + ")"}
                                        icon={<FertilizerIcon style={{ fontSize: 40 }} />} />
                <BottomNavigationAction onClick={()=> props.onClick(2)}
                                        label={"Water(" + props.resourcesNumber.water + ")"}
                                        icon={<WaterCanIcon style={{ fontSize: 40 }} />} />
                <BottomNavigationAction onClick={()=> props.onClick(3)}
                                        label={"Sunny(" + props.resourcesNumber.sunny + ")"}
                                        icon={<SunIcon style={{ fontSize: 40 }} />} />
            </BottomNavigation>
            </ThemeProvider>
        </PixelAppBar>
    );
}
