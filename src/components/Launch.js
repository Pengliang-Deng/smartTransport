import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// import { Link } from 'react-router-dom';
import { Link as MuiLink } from '@material-ui/core'
import http from '../util/axios_packaged'

import PixelTypography from './PixelTypography'

// const backEndURL = 'http://192.168.3.4:5000/';

const styles = {
    container: {
        marginTop: 20,
        paddingLeft: 25,
        paddingRight: 25,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '50%',
        maxHeight: '40%',
        marginTop: 30,
        marginBottom: 20,
        borderRadius:"6%",
    },
    link: {
        marginTop: 23,
        textDecoration: 'none'
        
    },
    pixelText: {
        fontFamily: '"Press Start 2P"',
        marginTop: 23
    },
}

export default class Launch extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.toggleHasAccount = this.toggleHasAccount.bind(this);

        this.state = {
            username: '',
            password: '',
            hasAccount: true,
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
        // console.log(`${e.target.value}`)
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    login() {
        const userInfo = {
            username: this.state.username,
            password: this.state.password
        }

        http.post('/', userInfo)
        .then((res) => {
            const user = res.data
            if (user) {
                localStorage.setItem('jwt-token', user.data.token); // store token
                window.location = '/homepage'
            }
        })
    }


    register() {
        const userInfo = {
            username: this.state.username,
            password: this.state.password
        }

        http.post('/add', userInfo)
        .then((res) => {console.log(res.data)})

    }

    // toggle interface
    toggleHasAccount() {
        this.setState({
            hasAccount: !this.state.hasAccount
        })
    }

    render() {
        return (
            <Container maxWidth='xs' style={styles.container}>
                <Grid container direction="column" justify="center">
                    <Grid item>
                        <img style={styles.img} alt="pixel_car" src="car500.png" />
                        <PixelTypography fontStyle='textS1' text="Smart Transport" variant="h4" />
                        <br />
                        <PixelTypography fontStyle='textS1' variant='h6' text={this.state.hasAccount? "Sign In" : "Sign Up"} />
                    </Grid>

                    <TextField 
                        id="username"
                        variant="outlined"
                        margin="normal"
                        // size="small"
                        autoFocus={true} 
                        label="User Name"
                        defaultValue=''
                        required
                        fullWidth
                        onChange={this.onChangeUsername}
                    />
                    <TextField 
                        id="password"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        label="Password"
                        defaultValue=''
                        required
                        fullWidth
                        onChange={this.onChangePassword}
                    />

                <Button onClick={this.state.hasAccount? this.login: this.register} style={styles.pixelText} variant="contained" color="primary" fullWidth> 
                    {this.state.hasAccount? "Sign In" : "Register"}
                </Button>

                <MuiLink style={{marginTop: 23}} component='button' onClick={this.toggleHasAccount}> 
                    {this.state.hasAccount? "Don't have an account? Sign up here!" : "Back to Sign In"}
                </MuiLink>

            </Grid>
            </Container>
           
        )
    }
}

