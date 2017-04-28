import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  requesting: false,
  successful: false,
  message: '',
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, requesting: true, successful: false };
    }
    case LOGIN_SUCCESS: {
      return { ...state, requesting: false, successful: true };
    }
    case LOGIN_FAILURE: {
      const message = action.payload.message;

      return {
        ...state,
        requesting: false,
        successful: false,
        message,
      };
    }
    default: {
      return state;
    }
  }
};

export default login;
