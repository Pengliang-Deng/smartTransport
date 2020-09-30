import React, {Component, useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import backgroundImg from './imgs/quizBg.jpg';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom';
import Modal from '@material-ui/core/Modal';


const useStyle = makeStyles((theme) => ({
    paperCard: {
        // marginTop: 80,
        paddingTop: '10%',
        paddingBottom: '10%',
        paddingLeft: '6%',
        paddingRight: '6%',
        background: 'rgba(255, 255, 255, 0.86)',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        hyphens: 'auto',
        borderRadius: '8%',
    },
    bgImg: {
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat:'no-repeat',
        backgroundSize: 'cover',
        marginTop: 90,
        // backgroundColor: 'green',
  
    },
    container: {
        paddingTop: 80,
        paddingBottom: 80,
    },
    textCenter: {
        marginTop:40,
        marginBottom:30,
        textAlign:"center",
        // borderColor: 'black',
    },
    arrowButton: {
        marginRight: theme.spacing(2),
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: 0
    },
    correct: {
        color: 'green',
        marginTop:40,
        marginBottom:30,
        textAlign:"center",
        fontWeight:'bold',
    },
    modal: {
        paddingTop: '10%',
        paddingBottom: '10%',
        paddingLeft: '6%',
        paddingRight: '6%',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        // overflowWrap: 'break-word',
        // wordWrap: 'break-word',
        // hyphens: 'auto',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop:'50%',
    }
}))

export default function Quiz() {
    const classes = useStyle();

    const [question, setQuestion] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [correctness, setCorrectness] = useState(false);
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        const randomIndex = Math.floor(Math.random()*10);
        setQuestion(questionsArray[randomIndex])
    },[]);

    const checkAnswer = (event) => {
        console.log(event.target.innerText)
        const answerChosen = event.target.innerText[0].toLowerCase();
        setUserAnswer(answerChosen);
        if (answerChosen == question.answer) {
            console.log('true');
            setCorrectness(true);
            // Open modal
            setOpen(true);
            // To do something with user's info
            // Showing info that answer correctly and stop user from answering
        } else {
            setCorrectness(false);
            // Open modal
            setOpen(true);
            // To do something with user's info
            // Stop user from choosing other options 
            // Should return
        }
    }

    const handleClose = (event) => {
        setOpen(false);
        window.location = '/challenges';
    }

    const correctText = 'Your Answer is correct. 10 Points have been added.';
    const falseText = 'Sorry, your answer is not correct. Please try tomorrow.'

    return (
        <div>
            <AppBar>
                <Toolbar variant='dense'>
                    <IconButton edge="start" className={classes.arrowButton} color="inherit">
                        <Link className={classes.link} to='/challenges'>
                            <ArrowBack />
                        </Link>
                    </IconButton>
                    <Typography variant='h6' color='inherit'> Quiz</Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.bgImg} >
                <Container className={classes.container} maxWidth='xs'> 
                    <Paper className={classes.paperCard}>{question.question}</Paper>
                </Container>
            </div>
            <List component="nav">
                <ListItem onClick={checkAnswer} button>
                    <ListItemText className={`${(userAnswer == 'a' && correctness)? classes.correct : classes.textCenter}`} primary={`A. ${question.a}`} />
                </ListItem>
                <ListItem onClick={checkAnswer} button>
                    <ListItemText className={`${(userAnswer == 'b' && correctness)? classes.correct : classes.textCenter}`} primary={`B. ${question.b}`} />
                </ListItem>
                <ListItem onClick={checkAnswer} button>
                    <ListItemText className={`${(userAnswer == 'c' && correctness)? classes.correct : classes.textCenter}`} primary={`C. ${question.c}`} />
                </ListItem>
                <ListItem onClick={checkAnswer} button>
                    <ListItemText className={`${(userAnswer == 'd' && correctness)? classes.correct : classes.textCenter}`} primary={`D. ${question.d}`} />
                </ListItem>
            </List>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Paper className={classes.modal}>
                    {correctness? correctText : falseText}
                </Paper>
            </Modal>
        </div>
        
    )
}

const questionsArray = [
    {
        question: "Why should people be concerned about sustainable transportation?",
        a: "For the environment",
        b: "To promote energy independence and efficiency",
        c: "For human health reasons",
        d: "All of the above",
        answer: "d",
    },
    {
        question: "What is the primary greenhouse gas emitted by burning the fuels we most commonly use in our vehicles?",
        a: "Carbon monoxide",
        b: "Carbon dioxide",
        c: "Sulfur oxide",
        d: "Methane",
        answer: "b",
    },
    {
        question: " Which mode of transportation has the lowest environmental impact?",
        a: "A personal vehicle",
        b: "A city bus",
        c: "An airplane",
        d: "A bicycle",
        answer: "d",
    },
    {
        question: "What does CST stand for?",
        a: "Certification for Sustainable Transportation",
        b: "Center for Security and Transport",
        c: "Critical Standards for Transportation",
        d: "Cars, Ships, and Trains",
        answer: "a",
    },
    {
        question: "Aggressively speeding, accelerating, and braking can lower your fuel economy by:",
        a: "5% at highway speeds",
        b: "14% at highway speeds",
        c: "33% at highways speeds",
        d: "60% at highway speeds",
        answer: "c",
    },
    {
        question: "The average car will be at its advertised mileage per gallon at which speed? ",
        a: "40 mph",
        b: "55 mph",
        c: "60 mph",
        d: "65 mph",
        answer: "b",
    },
    {
        question: "Approximately how many pounds of carbon dioxide are produced burning a gallon of gasoline?",
        a: "3",
        b: "8",
        c: "20",
        d: "39",
        answer: "c",
    },
    {
        question: "Households that take public transportation and live with one fewer car can save more than ______ annually:",
        a: "$1500",
        b: "$3500",
        c: "$5800",
        d: "$9900",
        answer: "d",
    },
    {
        question: " Idling, or letting the engine run when parked or not in use, does which of the following:",
        a: "Increases consumption of fuel",
        b: "Causes vehicle wear and tear",
        c: "Emits toxic pollutants into the environment",
        d: "All of the above",
        answer: "d",
    },
    {
        question: "What is the best way to warm an engine before driving or cool down a vehicle’s cab in the summer?",
        a: "Drive the vehicle at a slow pace",
        b: "Turn the car on, while parked, with the AC on for a couple minutes",
        c: "Drive the vehicle at a fast pace",
        d: "Leave the car idling for awhile before driving",
        answer: "a",
    }
]