import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Launch from './components/Launch';
import HomePage from './components/HomePage';
import Game from './Game'


function App() {
  return (
    
      <Router>
        <div className="App">
        <Route path="/" exact component={Launch} />
        <Route path="/homepage" component={HomePage} />
        </div>
        <Route path="/garden" component={Game} />
      </Router>
    
  )
}

export default App;
