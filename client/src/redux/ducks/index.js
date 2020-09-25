import { combineReducers } from 'redux';

import user from './user';
import community from './community';

const rootReducers = combineReducers({ user, community });

export default rootReducers;
