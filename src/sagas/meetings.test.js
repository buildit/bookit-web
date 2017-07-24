import { call, put, select } from 'redux-saga/effects'
import { destroy } from 'redux-form'

import api from '../api'

import {
  meetingCreateSucceeded,
  meetingCreateFailed,
  closeMeetingDialog,
  meetingsFetchSucceeded,
  meetingsFetchFailed,
  meetingEditSucceeded,
} from '../actions'

import {
  fetchMeetings,
  createMeeting,
  editMeeting,
} from './meetings'

import { getUserToken } from '../selectors'

describe('Meetings Sagas', () => {
  const meeting = { room: 'Fuschia' }
  const room = 'bar'
  const token = '123456abcde'

  it('fetches meetings', () => {
    const meetings = [meeting]
    const generator = fetchMeetings()

    expect(generator.next().value).toEqual(select(getUserToken))
    expect(generator.next().value).toEqual(call(api.fetchMeetings, undefined, undefined, undefined))
    expect(generator.next(meetings).value)
      .toEqual(put(meetingsFetchSucceeded(meetings)))
    expect(generator.next().done).toBeTruthy()
  })
  it('errors properly when fetching meetings fails', () => {
    const err = new Error('what')
    const generator = fetchMeetings()

    generator.next()
    expect(generator.throw(err).value).toEqual(put(meetingsFetchFailed(err)))
    expect(generator.next().done).toBeTruthy()
  })

  it('creates meetings', () => {
    const action = { payload: { meeting, room } }
    const generator = createMeeting(action)

    expect(generator.next().value).toEqual(select(getUserToken))
    expect(generator.next().value).toEqual(call(api.createMeeting, undefined, meeting, room))
    expect(generator.next().value).toEqual(put(closeMeetingDialog()))
    expect(generator.next().value).toEqual(put(destroy('meeting-editor')))
    expect(generator.next().value).toEqual(put(meetingCreateSucceeded()))
    expect(generator.next().value).toEqual(call(fetchMeetings))
    expect(generator.next().done).toBeTruthy()
  })

  it('edits meetings', () => {
    const action = { payload: { meeting, room } }
    const generator = editMeeting(action)

    expect(generator.next().value).toEqual(select(getUserToken))
    expect(generator.next().value).toEqual(call(api.editMeeting, undefined, meeting, room))
    expect(generator.next().value).toEqual(put(closeMeetingDialog()))
    expect(generator.next().value).toEqual(put(destroy('meeting-editor')))
    expect(generator.next().value).toEqual(put(meetingEditSucceeded()))
    expect(generator.next().value).toEqual(call(fetchMeetings))
    expect(generator.next().done).toBeTruthy()
  })
  it('errors properly when creating a meeting fails', () => {
    const err = new Error({
      response: { body: { message: 'Foo' } },
    })
    const action = { payload: { meeting, room, token } }
    const generator = createMeeting(action)
    const correct = put(meetingCreateFailed(
      err.response && err.response.body && err.response.body.message
    ))

    generator.next()
    expect(generator.throw(err).value).toEqual(correct)
    expect(generator.next().done).toBeTruthy()
  })
})
