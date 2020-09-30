import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoutes/index';
import FreeRoute from './components/FreeRoute/index';

import AppLayout from './style/AppLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastrar from './pages/CreateAccount';
import Main from './pages/Main';
import Community from './pages/Community';

const Routes = () => (
  <BrowserRouter>
    <Switch>
        <FreeRoute exact path="/" component={Home} />
        <FreeRoute exact path="/login" component={Login} />
        <FreeRoute exact path="/cadastrar" component={Cadastrar} />
        
        <AppLayout>
          <PrivateRoute exact path="/main" component={Main} />
          <PrivateRoute exact path="/communities/:id" component={Community} />
        </AppLayout>
    </Switch>
  </BrowserRouter>
);

export default Routes;
