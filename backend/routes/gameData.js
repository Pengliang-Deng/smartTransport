const initGameData = require('./game_utils/initGameData');

const router = require('express').Router();
let gameData = require('../models/gameData.model')
let User = require('../models/user.model')


router.route('/get').get(async(req, res) => {
    const user = await User.findOne({
        _id: req.user._id
    })
    if(!user) {
        return res.status(422).json("User Not Found");
    }

    const data = await gameData.findOne({
        uid: req.user._id
    })
    if (data) {
        return res.json(data);
    }
    else {
        const newGameData = initGameData(user.username, user._id);
        newGameData.save();
        return res.json(newGameData);
    }
});


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


module.exports = router;