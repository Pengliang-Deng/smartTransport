const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;


const gameDataSchema = new mongoose.Schema({
    fieldInfo: {
        size: {
            type: Number,
            required: true
        },
        tileBackground: String,
        fenceImage: String,
        gridBackground: String,
        gridOutline: String,

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