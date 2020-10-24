import React, { Component } from 'react';

import StoreBar from "./storeAppBar";
import StoreList from "./storeList";
import StoreBtmNav from "./StoreBtmNav";
import GardenLoading from "../loading";
import http from "../../../util/axios_packaged";

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

    render() {
        if (this.state.loaded === false) {
            return (<GardenLoading/>);
        }

        return(
            <div>
                <StoreBar title="Garden Shop" coins={this.state.itemsInfo.coins}/>
                <StoreList itemsInfo={this.state.itemsInfo} fieldSize={this.state.fieldInfo.size}
                           buySeed={(seed, price, available) => this.buySeed(seed, price, available)}
                           buyGrids={(price, available, quantity) => {this.buyGrids(price, available, quantity)}}
                           buyResource={(name, price, available, quantity, resource) => this.buyResource(name, price, available, quantity, resource)}
                />
                <StoreBtmNav currentList={this.state.currentList} changeList={(i) => this.changeList(i)}/>
            </div>
        );
    }

    changeList(index) {
        this.setState({currentList: index});
    }

    buySeed(seed, price, available) {
        if (! available) {alert("This seed is not for sale!"); return ;}
        let itemsInfo = this.state.itemsInfo;
        if (itemsInfo.coins < price) {alert("Not enough Coins"); return ;}

        if (window.confirm("Spend " + price + " coins for a " + seed + " seed?")) {
            itemsInfo.coins -= price;
            itemsInfo.seeds[seed] = itemsInfo.seeds[seed]? itemsInfo.seeds[seed]+1: 1;
        }
        this.setState({itemsInfo: itemsInfo});
        this.postData(this.state);
    }

    buyResource(name, price, available, quantity, resource) {
        if (! available) {alert("This resource is not available now!"); return ;}
        let itemsInfo = this.state.itemsInfo;
        if (itemsInfo.coins < price) {alert("Not enough Coins"); return ;}
        if (window.confirm("Spend " + price + " coins for a " + name + " ?")) {
            itemsInfo.coins -= price;
            itemsInfo.resources[resource] = itemsInfo.resources[resource]? itemsInfo.resources[resource] + quantity: quantity;
        }
        this.setState({itemsInfo: itemsInfo});
        this.postData(this.state);
    }

    buyGrids(price, available, quantity) {
        if (! available) {alert("It is not available now!"); return ;}
        let itemsInfo = this.state.itemsInfo;
        let fieldInfo = this.state.fieldInfo;
        if (itemsInfo.coins < price) {alert("Not enough Coins"); return ;}
        if (window.confirm("Spend " + price + " coins for " + quantity + " grids?")) {
            itemsInfo.coins -= price;
            fieldInfo.size += quantity;
        }
        this.setState({itemsInfo: itemsInfo, fieldInfo: fieldInfo});
        this.postData(this.state);
    }

    postData(data) {
        http.post('/gameData/save', data).then(response => {console.log(response);})
            .catch(res => {
                if (res.response.status === 422) {window.location = '/'; alert("user not found")}
                if (res.response.status === 500) {window.location = '/garden'; alert(res.response.data)}
                console.log(res);
            })
    }

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