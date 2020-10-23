let GameData = require('../../models/gameData.model')

const initFunctions = function (uname, uid) {
    initialGameInfo.playerInfo.playerName = uname;
    initialGameInfo.uid = uid
    return new GameData(initialGameInfo);
};

module.exports = initFunctions;

const initialGameInfo = {
    uid: null ,
    fieldInfo: {
        // number of grids
        size: 9,
        // field styles
        tileBackground: 'stone-brick',
        fenceImage: 'normal',
        gridBackground: 'normal',
        gridOutline: 'normal',

        // the information of every grid
        grids: [

        ]
    },
    playerInfo: {
        playerName: 'new Player',
        /* TODO */
    },
    itemsInfo: {
        coins: 10,
        resources: {
            water: 3,
            fertilizer: 3,
            sunny: 1,
        },
        seeds: {
            "eustoma": 2,
            "tulip": 2,
            "rose": 2,
        },
        styles: {
            tileBackground: [
                'stone-brick',
            ],
            fence: [
                'normal',
            ],
            sceneBackground: [
                {type: String}
            ]
        }
    }
}

