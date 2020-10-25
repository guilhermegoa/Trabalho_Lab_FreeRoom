import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppLayout from './style/AppLayout';
import Main from './pages/Main';
import Community from './pages/Community';
import Post from './pages/Post';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <AppLayout>
        <Route exact path="/" component={Main} />
        <Route exact path="/communities/:id" component={Community} />
        <Route exact path="/communities/:id/post/:id" component={Post} />
      </AppLayout>
    </Switch>
  </BrowserRouter>
);

export default Routes;
