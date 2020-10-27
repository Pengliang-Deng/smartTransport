import React from 'react';
import { makeStyles, createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Divider from "@material-ui/core/Divider";
import {IconButton, Typography} from "@material-ui/core";
import {CheckBox, CheckBoxOutlineBlank} from "@material-ui/icons";

/*images*/
//scene
import sky from './imgs/decorations/sky-preview.png';
import autumn from './imgs/decorations/autumn-preview.png';
//fence
import fence_wood from '../fence/preview/wood.png';
import fence_stone from '../fence/preview/stone.png';
import fence_metal from '../fence/preview/metal.png';
import fence_wood_premium from '../fence/preview/wood_premium.png';
//bricks
import brick_stone from '../bricks/brick-stone.png';
import brick_brown from '../bricks/brick-brown.png';
import brick_flower from '../bricks/brick-flower.png';
import brick_sand from '../bricks/brick-sand.png';
import brick_snow from '../bricks/brick-snow.png';
import brick_grass from '../bricks/brick-grass.png';

const SCENES = ['normal', 'autumn'];
const FENCES = ['normal', 'stone', 'metal', 'wood-premium',];
const TILES = ['grass','stone-brick', 'brown', 'flower', 'sand', 'snow',];

const sceneListItemsInfo = {
    'normal': {
        name: 'Normal',
        image: sky,
        description: 'Wide, blue sky',
        sale: true,
        price: 2000,
    },
    'autumn': {
        name: 'Autumn',
        image: autumn,
        description: 'Autumn style',
        sale: true,
        price: 2000,
    },
}
const fenceListItemsInfo = {
    'normal': {
        name: 'Normal Wood',
        image: fence_wood,
        description: 'Normal fence',
        sale: true,
        price: 2000,
    },
    'stone': {
        name: 'Stone',
        image: fence_stone,
        description: 'Modern style',
        sale: true,
        price: 2000,
    },
    'metal': {
        name: 'Metal',
        image: fence_metal,
        description: 'A solid one',
        sale: true,
        price: 2000,
    },
    'wood-premium': {
        name: 'Premium Wood',
        image: fence_wood_premium,
        description: 'Old fashion',
        sale: true,
        price: 2000,
    },
}
const tileListItemsInfo = {
    'stone-brick': {
        name: 'Stone Brick',
        image: brick_stone,
        description: 'Grow flowers on the roof',
        sale: true,
        price: 2000,
    },
    'brown': {
        name: 'Brown Brick',
        image: brick_brown,
        description: 'Grow flowers in an old house',
        sale: true,
        price: 2000,
    },
    'flower': {
        name: 'Flower',
        image: brick_flower,
        description: 'Grow flowers in a botanic garden!',
        sale: true,
        price: 2000,
    },
    'snow': {
        name: 'Snow',
        image: brick_snow,
        description: 'Grow flowers in winter!',
        sale: true,
        price: 2000,
    },
    'grass': {
        name: 'Grass',
        image: brick_grass,
        description: 'Normal grass',
        sale: true,
        price: 2000,
    },
    'sand': {
        name: 'Sand',
        image: brick_sand,
        description: 'Grow flowers on sand, beside the sea',
        sale: true,
        price: 2000,
    },
}


const useStyles = makeStyles({
    listContainer: {
        width: 'auto',
        height: 'auto',
        minHeight: '100vh',
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
    },
    checkCircle: {
        right: '5%',
        position: 'absolute',
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

export default function DecorationItemList(props) {
    const classes = useStyles();
    const currentTile = props.fieldInfo.tileBackground;
    const currentFence = props.fieldInfo.fenceImage;
    const ownedTiles = props.styles.tileBackground;
    const ownedFences = props.styles.fence;
    const currentScene = props.fieldInfo.sceneBackground;
    const ownedScenes = props.styles.sceneBackground;

    const styleItemList = ( (styleType, current, ownedList, allNames, allInfos) => {
        return (
            <List className={classes.list}>
                <h2 className={classes.classTitle}>{styleType}</h2>
                <Divider />
                <Divider />
                <Divider />
                {allNames.map((key) => (
                    <ThemeProvider key={key} theme={themeText}>
                        <ListItem button key={key}
                                  onClick={
                                      ownedList.includes(key)?
                                      () => {props.switchStyle(styleType, key)}
                                      : () => {props.unlockStyle(styleType, key, allInfos[key].name, allInfos[key].sale, allInfos[key].price)}
                                  }
                        >
                            <Box className={classes.imageContainer} style={{width: '100px', height: '100px'}}>
                                <img alt={key} src={allInfos[key].image} style={{ height: '100px', width: '100px'}}/>
                            </Box>

                            <ListItemText className={classes.listItemText}
                                          primary={allInfos[key].name}
                                          secondary={
                                              <Typography variant="body1" style={{color: "#424242", maxWidth: '87%', fontSize: '15px'}}>
                                                  {allInfos[key].description}
                                              </Typography>
                                          }
                            />

                            {!ownedList.includes(key)?
                                <ListItemText primary={allInfos[key].sale? "Price: "+allInfos[key].price: 'Unavailable'}
                                              style={{float: 'right', textAlign: 'right'}}/>
                                :
                                <IconButton edge="end" className={classes.checkCircle}>
                                    {current === key ?<CheckBox style={{color: "green", fontSize: '40'}}/>
                                    :<CheckBoxOutlineBlank style={{color: "black", fontSize: '40'}}/>}
                                </IconButton>
                            }
                        </ListItem>
                        <Divider />
                    </ThemeProvider>
                ))}
            </List>
        );
    });

    return (
        <div
            className={classes.listContainer}
            role="presentation"
            style={{minHeight:'100vh'}}
        >
            <ThemeProvider theme={themeText}>
                {styleItemList("Scene", currentScene, ownedScenes, SCENES, sceneListItemsInfo)}
                {styleItemList("Fence", currentFence, ownedFences, FENCES, fenceListItemsInfo)}
                {styleItemList("Tile", currentTile, ownedTiles, TILES, tileListItemsInfo)}
            </ThemeProvider>
        </div>
    );
}