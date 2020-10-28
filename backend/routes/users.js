
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken') // jwt
let User = require('../models/user.model');



router.route('/').post(async(req, res) => {
    const user = await User.findOne({
        username: req.body.username,
    })
    
    if(!user) {
        return res.status(422).json("User Not Found")
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
        return res.status(422).json("Wrong Password")
    }

    // generate token
    const token = 'Bearer ' + jwt.sign(
        {
            _id: user._id,
        },
        'SmartTransport123',
        {
            expiresIn: 3600 * 24 * 3,
        }
    )


    return res.json({
        status: 'ok',
        data: { token: token }
    })
});


router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({username, password});

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error:' + err));

    // initialise game data for a new user
    // const user = User.findOne({
    //     username: username,
    // })

    // const newGameData = initGameData(user.username, user._id);
    // newGameData.save();

})

module.exports = router;