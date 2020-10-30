const changeGameDataFuncs = require('./game_utils/changeGameData')

const initGameData = require('./game_utils/initGameData');

const router = require('express').Router();
let gameData = require('../models/gameData.model');
let User = require('../models/user.model');
const { increaseCoin, changeTransitCounts, changeWalkCounts, changeBicycleCounts, updateIsTracking, updateStartPoint, updateEndPoint, updateMode, updateHasConfirmed } = require('./game_utils/changeGameData');

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

/**
 * calculate the coins rewarded when users complete one track according to lat and lng
 */
router.route('/calculate').get(async(req, res) => {
    const user = await User.findOne({
        _id: req.user._id
    })
    if(!user) {
        return res.status(422).json("User Not Found");
    }

    let data = await gameData.findOne({
        uid:req.user._id
    })

    console.log("data: " + data)
    let trackingStatus = {
        isTracking: data.trackingStatus.isTracking,
        hasConfirmed: data.hasConfirmed,
        startPoint: {
            lat: data.trackingStatus.startPoint.lat,
            lng: data.trackingStatus.startPoint.lng
        },
        endPoint: {
            lat: data.trackingStatus.endPoint.lat,
            lng: data.trackingStatus.endPoint.lng
        },
        mode: data.trackingStatus.mode
    }

    const deg2rad = (deg) => {
        return deg * (Math.PI/180)
    }

    // using the Haversine formula to calculate the distance.
    let R = 6371;
    let dLat = deg2rad(trackingStatus.startPoint.lat - trackingStatus.endPoint.lat);
    let dLng = deg2rad(trackingStatus.startPoint.lng - trackingStatus.endPoint.lng);

    let a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) + 
        Math.cos(deg2rad(trackingStatus.startPoint.lat) * Math.cos(deg2rad(trackingStatus.endPoint.lat))) *
        Math.sin(dLng/2) * Math.sin(dLng/2);
    
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let distance = R * c; // distance in km

    let coins = 0;
    console.log("T mode: " + trackingStatus.mode);
    console.log("Distance: " + distance);

    
    switch(trackingStatus.mode) {
        case 'walking':
            coins = distance * 2 * 50;
            break;
        case 'bicycling':
            coins = distance * 1.5 * 50;
            break;
        case 'driving':
            coins = distance * 0.3 * 50;
            break;
        case 'transit':
            coins = distance * 0.7 * 50;
            break;
    }
    coins = Math.floor(coins);

    await increaseCoin(user._id, coins);
    
    return res.json(coins)
})

/**
 * save tracking status
 */
router.route('/save/trackStatus').post(async(req, res) => {
    const attribute = req.body.attribute; //attribute to be updated
    const value = req.body.value; // new value

    switch(attribute) {
        case 'isTracking':
            updateIsTracking(req.user._id, value);
            break;
        case 'startPoint':
            updateStartPoint(req.user._id, value);
            break;
        case 'endPoint':
            updateEndPoint(req.user._id, value);
            break;
        case 'mode':
            console.log(value)
            updateMode(req.user._id, value);
            break;
        case 'hasConfirmed':
            updateHasConfirmed(req.user._id, value);
            break;
    }

})

 /**
  * get current tracking status
  */
router.route('/get/trackStatus').get(async(req, res) => {
    const user = await User.findOne({
        _id: req.user._id
    })
    if(!user) {
        return res.status(422).json("User Not Found");
    }

    let data = await gameData.findOne({
        uid:req.user._id
    })

    let trackingStatus = {
        isTracking: data.trackingStatus.isTracking,
        hasConfirmed: data.hasConfirmed,
        startPoint: {
            lat: data.trackingStatus.startPoint.lat,
            lng: data.trackingStatus.startPoint.lng
        },
        endPoint: {
            lat: data.trackingStatus.endPoint.lat,
            lng: data.trackingStatus.endPoint.lng
        },
        mode: data.trackingStatus.mode
    }

    return res.json(trackingStatus)
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