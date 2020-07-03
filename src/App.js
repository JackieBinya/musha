import React, { useEffect, useState } from 'react';
import './App.css';
import { firebase } from './firebase';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { Error } from './pages/Error';
import { NavBar } from './components/NavBar';

export const App = () => {
  const [isAuthenticated, setAuthentication] = useState(false)
  return(
    <Router>
    <NavBar/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/sign_in">
            <SignIn />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
    </Router>
    )}