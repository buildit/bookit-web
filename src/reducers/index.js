import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { CLIENT_SET, CLIENT_UNSET, MEETINGS_RECEIVED, LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/actionTypes';

const initialState = {
  requestingLogin: false,
  successfulLogin: false,
  errors: [],
  meetings: [],
  user: {
    email: 'bruce@myews.onmicrosoft.com',
    name: 'Bruce',
    id: null,
    token: null,
  },
};

const reducer = (state = initialState, action) => {
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
    case LOGIN_REQUESTING: {
      return { ...state, requestingLogin: true, successfulLogin: false, errors: [] };
    }
    case LOGIN_SUCCESS: {
      return { ...state, requestingLogin: false, successfulLogin: true, errors: [] };
    }
    case LOGIN_ERROR: {
      return { ...state, requestingLogin: false, successfulLogin: false, errors: state.errors.concat([{ body: action.error.toString() }]) };
    }
    default: {
      return state;
    }
  }
};

const Reducer = combineReducers({ reducer, form });

export default Reducer;
