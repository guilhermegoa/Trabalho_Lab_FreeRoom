import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducers from './ducks/index';

const middlewares = [applyMiddleware(thunk)];

const store = createStore(rootReducers, composeWithDevTools(...middlewares));

export default store;
