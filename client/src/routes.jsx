import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import PrivateRoute from './components/Routes/PrivateRoutes';
import PublicRoute from './components/Routes/PublicRoute';

import AppLayout from './style/AppLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastrar from './pages/CreateAccount';
import Main from './pages/Main';
import Community from './pages/Community';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute exact path="/" component={Home} />
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/cadastrar" component={Cadastrar} />

      <AppLayout>
        <PrivateRoute exact path="/main" component={Main} />
        <PrivateRoute exact path="/communities/:id" component={Community} />
      </AppLayout>
    </Switch>
  </BrowserRouter>
);

export default Routes;
