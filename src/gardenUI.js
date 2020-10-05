import './index.css';
// React
import React from 'react';
// Material-UI
import Box from '@material-ui/core/Box';
// Components
import TopBar from "./components/garden_ui/topBar";
import GardenToolsBar from "./components/garden_ui/gardenToolsBar";
import GardenField from "./components/garden_ui/gardenField";

import bgImg from './components/garden_ui/sky.png';


export default class Garden extends React.Component {
    constructor(props) {
        super(props);
        /**
         * @type {{
         *  fieldInfo: {size:number, tileBackground: string, fenceImage: string,
         *       gridBackground: string, gridOutline: string, grids: [], selected: number},
         *  playerInfo: {playerName: string},
         *  itemsInfo: {coins: number, resources: {water:number, fertilizer: number, sunny: number},seeds: []}
         * }}
         */
        const gameInfo = props.gameInfo;
        if (gameInfo.fieldInfo.grids.length < gameInfo.fieldInfo.size) {
            let grids = gameInfo.fieldInfo.grids;
            const size = grids.length;
            for (let i=0; i < gameInfo.fieldInfo.size - size; i++) {
                grids = grids.concat(
                    {
                        flower: 'none',
                        status: 'normal',
                        growthValue: 0,
                        waterValue: 0
                    });
            }
            for (let i=0; i < grids.length; i++) {
                grids[i].preGrowthValue = grids[i].growthValue;
                grids[i].preWaterValue = grids[i].waterValue;
            }
            gameInfo.fieldInfo.grids = grids;
        }
        this.state = {
            currentTool: 0,
            fieldInfo: {
                // number of grids in the field
                size: gameInfo.fieldInfo.size,
                // styles of the garden
                tileBackground: gameInfo.fieldInfo.tileBackground,
                fenceImage: gameInfo.fieldInfo.fenceImage,
                gridBackground: gameInfo.fieldInfo.gridBackground,
                gridOutline: gameInfo.fieldInfo.gridOutline,

                // information of all grids
                grids: gameInfo.fieldInfo.grids,

                // current selected grid
                selected: null,
            },
            playerInfo: {
                playerName: gameInfo.playerInfo.playerName,
            },
            itemsInfo: {
               coins: gameInfo.itemsInfo.coins,
               resources: {
                   /* number of resources */
                   water: gameInfo.itemsInfo.resources.water,
                   fertilizer: gameInfo.itemsInfo.resources.fertilizer,
                   sunny: gameInfo.itemsInfo.resources.sunny,
               },
                seeds: gameInfo.itemsInfo.seeds
            }
        }
    }

    render() {
        return(
            <Box style={{left: 0, background: '#42A5F5'}} container className="app" xs={12}>
                <Box style={
                    {width: '100%',
                        height: '260px',
                        backgroundImage: 'url(' + bgImg +')',
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                }} container>
                </Box>
                <TopBar/>
                <GardenField onClick={(i) => this.handleFieldClick(i)} fieldInfo={this.state.fieldInfo}/>
                <GardenToolsBar resourcesNumber={this.state.itemsInfo.resources} currentTool={this.state.currentTool} onClick={(i) => this.handleToolBarClick(i)}/>
            </Box>
        );
    }

    handleToolBarClick(i) {
        let stateTemp = JSON.parse(JSON.stringify(this.state));
        stateTemp.currentTool = i;
        if (i !== 0) {
            stateTemp.fieldInfo.selected = null;
        }
        this.setState(stateTemp);
    }

    handleFieldClick(i) {
        /* Value increments of items */
        const WATER_INCREMENT = 10;
        const FERTILIZER_INCREMENT = 10;
        const SUN_INCREMENT = 10;

        let stateTemp = JSON.parse(JSON.stringify(this.state));
        let currentGrid = stateTemp.fieldInfo.grids[i]

        // record current water and growth values before intended changes happen
        for (let i=0; i < stateTemp.fieldInfo.grids.length; i++) {
            stateTemp.fieldInfo.grids[i].preGrowthValue = stateTemp.fieldInfo.grids[i].growthValue;
            stateTemp.fieldInfo.grids[i].preWaterValue = stateTemp.fieldInfo.grids[i].waterValue;
        }

        if (stateTemp.currentTool === 0) { // SELECT
            stateTemp.fieldInfo.selected = (stateTemp.fieldInfo.selected !== i)?i:null;
        }
        else if (stateTemp.currentTool === 1) { // FERTILIZER
            if (currentGrid.flower === "none") {
                /*TODO*/
            } else if (currentGrid.growthValue >= 100) {
                /*TODO*/
            } else if (stateTemp.itemsInfo.resources.fertilizer <= 0) {
                /*TODO*/
            } else { // use fertilizer
                currentGrid.growthValue = Math.min(100, currentGrid.growthValue + FERTILIZER_INCREMENT);
                stateTemp.itemsInfo.resources.fertilizer = Math.max(0, this.state.itemsInfo.resources.fertilizer - 1)
            }
        }
        /* Click detection*/
        if (currentGrid.clickCount) {
            currentGrid.clickCount++;
        } else {
            currentGrid.clickCount = 1;
        }

        stateTemp.fieldInfo.grids[i] = currentGrid;
        this.setState(stateTemp);
    }

}
