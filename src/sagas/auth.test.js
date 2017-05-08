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

jest.mock('react-router');

describe('Auth Saga', () => {
  const email = 'foo@bar.com';
  const password = 'xyzzy';
  const action = { email, password };
  const user = {
    email: 'test@test.com',
    name: 'Testy McTesterson',
    id: 12345,
    token: 'test12345test',
  };

  it('yields the proper sequence for logins', () => {
    const generator = login(action);

    expect(generator.next().value).toEqual(call(api.login, email, password));
    expect(generator.next(user).value).toEqual(put(setClient(user)));
    expect(generator.next().value).toEqual(put(resetMeetings()));
    expect(generator.next().value).toEqual(put(loginSuccess()));

    expect(generator.next().done).toBeTruthy();

    expect(localStorage.getItem('user')).toEqual(JSON.stringify(user));
    expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
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

    // Set up for test
    localStorage.setItem('user', 'some arbitrary user data');
    expect(localStorage.getItem('user')).toEqual('some arbitrary user data');

    // Test the saga itself
    expect(generator.next().value).toEqual(put(resetUser()));
    expect(generator.next().done).toBeTruthy();

    // Test that localStorage is empty after logging out
    expect(localStorage.getItem('user')).toBeUndefined();
    expect(browserHistory.push).toHaveBeenCalledWith('/login');
  });
});
