import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {red, green} from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

const theme = createMuiTheme({
    palette: {
        primary: red,
        secondary: green,
    },
    typography: {
        fontFamily: '"Press Start 2P"',
        fontSize: 10,
        color: '"white"'
    }
});

export default function PixelButton(props) {
    const classes = useStyles();

    return (
            <ThemeProvider theme={theme}>
                <Button variant="contained" className={classes.root} {...props}>
                </Button>
            </ThemeProvider>
    );
}
