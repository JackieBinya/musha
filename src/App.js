import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { Error } from './pages/Error';
import { NavBar } from './components/NavBar';
import { AuthContext } from './context/auth-context';

export const App = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sign_in" component={SignIn} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
};
