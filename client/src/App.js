import './App.css';
import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './home/Home';



function App() {

  return(
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/signup">
            <Home />
          </Route>
          <Route path="/">
            <Home />
            {/* <Test /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
