import React, { useContext } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Properties } from './pages/Properties';
import { SignUp } from './pages/SignUp';
import { Error } from './pages/Error';
import { NavBar } from './components/NavBar';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthContext } from './context/auth-context';
import { PasswordReset } from './pages/PasswordReset';

export const App = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/password-reset" component={PasswordReset} />
        <PrivateRoute exact path="/my-properties" component={Properties} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
};
