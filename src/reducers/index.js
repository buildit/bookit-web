const initialState = {
  message: 'Nothing',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_MESSAGE': {
      return { message: 'That was some Redux!' };
    }
    case 'USER_FETCH_REQUESTED': {
      return { message: 'Sending request...' };
    }
    case 'USER_FETCH_SUCCEEDED': {
      return { message: 'Got user info' };
    }
    case 'USER_FETCH_FAILED': {
      return { message: 'The request has failed.' };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
