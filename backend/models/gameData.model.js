const mongoose = require('mongoose');

const gameDataSchema = new mongoose.Schema({
    fieldInfo: {
        size: {
            type: Number,
            required: true
        },

        /* style settings of the garden */
        tileBackground: String,
        fenceImage: String,
        gridBackground: String,
        gridOutline: String,

        // information of all the grids
        grids: [
            {
                flower: String,
                status: String,
                growthValue: Number,
                waterValue: Number,
            }
        ],
    },
    playerInfo: {
        playerName: String,
        /* TODO */
    },
    itemsInfo: {
        coins: Number,
        resources: {
            water: Number,
            fertilizer: Number,
            sunny: Number,
        },
        seeds: [
            {
                name: String,
                amount: Number,
            }
        ]
    }

})

const GameData = mongoose.model('GameData', gameDataSchema);

module.exports = GameData;