import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import appReducer from './app';

export default combineReducers({
  app: appReducer,
  form: formReducer,
});
