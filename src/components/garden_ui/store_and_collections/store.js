import React, { Component } from 'react';

import StoreBar from "./storeAppBar";
import StoreBtmNav from "./StoreBtmNav";
import GardenLoading from "../loading";
import http from "../../../util/axios_packaged";
import PlantingItemList from "./plantingList";
import DecorationItemList from "./decorationList";

/**
 * the main UI of garden Store
 */
export default class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            currentList: 0,
        }
    }

    componentDidMount() {
        this.pullData();
    }

    /* switchable lists*/
    itemList() {
        if (this.state.currentList === 0) {
            return (
                <PlantingItemList itemsInfo={this.state.itemsInfo} fieldSize={this.state.fieldInfo.size}
                                  buySeed={(seed, price, available) => this.buySeed(seed, price, available)}
                                  buyGrids={(price, available, quantity) => {this.buyGrids(price, available, quantity)}}
                                  buyResource={(name, price, available, quantity, resource) => this.buyResource(name, price, available, quantity, resource)}
                />
            );
        } else if (this.state.currentList === 1){
            return (
                <DecorationItemList fieldInfo={this.state.fieldInfo} styles={this.state.itemsInfo.styles}
                                    switchStyle={(styleType, key) => this.switchStyle(styleType, key)}
                                    unlockStyle={(styleType, key, name, available, price) => this.unlockStyle(styleType, key, name, available, price)}
                />
            );
        }
    }

    render() {
        if (this.state.loaded === false) {
            return (<GardenLoading/>);
        }

        return(
            <div>
                <StoreBar title="Garden Shop" coins={this.state.itemsInfo.coins}/>
                {this.itemList()}
                <StoreBtmNav currentList={this.state.currentList} changeList={(i) => this.changeList(i)}/>
            </div>
        );
    }

    /**
     * switch displayed list
     * @param index of the target list
     */
    changeList(index) {
        this.setState({currentList: index});
    }

    /**
     * buy a certain seed
     * @param seed the key of the seed
     * @param price of the seed
     * @param available the seed is for sale or not
     */
    buySeed(seed, price, available) {
        if (! available) {alert("This seed is not for sale!"); return ;}
        let itemsInfo = this.state.itemsInfo;
        if (itemsInfo.coins < price) {alert("Not enough Coins"); return ;}

        if (window.confirm("Spend " + price + " coins for a " + seed + " seed?")) {
            itemsInfo.coins -= price;
            itemsInfo.seeds[seed] = itemsInfo.seeds[seed]? itemsInfo.seeds[seed]+1: 1;
            this.setState({itemsInfo: itemsInfo});
            this.postData(this.state, () => alert("Purchase completed!"));
        }
    }

    /**
     * buy certain resource
     * @param name of the resource
     * @param price of the resource
     * @param available for sale or not
     * @param quantity of purchase
     * @param resource key of the resource
     */
    buyResource(name, price, available, quantity, resource) {
        if (! available) {alert("This resource is not available now!"); return ;}
        let itemsInfo = this.state.itemsInfo;
        if (itemsInfo.coins < price) {alert("Not enough Coins"); return ;}
        if (window.confirm("Spend " + price + " coins for a " + name + "?")) {
            itemsInfo.coins -= price;
            itemsInfo.resources[resource] = itemsInfo.resources[resource]? itemsInfo.resources[resource] + quantity: quantity;
            this.setState({itemsInfo: itemsInfo});
            this.postData(this.state, () => alert("Purchase completed!"));
        }
    }

    /**
     * expand the garden field
     * @param price of grids
     * @param available for sale or not
     * @param quantity number of grids
     */
    buyGrids(price, available, quantity) {
        if (! available) {alert("It is not available now!"); return ;}
        let itemsInfo = this.state.itemsInfo;
        let fieldInfo = this.state.fieldInfo;
        if (itemsInfo.coins < price) {alert("Not enough Coins"); return ;}
        if (window.confirm("Spend " + price + " coins for " + quantity + " grids?")) {
            itemsInfo.coins -= price;
            fieldInfo.size += quantity;
            this.setState({itemsInfo: itemsInfo, fieldInfo: fieldInfo});
            this.postData(this.state, () => alert("Purchase completed!"));
        }
    }

    /**
     * switch a style of a certain thing
     * @param styleType the type of style (fence, tile...)
     * @param key of the style switch to
     */
    switchStyle(styleType, key) {
        let fieldInfo = this.state.fieldInfo;
        if (styleType === "Fence") {
            fieldInfo.fenceImage = key;
            this.setState({fieldInfo: fieldInfo});
            this.postData(this.state,() => alert("Set successfully!"));
        }
        if (styleType === "Tile") {
            fieldInfo.tileBackground = key;
            this.setState({fieldInfo: fieldInfo});
            this.postData(this.state,() => alert("Set successfully!"));
        }
        if (styleType === "Scene") {
            fieldInfo.sceneBackground = key;
            this.setState({fieldInfo: fieldInfo});
            this.postData(this.state,() => alert("Set successfully!"));
        }
    }

    /**
     * buy a decoration
     * @param styleType the type of style (fence, tile...)
     * @param key key of the style(decoration) to buy
     * @param name of the style(decoration) to buy
     * @param available for sale or not
     * @param price the price of the decoration
     */
    unlockStyle(styleType, key, name, available, price) {
        if (! available) {alert("It is not available now!"); return ;}
        let itemsInfo = this.state.itemsInfo;
        let fieldInfo = this.state.fieldInfo;
        if (itemsInfo.coins < price) {alert("Not enough Coins"); return ;}
        if (window.confirm("Spend " + price + " coins to unlock " + styleType + " - " + name + "?")) {
            itemsInfo.coins -= price;
            if (styleType === "Fence") {
                itemsInfo.styles.fence = itemsInfo.styles.fence.concat([key]);
            }
            else if (styleType === "Tile") {
                itemsInfo.styles.tileBackground = itemsInfo.styles.tileBackground.concat([key]);
            }
            else if (styleType === "Scene") {
                itemsInfo.styles.sceneBackground = itemsInfo.styles.sceneBackground.concat([key]);
            }
            else {
                alert("Invalid purchase!")
                return ; // break purchase
            }

            this.setState({itemsInfo: itemsInfo, fieldInfo: fieldInfo});
            this.postData(this.state, () => alert("Purchase completed!"));
        }
    }

    /**
     * post game data to the server
     * @param data game state
     * @param callback if post succeeded
     */
    postData(data, callback) {
        http.post('/gameData/save', data).then(response => {
            callback();
        })
            .catch(res => {
                if (!res.response) {console.log(res); return ;}
                if (res.response.status === 422) {window.location = '/'; alert("user not found")}
                if (res.response.status === 500) {window.location = '/garden'; alert(res.response.data)}
                console.log(res);
            })
    }

    /**
     * pull game data from the server
     * @returns {Promise<void>}
     */
    async pullData() {
        /**
         * @type {{
         *  selected: number,
         *  fieldInfo: {size:number, tileBackground: string, fenceImage: string,
         *       gridBackground: string, gridOutline: string, grids: [], },
         *  playerInfo: {playerName: string},
         *  itemsInfo: {coins: number, resources: {water:number, fertilizer: number, sunny: number},seeds: {}}
         * }}
         */
        let gameInfo;
        await http.get('/gameData/get')
            .then((res) => {
                gameInfo = res.data;
            })
            .catch((reason) => {
                window.location = '/';
            })

        const state = {
            loaded: true, // game data loaded
            fieldInfo: {
                // number of grids in the field
                size: gameInfo.fieldInfo.size,
                // styles of the garden
                tileBackground: gameInfo.fieldInfo.tileBackground,
                fenceImage: gameInfo.fieldInfo.fenceImage,
                gridBackground: gameInfo.fieldInfo.gridBackground,
                gridOutline: gameInfo.fieldInfo.gridOutline,
                sceneBackground: gameInfo.fieldInfo.sceneBackground,

                // information of all grids
                grids: gameInfo.fieldInfo.grids,

            },
            playerInfo: gameInfo.playerInfo,
            itemsInfo: {
                coins: gameInfo.itemsInfo.coins,
                resources: {
                    /* number of resources */
                    water: gameInfo.itemsInfo.resources.water,
                    fertilizer: gameInfo.itemsInfo.resources.fertilizer,
                    sunny: gameInfo.itemsInfo.resources.sunny,
                },
                seeds: gameInfo.itemsInfo.seeds,
                styles: gameInfo.itemsInfo.styles,
            },
        }

        this.setState(state);
    }

}