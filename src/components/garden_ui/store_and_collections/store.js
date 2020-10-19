import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default class Store extends Component {
    constructor(props) {
        super(props);
        let itemsInfo = props.gameInfo.itemsInfo;

        this.state = {
            ownedItems: {
                coins: itemsInfo.coins,
                resources: {
                    water: itemsInfo.resources.water,
                    fertilizer: itemsInfo.resources.fertilizer,
                    sunny: itemsInfo.resources.sunny,
                },
                seeds: itemsInfo.resources.seeds,
                styles: {
                    tileBackground: itemsInfo.styles.tileBackground,
                    fence: itemsInfo.styles.fence,
                }
            }
        }
    }

    render() {
        return(
            this.topbar()
        );
    }

    topbar() {
        const useStyles = makeStyles((theme) => ({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
        }));
        const classes = useStyles();

        return(
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Garden Store
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}