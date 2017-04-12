import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import {
  CLIENT_SET,
  CLIENT_UNSET,
} from '../actions/actionTypes';

import login from './login';
import app from './app';

const initialState = {
  user: {
    email: null,
    name: null,
    id: null,
    token: null,
  },
};

const client = (state = initialState, action) => {
  switch (action.type) {
    case CLIENT_SET: {
      return {
        user: {
          email: action.email,
          name: action.name,
          id: action.id,
          token: action.token,
        },
      };
    }
    case CLIENT_UNSET: {
      return {
        user: {
          email: null,
          name: null,
          id: null,
          token: null,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  client,
  login,
  app,
  form,
});
