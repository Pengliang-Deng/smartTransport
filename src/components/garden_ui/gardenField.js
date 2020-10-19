import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
import PixelButton from "./PixelButton";

import ProgressBarSet from "./progressBarSet";

/**
 * Image resources
 */
//fence
import fence_wood from './fence/wood.png';
import fence_stone from './fence/stone.png';
import fence_metal from './fence/metal.png';
import fence_wood_premium from './fence/wood_premium.png';

import ground from './ground.png';
import outline from "../containers/outline.png";

//bricks
import brick_stone from './bricks/brick-stone.png';
import brick_brown from './bricks/brick-brown.png';
import brick_flower from './bricks/brick-flower.png';
import brick_sand from './bricks/brick-sand.png';
import brick_snow from './bricks/brick-snow.png';
import brick_grass from './bricks/brick-grass.png';
// Flowers
import eustoma from './flowers/eustoma.gif';
import eustomaGrowth from './flowers/eustoma-growth.gif';
import rose from './flowers/rose.gif';
import roseGrowth from './flowers/rose-growth.gif';
import tulip from './flowers/tulip.gif';
import tulipGrowth from './flowers/tulip-growth.gif'
import seedling from './flowers/small-animation.gif';
import cow from './flowers/cow.gif';
import pumpkin from './flowers/pumpkin.gif';
import dandelion from './flowers/dandelion.gif';
import dry_big from './flowers/dry-big.png';
import dry_small from './flowers/dry-small.png';
// action animations
import water_animation from './animation_gif/water-ani.gif';
import fer_animation from './animation_gif/fertilizer-ani.gif';
import sun_animation from './animation_gif/sun-ani.gif';

// Indexes
const fieldImages = {
    flowers: {
        'eustoma': {
            'normal': eustoma,
            'growth':  eustomaGrowth,
            'revived': eustomaGrowth,
        },
        'rose': {
            'normal': rose,
            'growth': roseGrowth,
            'revived': roseGrowth,
        },
        'tulip': {
            'normal': tulip,
            'growth': tulipGrowth,
            'revived': tulipGrowth,
        },
        'cow': {
            'normal': cow,
            'growth': cow,
            'revived': cow,
        },
        'pumpkin': {
            'normal': pumpkin,
            'growth': pumpkin,
            'revived': pumpkin,
        },
        'dandelion': {
            'normal': dandelion,
            'growth': dandelion,
            'revived': pumpkin,
        },
        'dry': [dry_big, dry_small],
        'seedling': seedling
    },
    tileBackground: {
        'stone-brick': brick_stone,
        'brown': brick_brown,
        'flower': brick_flower,
        'sand': brick_sand,
        'snow': brick_snow,
        'grass':brick_grass,
    },
    gridBackground: {
        'normal': ground,
    },
    gridOutline: {
        'normal': outline,
    },
    fenceImage: {
        'normal': fence_wood,
        'stone': fence_stone,
        'metal': fence_metal,
        'wood-premium': fence_wood_premium,
    }
}


export default function GardenField(props){
    const tileBackground = fieldImages.tileBackground[props.fieldInfo.tileBackground];
    const fenceImage = fieldImages.fenceImage[props.fieldInfo.fenceImage];
    const gridBackground = fieldImages.gridBackground[props.fieldInfo.gridBackground];
    const gridOutline = fieldImages.gridOutline[props.fieldInfo.gridOutline];
    const grids = props.fieldInfo.grids;
    const selectedGrid = props.selected;

    const useStyles = makeStyles((theme) => ({
        field: {
            flexGrow: 1,
            // marginTop: theme.spacing(1),
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(19),
            backgroundImage: 'url(' + tileBackground + ')',
            backgroundRepeat: 'repeat',
        },
        fence: {
            width: '100%',
            height: '50px',
            backgroundImage: 'url(' + fenceImage + ')',
            top: theme.spacing(28),
        },
    }));

    const sunAni = (show) => {
        if (show) return (
            <img alt="sum animation" src={sun_animation}
                 style={{position: "absolute", top: "15%", left: "10%", maxWidth: "100%"}}
            />
        );
        else return null;
    };

    /* handle sun animation */
    const[sun_animation_display, setAni] = React.useState(false); // water/fertilizer animation or nothing
    React.useEffect(() => {
        if (!props.fieldInfo.sunClickCount) return ;
        setAni(true); // set water animation
        const timer = setTimeout(() => {setAni(false)}, 1500); // reset(close) animation

        return () => clearTimeout(timer);
    }, [props.fieldInfo.sunClickCount]);

    const classes = useStyles();
    const arr = Array.from(Array(props.fieldInfo.size)).map((v, k) => k);
        return(
            <Grid container justify="center" className={classes.field} position="relative" spacing={0}>
                <Box className={classes.fence} position="absolute"/>
                <Grid item xs={10}>
                    <Grid container justify="center" spacing={4}>
                        {arr.map((value) => (
                            <GardenFieldGrid
                                isSelected={(value === selectedGrid)}
                                gridOnClick={() => props.gridOnClick(value)}
                                key={value}
                                background={gridBackground} outline={gridOutline}
                                gridInfo={grids[value]}
                                gridOptions={(mode) => props.gridOnClick(value, mode)}
                            />
                        ))}
                    </Grid>
                </Grid>
                {sunAni(sun_animation_display)}
            </Grid>
        )
}

