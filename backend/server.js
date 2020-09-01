const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

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

const userRouter = require('./routes/users');

app.use('/', userRouter);
// app.use('/register', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})