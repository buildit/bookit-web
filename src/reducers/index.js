const initialState = {
  message: 'Nothing',
  meetings: [],
  rooms: [],
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
    case 'ROOMS_REQUESTED': {
      console.log('REQUESTED ROOMS');
      return { message: 'Getting rooms...' };
    }
    case 'ROOMS_RECEIVED': {
      console.log('RECEIVED ROOMS');
      return { rooms: action.rooms };
    }
    case 'MEETINGS_RECEIVED': {
      console.log('RECEIVED MEETINGS');
      return { meetings: action.meetings };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
