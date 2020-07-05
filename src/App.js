import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Properties } from './pages/Properties';
import { Error } from './pages/Error';
import { NavBar } from './components/NavBar';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthContext } from './context/auth-context';

export const App = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/my-properties" component={Properties} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
};
