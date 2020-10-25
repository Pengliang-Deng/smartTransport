let GameData = require('../../models/gameData.model')

/**
 * initialize game data for a new player
 * @param uname user name
 * @param uid uid in mongoDB
 * @returns {*} initialized game data
 */
const initFunctions = function (uname, uid) {
    initialGameInfo.playerInfo.playerName = uname;
    initialGameInfo.uid = uid;
    return new GameData(initialGameInfo);
};

module.exports = initFunctions;

/**
 * initial game data for a new player
 * @type {{uid: null, playerInfo: {playerName: string}, itemsInfo: {coins: number, seeds: {eustoma: number, rose: number, tulip: number}, resources: {sunny: number, water: number, fertilizer: number}, styles: {sceneBackground: [string], fence: [string], tileBackground: [string]}}, fieldInfo: {size: number, fenceImage: string, gridBackground: string, gridOutline: string, sceneBackground: string, grids: [], tileBackground: string}}}
 */
const initialGameInfo = {
    uid: null ,
    fieldInfo: {
        // number of grids
        size: 9,
        // field styles
        tileBackground: 'grass',
        fenceImage: 'normal',
        gridBackground: 'normal',
        gridOutline: 'normal',
        sceneBackground: 'normal',

        // the information of every grid
        grids: [

        ]
    },
    playerInfo: {
        playerName: 'new Player',
        /* TODO */
    },
    itemsInfo: {
        coins: 500,
        resources: {
            water: 10,
            fertilizer: 10,
            sunny: 10,
        },
        seeds: {
            "eustoma": 2,
            "tulip": 2,
            "rose": 2,
        },
        styles: {
            tileBackground: [
                'grass',
            ],
            fence: [
                'normal',
            ],
            sceneBackground: [
                'normal',
            ]
        }
    }
}

