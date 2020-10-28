const changeGameDataFuncs = require('./game_utils/changeGameData')

const initGameData = require('./game_utils/initGameData');

const router = require('express').Router();
let gameData = require('../models/gameData.model');
let User = require('../models/user.model');
const { increaseCoin, changeTransitCounts, changeWalkCounts, changeBicycleCounts } = require('./game_utils/changeGameData');

/**
 * get game data
 */
router.route('/get').get(async(req, res) => {
    const user = await User.findOne({
        _id: req.user._id
    })
    if(!user) {
        return res.status(422).json("User Not Found");
    }

    let data = await gameData.findOne({
        uid: req.user._id
    });
    if (!data) {
        const newGameData = initGameData(user.username, user._id);
        newGameData.save();
        data = newGameData;
    }

    dailySunnyWater(data, user);

    return res.json(data);
});

/**
 * get an object with user name and coin amount
 */
router.route('/get/coins').get(async(req, res) => {
    const user = await User.findOne({
        _id: req.user._id
    })
    if(!user) {
        return res.status(422).json("User Not Found");
    }

    let data = await gameData.findOne({
        uid:req.user._id
    })

    let coins = {username:data.playerInfo.playerName, coins: data.itemsInfo.coins}

    return res.json(coins)
})

/**
 * get the counts of weekly challenges
 */
router.route('/get/taskStatus').get(async(req, res) => {
    const user = await User.findOne({
        _id: req.user._id
    })
    if(!user) {
        return res.status(422).json("User Not Found");
    }

    let data = await gameData.findOne({
        uid:req.user._id
    })

    let taskStatus = {
        transit: data.weeklyTasks.transit, 
        walk: data.weeklyTasks.walk,
        bicycle: data.weeklyTasks.bicycle
    }

    return res.json(taskStatus)
})

/**
 * add certain amount of coins
 */
router.route('/add/coins').post(async(req, res) => {
    const increment = req.body.increment;
    console.log(req.body)
    console.log(req);
    increaseCoin(req.user._id, increment)
})

/**
 * change counts of a travel mode
 */
router.route('/change').post(async(req, res) => {
    const increment = req.body.increment;
    const mode = req.body.mode;
        
    switch(mode) {
        case 'transit':
            changeTransitCounts(req.user._id, increment);
            break;
        case 'walk':
            changeWalkCounts(req.user._id, increment);
            break;
        case 'bicycle':
            changeBicycleCounts(req.user._id, increment);
            break;
    }
}) 

/* just for testing purpose */
// router.route('/test').get(async(req, res) => {
//     const user = await User.findOne({
//         _id: req.user._id
//     })
//     if(!user) {
//         return res.status(422).json("User Not Found");
//     }
//
//     changeGameDataFuncs.increaseRareSeed(user._id, 5);
//     return res
// })

/**
 * post game data and save
 */
router.route('/save').post(async(req, res) => {
    const newData = req.body;
    console.log(req.body)
    if (!newData.fieldInfo || !newData.playerInfo || !newData.itemsInfo) {
        return res.status(500).json("Invalid Data");
    }

    const user = await User.findOne({
        _id: req.user._id
    })
    if(!user) {
        return res.status(422).json("User Not Found");
    }

    const currentData = await gameData.findOne({
        uid: user._id
    })
    if(!currentData) {
        return res.status(500).json("data lost");
    }

    const updates = {
        fieldInfo: newData.fieldInfo ? newData.fieldInfo: currentData.fieldInfo,
        playerInfo: newData.playerInfo ? newData.playerInfo: currentData.playerInfo,
        itemsInfo: newData.itemsInfo ? newData.itemsInfo: currentData.itemsInfo,
    }

    gameData.findOneAndUpdate({uid: user._id}, {$set: updates})
        .catch(error => {return res.status(500).json(error)});
    return res.json("game data updated");
});

async function dailySunnyWater(data, user) {
    if (!data.lastLoginDate || data.lastLoginDate !== new Date().getUTCDate().toString()) {
        gameData.findOneAndUpdate({uid: user._id},
            {$set: {lastLoginDate: new Date().getUTCDate()}})
            .catch(error => {console.error(error)});
        changeGameDataFuncs.increaseWater(user._id, 5);
        changeGameDataFuncs.increaseSun(user._id, 5);
    }
}

module.exports = router;