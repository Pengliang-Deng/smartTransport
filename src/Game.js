import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Garden from './gardenUI';
import {gameInfo1} from './testData';

export default class Game extends Component {
    render() {
        return (
            <Box className="garden-app" >
                <Garden gameInfo={gameInfo1}/>
            </Box>
        )
    }
}