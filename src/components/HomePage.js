import { Directions } from '@material-ui/icons';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Divider } from '@material-ui/core';
import Tracker from './Tracker'
//import Direction from './Direction'
export default class HomePage extends Component {
    render() {
        return (
            <Tracker />
            //<Directions/>
        )
    }
}