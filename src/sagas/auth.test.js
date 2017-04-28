import 'jsdom-global/register';
import { call, put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import api from '../api';
import {
  loginSuccess,
  loginFailure,
  setClient,
  resetMeetings,
  resetUser,
} from '../actions';

import {
  login,
  logout,
} from './auth';

// const localStorage = {
//   setItem: jest.fn(),
//   removeItem: jest.fn(),
// };
// global.localStorage = localStorage;

describe('Auth Saga', () => {
  const email = 'foo@bar.com';
  const password = 'xyzzy';
  const action = { email, password };

  it('yields the proper sequence for logins', () => {
    const user = { data: 'a user object should be here' };
    const generator = login(action);

    expect(generator.next().value).toEqual(call(api.login, email, password));
    expect(generator.next(user).value).toEqual(put(setClient(user)));
    expect(generator.next().value).toEqual(put(resetMeetings()));
    expect(generator.next().value).toEqual(put(loginSuccess()));
    // expect(generator.next().value).toEqual(call(localStorage.setItem, 'user', JSON.stringify(user)));
    // expect(generator.next().value).toEqual(call(browserHistory.push, '/dashboard'));
    expect(generator.next().done).toBeTruthy();
  });

  it('errors properly for logins', () => {
    const err = new Error('what');
    const generator = login(action);

    generator.next();
    expect(generator.throw(err).value).toEqual(put(loginFailure(err)));
    expect(generator.next().done).toBeTruthy();
  });

  it('yields the proper sequence for logout', () => {
    const generator = logout();

    expect(generator.next().value).toEqual(put(resetUser()));
    // expect(generator.next().value).toEqual(call(localStorage.removeItem, 'user'));
    // expect(generator.next().value).toEqual(call(browserHistory.push, '/login'));
    expect(generator.next().done).toBeTruthy();
  });
});
