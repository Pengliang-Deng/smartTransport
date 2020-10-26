import React from 'react';
import { makeStyles, createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Divider from "@material-ui/core/Divider";
import {Typography} from "@material-ui/core";

/*seed images*/
import eustoma_seed from '../flowers/seeds/eustoma-seed.png';
import tulip_seed  from '../flowers/seeds/tulip-seed.png';
import rose_seed from '../flowers/seeds/rose-seed.png';
import mystery_seed from '../flowers/seeds/mystery-seed.png'

/*resource images*/
import fertilizer1 from './imgs/items/fertilizer-1pack.png';
import fertilizer3 from './imgs/items/fertilizer-3packs.png';

/*grid images*/
import grid3 from './imgs/items/ground-update-3.png';
import grid9 from './imgs/items/ground-update-9.png';

const FIELDS = ['three_grids', 'nine_grids'];
const girdListItemsInfo = {
    "three_grids": {
        name: '3 Grids',
        image: grid3,
        description: 'Expand your garden!',
        quantity: 3,
        sale: true,
        price: 2000,
    },
    "nine_grids": {
        name: '9 Grids',
        image: grid9,
        description: "Tycoon's choice !",
        quantity: 9,
        sale: true,
        price: 5000,
    }
}

const RESOURCES = ['fertilizer_single', "fertilizer_triple"];
const resourceListItemsInfo = {
    "fertilizer_single": {
        name: 'Fertilizer',
        image: fertilizer1,
        description: 'Fertilizer that can promote the growth of flowers.',
        resources_name: 'fertilizer',
        quantity: 1,
        sale: true,
        price: 10,
    },
    "fertilizer_triple": {
        name: 'Fertilizer - Triple Pack',
        image: fertilizer3,
        description: 'Buy large packages and enjoy more favorable prices.',
        resources_name: 'fertilizer',
        quantity: 3,
        sale: true,
        price: 25,
    },
}

const SEEDS = ['eustoma', 'tulip', 'rose', 'mystery']
const seedListItemsInfo = {
    "eustoma": {
        name: 'Eustoma Seed',
        image: eustoma_seed,
        description: 'Eustoma description here... xxxxxxxxxxxxxxxxxxxxxxx',
        sale: true,
        price: 100,
    },
    "tulip": {
        name: 'Tulip Seed',
        image: tulip_seed,
        description: 'Tulip description here... xxxxxxxxxxxxxxxxxxxxxxx',
        sale: true,
        price: 100,
    },
    "rose": {
        name: 'Rose Seed',
        image: rose_seed,
        description: 'Eustoma description here... xxxxxxxxxxxxxxxxxxxxxxx',
        sale: true,
        price: 100,
    },
    "mystery": {
        name: 'Mystery',
        image: mystery_seed,
        description: 'Plant it, you have a chance to get a mysterious flower, or just an ordinary one.',
        sale: false,
        price: 100,
    }
}

const useStyles = makeStyles({
    listContainer: {
        width: 'auto',
        height: 'auto',
        background: '#ffa726',
        paddingTop: '50px',
        paddingBottom: '100px',
    },
    list: {
    },
    classTitle: {
        marginTop: '0',
        marginBottom: '3px',
        marginLeft: '3px',
        color: 'black',
        fontWeight: 'bold',
        fontFamily: "'VT323', monospace",
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
        maxWidth: '40%',
        fontWeight: 'bold'
    }
});

// ItemText Theme
const themeText = createMuiTheme({
    typography: {
        body1: {
            fontFamily: "'VT323', monospace",
            fontSize: '1.3em',
        },
    },
});

export default function PlantingItemList(props) {
    const classes = useStyles();
    const resourcesInfo = props.itemsInfo.resources;
    const seedsInfo = props.itemsInfo.seeds;
    const fieldSize = props.fieldSize;


    const seedItemList = (
        <List className={classes.list}>
            {/*seeds*/}
            <h2 className={classes.classTitle}>Seeds</h2>
            <Divider />
            <Divider />
            <Divider />
            {SEEDS.map((seed_key) => (
                <ThemeProvider key={seed_key} theme={themeText}>
                    <ListItem button key={seed_key}
                              onClick={() => {props.buySeed(seed_key, seedListItemsInfo[seed_key].price, seedListItemsInfo[seed_key].sale)}}>
                        <Box className={classes.imageContainer} style={{width: '100px', height: '100px'}}>
                            <img alt={seed_key + " seeds"} src={seedListItemsInfo[seed_key].image}/>
                        </Box>

                        <ListItemText className={classes.listItemText}
                                      primary={seedListItemsInfo[seed_key].name}
                                      secondary={
                                          <Typography variant="body1" style={{color: "#424242", maxWidth: '87%', fontSize: '15px'}}>
                                              {seedListItemsInfo[seed_key].description}
                                          </Typography>
                                      }
                        />

                        <ListItemText primary={seedListItemsInfo[seed_key].sale? "Price: "+seedListItemsInfo[seed_key].price: 'Unavailable'}
                                      secondary={
                                          <Typography variant="body1" style={{color: "#424242", fontSize: '20px'}}>
                                              {"Owned: " + (seedsInfo[seed_key]?seedsInfo[seed_key]:0)}
                                          </Typography>
                                      }
                                      style={{float: 'right', textAlign: 'right'}}
                        />
                    </ListItem>
                    <Divider />
                </ThemeProvider>
            ))}
        </List>
    );
    const resourceItemList = (
        <List className={classes.list}>
            {/*resources*/}
            <h2 className={classes.classTitle}>Resources</h2>
            <Divider />
            <Divider />
            <Divider />
            {RESOURCES.map((resource_key) => (
                <ThemeProvider key={resource_key} theme={themeText}>
                    <ListItem button key={resource_key}
                              onClick={() => {
                                  props.buyResource(resourceListItemsInfo[resource_key].name,
                                      resourceListItemsInfo[resource_key].price,
                                      resourceListItemsInfo[resource_key].sale,
                                      resourceListItemsInfo[resource_key].quantity,
                                      resourceListItemsInfo[resource_key].resources_name)
                              }}
                    >
                        <Box className={classes.imageContainer} style={{width: '100px', height: '100px'}}>
                            <img alt={resource_key} src={resourceListItemsInfo[resource_key].image} style={{maxWidth: '100px'}}/>
                        </Box>

                        <ListItemText className={classes.listItemText}
                                      primary={resourceListItemsInfo[resource_key].name}
                                      secondary={
                                          <Typography variant="body1" style={{color: "#424242", maxWidth: '87%', fontSize: '15px'}}>
                                              {resourceListItemsInfo[resource_key].description}
                                          </Typography>
                                      }
                        />

                        <ListItemText primary={resourceListItemsInfo[resource_key].sale? "Price: "+resourceListItemsInfo[resource_key].price: 'Unavailable'}
                                      secondary={
                                          <Typography variant="body1" style={{color: "#424242", fontSize: '20px'}}>
                                              {"Owned: "
                                              + (resourcesInfo[resourceListItemsInfo[resource_key].resources_name])}
                                          </Typography>
                                      }
                                      style={{float: 'right', textAlign: 'right'}}
                        />
                    </ListItem>
                    <Divider />
                </ThemeProvider>
            ))}
        </List>
    );
    const gridItemList = (
        <List className={classes.list}>
            {/*field grids*/}
            <h2 className={classes.classTitle}>Garden Field</h2>
            <Divider />
            <Divider />
            <Divider />
            {FIELDS.map((key) => (
                <ThemeProvider key={key} theme={themeText}>
                    <ListItem button key={key}
                              onClick={() => {
                                  props.buyGrids(girdListItemsInfo[key].price,
                                      girdListItemsInfo[key].sale,
                                      girdListItemsInfo[key].quantity)
                              }}
                    >
                        <Box className={classes.imageContainer} style={{width: '100px', height: '100px'}}>
                            <img alt={key} src={girdListItemsInfo[key].image} style={{maxWidth: '100px'}}/>
                        </Box>

                        <ListItemText className={classes.listItemText}
                                      primary={girdListItemsInfo[key].name}
                                      secondary={
                                          <Typography variant="body1" style={{color: "#424242", maxWidth: '87%', fontSize: '15px'}}>
                                              {girdListItemsInfo[key].description}
                                          </Typography>
                                      }
                        />

                        <ListItemText primary={girdListItemsInfo[key].sale? "Price: "+girdListItemsInfo[key].price: 'Unavailable'}
                                      secondary={
                                          <Typography variant="body1" style={{color: "#424242", fontSize: '20px'}}>
                                              {"Current: " + fieldSize}
                                          </Typography>
                                      }
                                      style={{float: 'right', textAlign: 'right'}}
                        />
                    </ListItem>
                    <Divider />
                </ThemeProvider>
            ))}
        </List>
    );

    return (
        <div
            className={classes.listContainer}
            role="presentation"
        >
            <ThemeProvider theme={themeText}>
                {seedItemList}
                {resourceItemList}
                {gridItemList}
            </ThemeProvider>
        </div>
    );
}