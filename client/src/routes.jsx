import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Cadastrar from './pages/CreateAccount';
import Main from './pages/Main';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/cadastrar" component={Cadastrar} />
      <Route exact path="/main" component={Main} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
