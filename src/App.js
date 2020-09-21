import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Launch from './Components/Launch';
import HomePage from './Components/HomePage';
import Game from './Game';
import Challenges from './Challenges';
import Quiz from './Quiz';


function App() {
  return (
    
      <Router>
        <div className="App">
        <Route path="/" exact component={Launch} />
        <Route path="/homepage" component={HomePage} />
        <Route path="/challenges" component={Challenges} />
        <Route path="/quiz" component={Quiz} />
        </div>
        <Route path="/garden" component={Game} />
        
      </Router>
    
  )
}

export default App;
