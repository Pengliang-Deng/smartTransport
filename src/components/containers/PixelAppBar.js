/**
 * A customized AppBar in Pixel Art
 */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Outline from './outline.png';

const styles = {
    borderImageSource: 'url(' + Outline + ')',
    borderImageSlice: '15%',
    borderImageWidth: 7,
    borderImageOutset: 1,
    borderRadius: '11%',
    background: '#FFAB00',
}

export default function PixelAppBar(props) {
    return (
        <AppBar style={styles} className={props.className}>
            {props.children}
        </AppBar>
    )
}