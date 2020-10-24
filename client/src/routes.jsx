import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppLayout from './style/AppLayout';
import Main from './pages/Main';
import Community from './pages/Community';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <AppLayout>
        <Route exact path="/" component={Main} />
        <Route exact path="/communities/:id" component={Community} />
      </AppLayout>
    </Switch>
  </BrowserRouter>
);

export default Routes;
