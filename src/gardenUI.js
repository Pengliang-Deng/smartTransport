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
import PlantDrawer from "./components/garden_ui/plantDrawer";


export default class Garden extends React.Component {
    constructor(props) {
        super(props);
        /**
         * @type {{
         *  selected: number,
         *  fieldInfo: {size:number, tileBackground: string, fenceImage: string,
         *       gridBackground: string, gridOutline: string, grids: [], },
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
            // current selected grid
            selected: null,

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
                {/*Theme background*/}
                <Box style={
                    {width: '100%',
                        height: '260px',
                        backgroundImage: 'url(' + bgImg +')',
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                }} container>
                </Box>
                {/*Title bar on the top*/}
                <TopBar title={this.state.playerInfo.playerName + "'s Garden"}/>
                {/*Garden Field*/}
                <GardenField gridOnClick={(i, mode=null) => this.handleFieldClick(i, mode)}
                             fieldInfo={this.state.fieldInfo}
                             selected = {this.state.selected}
                    gridOptions={(mode, gridIndex) => this.gridOptions(mode, gridIndex)}
                />
                {/*Tools Bar*/}
                <GardenToolsBar
                    resourcesNumber={this.state.itemsInfo.resources}
                    currentTool={this.state.currentTool}
                    onClick={(i) => this.handleToolBarClick(i)}
                />
                <PlantDrawer cRef={(ref) => {this.plantDrawer = ref;}}
                             anchor="bottom"
                             seedsList={this.state.itemsInfo.seeds}
                             plantAction={(flower) => this.plantFlower(flower)}
                />
            </Box>
        );
    }

    handleToolBarClick(i) {
        let stateTemp = JSON.parse(JSON.stringify(this.state));
        stateTemp.currentTool = i;
        if (i !== 0) {
            stateTemp.selected = null;
        }
        this.setState(stateTemp);
    }

    handleFieldClick(i, gridOption=null) {

        /* Value increments of items */
        const WATER_INCREMENT = 10;
        const WATER_DECREMENT = -3;
        const FERTILIZER_INCREMENT = 10;
        const SUN_INCREMENT = 3;
        const SUN_WATER_INCREAMENT = -1;

        let stateTemp = JSON.parse(JSON.stringify(this.state));

        // record current water and growth values before intended changes happen
        for (let i=0; i < stateTemp.fieldInfo.grids.length; i++) {
            stateTemp.fieldInfo.grids[i].preGrowthValue = stateTemp.fieldInfo.grids[i].growthValue;
            stateTemp.fieldInfo.grids[i].preWaterValue = stateTemp.fieldInfo.grids[i].waterValue;
        }

        if (stateTemp.currentTool === 0) { // SELECT
            if (gridOption === null) {
                stateTemp.selected = (stateTemp.selected !== i)?i:null;
            }
            else { // plant or remove
                stateTemp = this.gridOptions(gridOption, i, stateTemp);
            }
        }
        else if (stateTemp.currentTool === 1) { // FERTILIZER
            if (stateTemp.fieldInfo.grids[i].flower === "none") {
                window.alert("No flower here");
            } else if (stateTemp.itemsInfo.resources.fertilizer <= 0) {
                window.alert("Your fertilizer has been used up");
            } else { // use fertilizer
                stateTemp.fieldInfo.grids[i].growthValue = Math.min(100, stateTemp.fieldInfo.grids[i].growthValue + FERTILIZER_INCREMENT);
                stateTemp.fieldInfo.grids[i].waterValue = Math.min(100, stateTemp.fieldInfo.grids[i].waterValue + WATER_DECREMENT);
                stateTemp.itemsInfo.resources.fertilizer = Math.max(0, this.state.itemsInfo.resources.fertilizer - 1);
                /* Click detection (fertilizer)*/
                if (stateTemp.fieldInfo.grids[i].ferClickCount) {
                    stateTemp.fieldInfo.grids[i].ferClickCount++;
                } else {
                    stateTemp.fieldInfo.grids[i].ferClickCount = 1;
                }
            }
        }
        else if (stateTemp.currentTool === 2) { // WATER
            if (stateTemp.fieldInfo.grids[i].flower === "none") {
                window.alert("No flower here");
            } else if (stateTemp.itemsInfo.resources.water <= 0) {
                window.alert("Run out of water");
            } else { // use water
                stateTemp.fieldInfo.grids[i].waterValue = Math.min(100, stateTemp.fieldInfo.grids[i].waterValue + WATER_INCREMENT);
                stateTemp.itemsInfo.resources.water = Math.max(0, this.state.itemsInfo.resources.water - 1);
                /* Click detection (water)*/
                if (stateTemp.fieldInfo.grids[i].waterClickCount) {
                    stateTemp.fieldInfo.grids[i].waterClickCount++;
                } else {
                    stateTemp.fieldInfo.grids[i].waterClickCount = 1;
                }
            }
        }
        else if (stateTemp.currentTool === 3) {
            /* Click detection (sun)*/
            if (stateTemp.fieldInfo.sunClickCount) {
                stateTemp.fieldInfo.sunClickCount++;
            } else {
                stateTemp.fieldInfo.sunClickCount = 1;
            }

            for (let j=0; j<stateTemp.fieldInfo.size; j++) {
                if (stateTemp.fieldInfo.grids[j].flower === "none") continue;
                stateTemp.fieldInfo.grids[j].growthValue = Math.min(100, stateTemp.fieldInfo.grids[j].growthValue + SUN_INCREMENT);
                stateTemp.fieldInfo.grids[j].waterValue = Math.min(100, stateTemp.fieldInfo.grids[j].waterValue + SUN_WATER_INCREAMENT);
            }
        }

        /* Click detection*/
        if (stateTemp.fieldInfo.grids[i].clickCount && stateTemp.currentTool !== 0) {
            stateTemp.fieldInfo.grids[i].clickCount++;
        } else if (stateTemp.currentTool !== 0){
            stateTemp.fieldInfo.grids[i].clickCount = 1;
        }

        this.setState(stateTemp);
    }

    /* Operations on a single grid*/
    gridOptions(mode, gridIndex, stateTemp) {
        // do operations
        if (mode === 'remove') {
            const confirmation = window.confirm('Do you want to remove this?');
            if (confirmation) {
                stateTemp.fieldInfo.grids[gridIndex] = {
                    flower: 'none',
                    status: 'normal',
                    growthValue: 0,
                    waterValue: 0
                };
            }
        } else if (mode === 'plant') {
            this.plantDrawer.toggle(true);
        }

        // return the modified state
        return stateTemp;
    }

    plantFlower(flower) {
        const SPECIAL_RATE = 0.7
        const COMMON_FLOWERS = ['eustoma', 'tulip', 'rose'];
        const SPECIAL_FLOWERS = ['cow', 'dandelion', 'pumpkin'];

        let stateTemp = JSON.parse(JSON.stringify(this.state));
        let selectedGrid = stateTemp.fieldInfo.grids[this.state.selected];
        // Invalid target grid
        if (!selectedGrid || selectedGrid.flower !== 'none') {
            alert('You cannot plant here');
            return ;
        }
        // No enough seed
        if (stateTemp.itemsInfo.seeds[flower] <= 0) {
            alert('No ' + flower + ' seed');
            return ;
        }

        const confirmation = window.confirm('Are you sure you want to plant ' + flower + ' here?')
        if (confirmation) {

            stateTemp.itemsInfo.seeds[flower] = stateTemp.itemsInfo.seeds[flower] - 1;
            if (flower === "mystery") {
                const isSpecial = (Math.random() <= SPECIAL_RATE);
                let candidates = (isSpecial)?SPECIAL_FLOWERS:COMMON_FLOWERS;
                flower = candidates[Math.floor(Math.random() * candidates.length)];
            }

            selectedGrid = {
                flower: flower,
                status: 'normal',
                growthValue: 10,
                waterValue: 34
            };
            stateTemp.fieldInfo.grids[this.state.selected] = selectedGrid;
            this.setState(stateTemp);
            // confirmation and plant
            this.plantDrawer.toggle(false);
        }
    }
}
