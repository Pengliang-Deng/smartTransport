import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import loadingImg from './animation_gif/loading.gif'

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
        top: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        background: '#8bc34a'
    },
    image: {
        width: '100%',
    },
    text: {
        fontFamily: "'VT323', monospace",
        color: 'white',
        fontSize: '3.5em',
        textAlign: 'center'
    },
    ani_set: {
        position: 'absolute',
        top: '20%',
        left: '15%',
        width: '70%',
    }
}));

/* loading animation of garden UI and store UI*/
export default function GardenLoading() {
    const classes = useStyles();
    const[count, setCount] = React.useState(0)

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCount((count + 1) % 4)
        }, 500);
        return () => clearInterval(timer);
    }, [count])
    return (
        <div className={classes.container}>
            <div className={classes.ani_set}>
                <img className={classes.image} src={loadingImg} alt="Loading-animation"/>
                <h3 className={classes.text}>{"Loading" + ".".repeat(count)}</h3>
            </div>
        </div>
    )
}