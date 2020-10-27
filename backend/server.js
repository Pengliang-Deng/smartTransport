const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const expressJwt = require('express-jwt');

// NO IDEAS WHY THIS
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully.")
})

// middleware
app.use(cors());
// enable json format 
app.use(express.json());

// Json web token
app.use(expressJwt({
    algorithms: ['HS256'],
    secret: 'SmartTransport123'  // signed secret key
}).unless({
    path: ['/api/', '/api/add']  // path accessed without token
}))

const userRouter = require('./routes/users');

app.use('/api/', userRouter);
// app.use('/register', userRouter);

const gameDataRouter = require('./routes/gameData')
app.use('/api/gameData/', gameDataRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})