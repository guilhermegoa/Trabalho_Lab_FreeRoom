import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppLayout from './style/AppLayout';
import PrivateRoute from './components/PrivateRoutes/index';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastrar from './pages/CreateAccount';
import Main from './pages/Main';
import Community from './pages/Community';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/cadastrar" component={Cadastrar} />
      <Route exact path="/communities/:id" component={Community} />
      <AppLayout>
        <PrivateRoute exact path="/main" component={Main} />
      </AppLayout>
    </Switch>
  </BrowserRouter>
);

export default Routes;
