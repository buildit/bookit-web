const initialState = {
  message: 'Nothing',
  meetings: [],
  rooms: [],
  user: {
    email: 'bruce@myews.onmicrosoft.com',
    name: 'Bruce',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_MESSAGE': {
      return { ...state, message: 'That was some Redux!' };
    }
    case 'USER_FETCH_REQUESTED': {
      return { ...state, message: 'Sending request...' };
    }
    case 'USER_FETCH_SUCCEEDED': {
      return { ...state, message: 'Got user info' };
    }
    case 'USER_FETCH_FAILED': {
      return { ...state, message: 'The request has failed.' };
    }
    case 'ROOMS_REQUESTED': {
      console.log('REQUESTED ROOMS');
      return { ...state, message: 'Getting rooms...' };
    }
    case 'ROOMS_RECEIVED': {
      console.log('RECEIVED ROOMS');
      return { ...state, rooms: action.rooms };
    }
    case 'MEETINGS_RECEIVED': {
      console.log('RECEIVED MEETINGS');
      return { ...state, meetings: action.meetings };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
