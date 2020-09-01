import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Launch from './components/Launch';
import HomePage from './components/HomePage'


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Launch} />
        <Route path="/homepage" component={HomePage} />

      </Router>
    </div>
  )
}

export default App;
