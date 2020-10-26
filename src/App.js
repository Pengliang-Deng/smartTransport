import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Launch from './components/Launch';
import HomePage from './components/HomePage';
import Garden from './components/gardenUI';
import Store from './components/garden_ui/store_and_collections/store'
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
        <Route path="/garden" component={Garden} />
        <Route path="/store" component={Store} />
      </Router>
    
  )
}

export default App;
