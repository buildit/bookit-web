const initialState = {
  meetings: [],
  user: {
    email: 'bruce@myews.onmicrosoft.com',
    name: 'Bruce',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MEETINGS_RECEIVED': {
      return { ...state, meetings: action.meetings };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
