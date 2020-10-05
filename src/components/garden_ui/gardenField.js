import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';

import ProgressBarSet from "./progressBarSet";

/**
 * Image resources
 */
import fence from './fence-temp.png';
import ground from './ground.png';
import outline from "../containers/outline.png";
import brickStone from './brick-stone.png';
// Flowers
import eustoma from './flowers/eustoma.gif';
import eustomaGrowth from './flowers/eustoma-growth.gif';
import rose from './flowers/rose.gif';
import roseGrowth from './flowers/rose-growth.gif';
import tulip from './flowers/tulip.gif';
import tulipGrowth from './flowers/tulip-growth.gif'
import seedling from './flowers/small-animation.gif';
// Indexes
const fieldImages = {
    flowers: {
        'eustoma': {
            'normal': eustoma,
            'growth':  eustomaGrowth
        },
        'rose': {
            'normal': rose,
            'growth': roseGrowth
        },
        'tulip': {
            'normal': tulip,
            'growth': tulipGrowth
        },
        'seedling': seedling
    },
    tileBackground: {
        'stone-brick': brickStone,
    },
    gridBackground: {
        'normal': ground,
    },
    gridOutline: {
        'normal': outline,
    },
    fenceImage: {
        'normal': fence,
    }
}


// export default class GardenField extends React.Component{
//     fieldGridRender(props, i) {
//         let gridBackground = fieldImages.gridBackground[props.fieldInfo.gridBackground];
//         let gridOutline = fieldImages.gridOutline[props.fieldInfo.gridOutline];
//         const grids = props.fieldInfo.grids;
//
//         return (
//             <GardenFieldGrid onClick={() => props.onClick(i)}
//                              key={i} background={gridBackground}
//                              outline={gridOutline} gridInfo={grids[i]}/>
//             );
//     }
//
//     render() {
//         let tileBackground = fieldImages.tileBackground[this.props.fieldInfo.tileBackground];
//         let fenceImage = fieldImages.fenceImage[this.props.fieldInfo.fenceImage];
//         let renderedGrids = [];
//         for (let i = 0; i < this.props.fieldInfo.grids.length; i++) {
//             renderedGrids.push(this.fieldGridRender(this.props, i));
//         }
//
//         return(
//             <Grid container justify="center" className='field'
//                   paddingTop={4} paddingBottom={19} flexGrow={1}
//                   backgroundImage={tileBackground}
//                   backgroundRepeat={"repeat"}
//                   position="relative" spacing={1}>
//                 <Box className="fence" position="absolute"
//                      width={"100%"} height={'80px'}
//                      backgroundImage={fenceImage} top={27}/>
//                 <Grid item xs={10}>
//                     <Grid container justify="center" spacing={4}>
//                         {renderedGrids}
//                     </Grid>
//                 </Grid>
//             </Grid>
//         )
//     }
//
// }

export default function GardenField(props){
    const tileBackground = fieldImages.tileBackground[props.fieldInfo.tileBackground];
    const fenceImage = fieldImages.fenceImage[props.fieldInfo.fenceImage];
    const gridBackground = fieldImages.gridBackground[props.fieldInfo.gridBackground];
    const gridOutline = fieldImages.gridOutline[props.fieldInfo.gridOutline];
    const grids = props.fieldInfo.grids;
    const selectedGrid = props.fieldInfo.selected;

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
                height: '80px',
                backgroundImage: 'url(' + fenceImage + ')',
                top: theme.spacing(27),
            }
        }));

        const classes = useStyles();
        const arr = Array.from(Array(props.fieldInfo.size)).map((v, k) => k);

        return(
            <Grid container justify="center" className={classes.field} position="relative" spacing={1}>
                <Box className={classes.fence} position="absolute"></Box>
                <Grid item xs={10}>
                    <Grid container justify="center" spacing={4}>
                        {arr.map((value) => (
                            <GardenFieldGrid
                                isSelected={(value === selectedGrid)}
                                onClick={() => props.onClick(value)} key={value}
                                background={gridBackground} outline={gridOutline}
                                gridInfo={grids[value]}/>
                        ))}
                    </Grid>
                </Grid>
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

    const [statusBar, setStatusBar] = React.useState(false);
    const[status, setStatus] = React.useState(gridInfo.status);
    React.useEffect(() => {
        if (gridInfo.preGrowthValue < 100 && gridInfo.growthValue >= 100) {
            setStatus('growth'); // show growth animation when growing
        } else if (gridInfo.preWaterValue < 50 && gridInfo.waterValue >= 50) {
            setStatus('revived'); // show reviving animation when flower is watered
        }
        // show status bar when status changes
        setStatusBar(true);
        // reset transition image
        setTimeout( () => {setStatus(gridInfo.status)}, 2000);
        // reset(hide) status bar
        setTimeout(() => {setStatusBar(false)}, 1000);
    }, [props.gridInfo.growthValue, props.gridInfo.waterValue, props.gridInfo.clickCount]);

    let flowerImageSrc = '';
    if (gridInfo.flower !== 'none') {
        if (gridInfo.growthValue < 100) {
            flowerImageSrc = fieldImages.flowers["seedling"];
        } else {
            flowerImageSrc = fieldImages.flowers[gridInfo.flower][status];
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

    return (
        <Grid onClick={() => props.onClick()} item xs={4} style={{position: 'relative'}}>
            <Box className={classes.filedGrid} style={{position: 'relative'}}>
                <img style={{maxWidth: '100%', position: 'absolute' , bottom: '35%'}} src={flowerImageSrc}/>
            </Box>
            {/*<ProgressBarSet className={classes.progressBarSet}*/}
            {/*                style={{position:'absolute', bottom: '5%', left: '5%'}}*/}
            {/*                growthValues={[0, props.gridInfo.growthValue]} waterValues={[0, props.gridInfo.waterValue]}>*/}
            {/*</ProgressBarSet>*/}
            {(statusBar||props.isSelected)?progressBar():null}
        </Grid>
    );
}