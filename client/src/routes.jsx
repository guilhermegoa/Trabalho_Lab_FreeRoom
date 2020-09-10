import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/home';
import Paginateste from './pages/pagintest';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/paginatest" component={Paginateste} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
