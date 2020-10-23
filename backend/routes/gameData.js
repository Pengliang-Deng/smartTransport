const initGameData = require('./game_utils/initGameData');

const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken') // jwt
let gameData = require('../models/gameData.model')
let User = require('../models/user.model')


router.route('/get').post(async(req, res) => {
    const user = await User.findOne({
        _id: req.user._id
    })

    if(!user) {
        return res.status(422).json("User Not Found")
    }

    const data = await gameData.findOne({
        uid: req.user._id
    })
    if (data) {
        return res.json(data)
    }
    else {
        const newGameData = initGameData(user.username, user._id);
        newGameData.save();
        return res.json(newGameData);
    }

});


module.exports = router;