function GardenFieldGrid(props) {
    const useStyles = makeStyles((theme) => ({
        filedGrid: {
            width: '100%',
            // height: 100,
            paddingTop: '100%',
            backgroundImage: 'url(' + props.background + '),linear-gradient(#E0F7FA, #18FFFF)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundBlendMode: (props.isSelected)?'lighten':'normal',

            borderImageSource: 'url(' + props.outline + ')',
            borderImageSlice: '15%',
            borderImageWidth: 7,
            borderImageOutset: 1,
            borderRadius: '11%',
        },
        progressBarSet: {
            width: '90%',
            height: '30%',
            // display: (props.isSelected)?'block':'none',
        }
    }));
    const classes = useStyles();

    const gridInfo = props.gridInfo;
    /* set the animation of growth, water and selection */

    /* handle flower status */
    const[status, setStatus] = React.useState(gridInfo.status); // normal/growing/revived status
    React.useEffect(() => {
        if (gridInfo.preGrowthValue < 100 && gridInfo.growthValue >= 100) {
            setStatus('growth'); // show growth animation when growing
        } else if (gridInfo.preWaterValue < 50 && gridInfo.waterValue >= 50) {
            setStatus('revived'); // show reviving animation when flower is watered
        }
        // reset transition image
        const timer = setTimeout( () => {setStatus(gridInfo.status)}, 2000);
        return () => clearTimeout(timer);
    }, [props.gridInfo.growthValue, props.gridInfo.waterValue]);

    /* handle status bar show */
    const [statusBar, setStatusBar] = React.useState(false); // status bar shown/hidden
    React.useEffect(() => {
        // show status bar when status changes
        setStatusBar(true);
        // reset(hide) status bar
        const timer = setTimeout(() => {setStatusBar(false)}, 2000);
        return () => clearTimeout(timer);
    }, [props.gridInfo.clickCount, props.gridInfo.growthValue, props.gridInfo.waterValue]);

    /* handle water/fertilizer animation */
    const[animation_type, setAni] = React.useState('none'); // water/fertilizer animation or nothing
    // water ani
    React.useEffect(() => {
        if (!props.gridInfo.waterClickCount) return ;
        setAni('water'); // set water animation
        const timer = setTimeout(() => {setAni('none')}, 1000); // reset(close) animation
        return () => clearTimeout(timer);
    }, [props.gridInfo.waterClickCount]);
    // fertilizer ani
    React.useEffect(() => {
        if (!props.gridInfo.ferClickCount) return ;
        setAni('fertilizer'); // set water animation
        const timer = setTimeout(() => {setAni('none')}, 1000); // reset(close) animation
        return () => clearTimeout(timer);
    }, [props.gridInfo.ferClickCount]);

    let flowerImageSrc = '';
    if (gridInfo.flower !== 'none') {
        if (gridInfo.growthValue < 100) {
            flowerImageSrc = (gridInfo.waterValue >= 30) ? fieldImages.flowers["seedling"] : fieldImages.flowers["dry"][1];
        } else {
            flowerImageSrc = (gridInfo.waterValue >= 30) ? fieldImages.flowers[gridInfo.flower][status] : fieldImages.flowers["dry"][0];
        }
    }

    const progressBar = () => {
        return (
            <ProgressBarSet className={classes.progressBarSet}
                                style={{position:'absolute', bottom: '5%', left: '5%'}}
                                growthValues={[props.gridInfo.preGrowthValue, props.gridInfo.growthValue]}
                            waterValues={[props.gridInfo.preWaterValue, props.gridInfo.waterValue]}>
            </ProgressBarSet>
        );
    }

    const operationButton = (hasFlower) => {
        if (hasFlower) return (
            <PixelButton color='primary'
                style={{position:'absolute', top: '15%', left: '10%', width: '80%', margin: '0'}}
            onClick={(e) => {props.gridOptions('remove'); e.stopPropagation();}}>
                Remove
            </PixelButton>
        );
        else return (
            <PixelButton
                color='secondary'
                style={{position:'absolute', top: '15%', left: '10%', width: '80%', margin: '0'}}
            onClick={(e) => {props.gridOptions('plant'); e.stopPropagation();}}>
                Plant
            </PixelButton>
        );
    }

    const waterFertilizerAnimation = (animationType) => {
        if (animationType === 'water') {
            return (
                <img alt="water_animation" src={water_animation}
                     style={{position:'absolute', top: '0', left: '25%', maxWidth: '80%', margin: '0'}}
                />
            )
        }
        else if (animationType === 'fertilizer') {
            return (
                <img alt="fertilizer_animation" src={fer_animation}
                     style={{position:'absolute', top: '0', left: '25%', maxWidth: '80%', margin: '0'}}
                />
            )
        }
        else return null;
    }

    return (
        <Grid onClick={() => props.gridOnClick()} item xs={4} style={{position: 'relative'}}>
            <Box className={classes.filedGrid} style={{position: 'relative'}}>
                <img style={{maxWidth: '100%', position: 'absolute' , bottom: '35%'}} src={flowerImageSrc}/>
            </Box>
            {(statusBar||props.isSelected)?progressBar():null}
            {props.isSelected?operationButton(gridInfo.flower !== "none"):null}
            {waterFertilizerAnimation(animation_type)}
        </Grid>
    );
}