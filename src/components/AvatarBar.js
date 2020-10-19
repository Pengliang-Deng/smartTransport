import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PixelTypography from './PixelTypography';
import PixelAppBar from './containers/PixelAppBar';
import People from '@material-ui/icons/People'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100vw',
        minHeight:'3vh',
        boxShadow:'none',
        backgroundColor: '#FFAB00',
        borderRadius:'0',
    },
    avatar: {
        backgroundColor: '#FCFAF2',
        color: 'black',
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginLeft: '5vw',
        boxShadow:'3px 4px #FBE251'
    },
    textBox: {
        // border: '1px solid black',
        background: '#FCFAF2',
        borderRadius: '10px',
        color: 'black',
        boxShadow:'3px 4px #FBE251',
        
    },
    title: {
        marginTop: 0
    },
    people: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        color: 'grey'
    }
}));


export default function AvatarBar(props) {
    const classes = useStyles();
    const [accountInfo, setState] = useState({
        username: "Dumpling",
        coins: 100
    })

    // loading user info from database

    const { username, coins } = accountInfo;

    return (
        <PixelAppBar>
        <Card className={classes.root} >
            <CardHeader
                avatar={
                    <Avatar variant='rounded' className={classes.avatar}>
                        <People className={classes.people} />
                    </Avatar>
                }
                title={
                    <PixelTypography className={classes.title} fontStyle='textS2' variant='h5' text={username} />
                }
                
                subheader={<div className={classes.textBox}>
                    <PixelTypography fontStyle='textS2' variant='h5' text={`Coins: ${coins}`} />
                </div>}
            > 
        
            </CardHeader>
        </Card>
        </PixelAppBar>
    )
}