import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { CLIENT_SET, CLIENT_UNSET, MEETINGS_RECEIVED } from '../actions/actionTypes';
import login from './login';

const initialState = {
  meetings: [],
  user: {
    email: 'bruce@myews.onmicrosoft.com',
    name: 'Bruce',
    id: null,
    token: null,
  },
};

const client = (state = initialState, action) => {
  switch (action.type) {
    case MEETINGS_RECEIVED: {
      return { ...state, meetings: action.meetings };
    }
    case CLIENT_SET: {
      return { ...state, user: { id: action.token.userId, token: action.token } };
    }
    case CLIENT_UNSET: {
      return { ...state, user: { id: null, token: null } };
    }
    default: {
      return state;
    }
  }
};

const Reducer = combineReducers({ login, client, form });

export default Reducer;
