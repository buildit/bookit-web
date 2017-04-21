import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import login from './login';
import app from './app';
import user from './user';

export default combineReducers({
  user,
  login,
  app,
  form,
});
