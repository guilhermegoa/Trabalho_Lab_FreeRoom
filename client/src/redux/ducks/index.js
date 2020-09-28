import { combineReducers } from 'redux';

import user from './user';
import community from './community';
import post from './post';

const rootReducers = combineReducers({ user, community, post });

export default rootReducers;
