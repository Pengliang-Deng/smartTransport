/**
 * A customized Box in Pixel Art
 */
import React from 'react';
import Box from '@material-ui/core/Box';
import Outline from './outline.png';

export default function PixelBox(props) {
    const styles = {
        borderImageSource: 'url(' + Outline + ')',
        borderImageSlice: '15%',
        borderImageWidth: 7,
        borderImageOutset: 1,
        borderRadius: '11%',
        background: '#FFAB00',
    }

    return (
        <Box style={styles} xs={props.xs}>
            {props.children}
        </Box>
    )
}