import { CLIENT_SET, CLIENT_UNSET, LOGIN_REQUESTING } from './actionTypes';

export const startMeetingsRequest = () => ({ type: 'START_MEETINGS_REQUEST' }); // eslint-disable-line import/prefer-default-export

export function setClient(user) {
  return {
    type: CLIENT_SET,
    ...user,
  };
}

export function unsetClient() {
  return {
    type: CLIENT_UNSET,
  };
}

export function loginRequest({ email, password }) {
  return {
    type: LOGIN_REQUESTING,
    email,
    password,
  };
}

