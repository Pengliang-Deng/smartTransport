import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Garden from './gardenUI';
import Store from './components/garden_ui/store_and_collections/store'
import {gameInfo1} from './testData';

export default class Game extends Component {

    /* for testing purpose only*/
    constructor() {
        super();
        this.state = {
            gameInfo: gameInfo1,
            currentRoute: 'garden',
        }
    }
    /* for testing purpose only*/
    router(route, gameInfo) {
        this.setState({gameInfo: gameInfo, currentRoute: route});
    }

    render() {
        return (
            <Box style={{width: '100vw'}} className="garden-app" >
                <Garden gameInfo={this.state.gameInfo}/>
                {/*<Store gameInfo={this.state.gameInfo}/>*/}
            </Box>
        )
    }
}