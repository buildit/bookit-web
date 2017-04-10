import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { CLIENT_SET, CLIENT_UNSET, MEETINGS_RECEIVED } from '../actions/actionTypes';
import login from './login';

const initialState = {
  meetings: [],
  user: {
    email: null,
    name: null,
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
      return {
        meetings: [],
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
        meetings: [],
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

const Reducer = combineReducers({ login, client, form });

export default Reducer;
