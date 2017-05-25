import 'jsdom-global/register';
import 'regenerator-runtime/runtime';

import { call, put } from 'redux-saga/effects';
import { destroy } from 'redux-form';

import api from '../api';

import {
  meetingCreateSucceeded,
  meetingCreateFailed,
  closeMeetingDialog,
  meetingsFetchSucceeded,
  meetingsFetchFailed,
} from '../actions';

import {
  fetchMeetings,
  createMeeting,
} from './meetings';

describe('Meetings Sagas', () => {
  const meeting = 'foo';
  const room = 'bar';
  const token = '123456abcde';
  const action = { payload: { meeting, room, token } };

  it('fetches meetings', () => {
    const meetings = [meeting];
    const generator = fetchMeetings();

    expect(generator.next().value).toEqual(call(api.fetchMeetings, undefined, undefined));
    expect(generator.next(meetings).value)
      .toEqual(put(meetingsFetchSucceeded(meetings)));
    expect(generator.next().done).toBeTruthy();
  });
  it('errors properly when fetching meetings fails', () => {
    const err = new Error('what');
    const generator = fetchMeetings();

    generator.next();
    expect(generator.throw(err).value).toEqual(put(meetingsFetchFailed(err)));
    expect(generator.next().done).toBeTruthy();
  });

  it('creates meetings', () => {
    const generator = createMeeting(action);

    expect(generator.next().value).toEqual(call(api.createMeeting, meeting, room, token));
    expect(generator.next().value).toEqual(put(closeMeetingDialog()));
    expect(generator.next().value).toEqual(put(destroy('meeting-editor')));
    expect(generator.next().value).toEqual(put(meetingCreateSucceeded()));
    expect(generator.next().value).toEqual(call(fetchMeetings));
    expect(generator.next().done).toBeTruthy();
  });
  it('errors properly when creating a meeting fails', () => {
    const err = new Error({
      response: { body: { message: 'Foo' } },
    });
    const generator = createMeeting(action);
    const correct = put(meetingCreateFailed(
      err.response && err.response.body && err.response.body.message
    ));

    generator.next();
    expect(generator.throw(err).value).toEqual(correct);
    expect(generator.next().done).toBeTruthy();
  });
});
