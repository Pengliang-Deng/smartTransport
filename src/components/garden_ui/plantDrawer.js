import React from 'react';
import { makeStyles, createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Divider from "@material-ui/core/Divider";

/*seed images*/
import eustoma_seed from './flowers/seeds/eustoma-seed.png';
import tulip_seed  from './flowers/seeds/tulip-seed.png';
import rose_seed from './flowers/seeds/rose-seed.png';
import mystery_seed from './flowers/seeds/mystery-seed.png'
import {Typography} from "@material-ui/core";

const SEEDS = ['eustoma', 'tulip', 'rose', 'mystery']
const seedListItemsInfo = {
    "eustoma": {
        name: 'Eustoma Seed',
        image: eustoma_seed,
        description: 'Eustoma description here... xxxxxxxxxxxxxxxxxxxxxxx',
    },
    "tulip": {
        name: 'Tulip Seed',
        image: tulip_seed,
        description: 'Tulip description here... xxxxxxxxxxxxxxxxxxxxxxx',
    },
    "rose": {
        name: 'Rose Seed',
        image: rose_seed,
        description: 'Eustoma description here... xxxxxxxxxxxxxxxxxxxxxxx',
    },
    "mystery": {
        name: 'Mystery',
        image: mystery_seed,
        description: 'Plant it, you have a chance to get a mysterious flower, or just an ordinary one.'
    }
}

const useStyles = makeStyles({
    list: {
        width: 'auto',
        height: 'auto',
        background: '#ffa726'
    },
    imageContainer: {
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(250,162,0,1) 0%, rgba(226,66,14,0.6483544101234244) 100%)',
        marginRight: '10px',
        border: '3px solid #e65100',
        borderRadius: '5px',
    },
    listItemText: {
        color: 'black',
        maxWidth: '50%',
        fontWeight: 'bold'
    }
});

// ItemText Theme
const themeText = createMuiTheme({
    typography: {
        body1: {
            fontFamily: '"Press Start 2P"',
            fontSize: '14px',
        },
    },
});

export default function PlantDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });


    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    React.useImperativeHandle(props.cRef, () => ({
        toggle: (open) => {
            setState({ ...state, [anchor]: open });
        }
    }));

    const list = (anchor) => (
        <div style={{maxHeight: '50vh'}}
            className={classes.list}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
        >
            <ThemeProvider theme={themeText}>
                <List className={classes.list}>
                    {SEEDS.map((seed_key) => (
                        <ThemeProvider theme={themeText}>
                        <ListItem button key={seed_key} onClick={() => {props.plantAction(seed_key)}}>
                            <Box className={classes.imageContainer} style={{width: '100px', height: '100px'}}>
                                <img alt={seed_key + " seeds"} src={seedListItemsInfo[seed_key].image}/>
                            </Box>

                                <ListItemText className={classes.listItemText}
                                          primary={seedListItemsInfo[seed_key].name}
                                          secondary={
                                              <Typography variant="span" style={{color: "#424242", maxWidth: '50%', fontSize: '12px'}}>
                                                  {seedListItemsInfo[seed_key].description}
                                              </Typography>
                                          }
                                />

                            <ListItemText primary={(props.seedsList[seed_key])?props.seedsList[seed_key]:0}
                                          style={{float: 'right', textAlign: 'right'}}
                            />
                        </ListItem>
                            <Divider />
                        </ThemeProvider>
                    ))}
                </List>
            </ThemeProvider>
        </div>
    );

    const anchor = props.anchor;
    return (
        <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
        >
            {list(anchor)}
        </Drawer>
    );
}