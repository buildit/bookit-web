import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from '../actions/actionTypes';

const initialState = {
  requesting: false,
  successful: false,
  errors: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTING: {
      return { requesting: true, successful: false, errors: [] };
    }
    case LOGIN_SUCCESS: {
      return { requesting: false, successful: true, errors: [] };
    }
    case LOGIN_ERROR: {
      return {
        requesting: false,
        successful: false,
        errors: state.errors.concat([{
          body: action.error.toString(),
        }]),
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
