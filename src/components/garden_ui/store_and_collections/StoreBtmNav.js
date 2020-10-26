import React from 'react'
import {createMuiTheme, makeStyles, ThemeProvider, withTheme} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {FenceIcon, SeedIcon} from "../icons/storeIcons"
import {deepOrange} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({

    btmNav: {
        top: 'auto',
        bottom: 0,
        background:'#464646',
        fontFamily: '"Press Start 2P"',
        palette: {
            primary: deepOrange,
        },
    },

}));

const storeBarTheme = createMuiTheme({
    palette: {
        primary: deepOrange,
    },
});
export default function StoreBtmNav(props) {
    const classes = useStyles();
    return(

        <AppBar position="fixed" className={classes.btmNav}>
            <ThemeProvider theme={storeBarTheme}>
                <BottomNavigation
                    value={props.currentList}
                    style={{background: 'none', height: '80px'}}
                >
                    <BottomNavigationAction onClick={()=> props.changeList(0)} label={"Planting"} icon={<SeedIcon style={{ fontSize: 40 }} />} />
                    <BottomNavigationAction onClick={()=> props.changeList(1)}
                                            label={"Decorations"}
                                            icon={<FenceIcon style={{ fontSize: 40 }} />} />
                </BottomNavigation>
            </ThemeProvider>
        </AppBar>

    )
}
