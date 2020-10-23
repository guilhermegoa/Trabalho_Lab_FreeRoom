import { combineReducers } from 'redux';

import user from './user';
import community from './community';
import post from './post';
import communities from './communities';

const rootReducers = combineReducers({
  user, community, post, communities,
});

export default rootReducers;
