import { call, put, select } from 'redux-saga/effects'
import { destroy } from 'redux-form'
import moment from 'moment'

import api from '../api'

import {
  abortUiAction,
  meetingUpsertSucceeded,
  meetingUpsertFailed,
  meetingsFetchSucceeded,
  meetingsFetchFailed,
} from '../actions'

import {
  fetchMeetings,
  upsertMeeting,
} from './meetings'

import { getUserToken } from '../selectors'

describe('Meetings Sagas', () => {

  it('fetches meetings', () => {
    const meeting = { room: 'Fuschia' }
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
    /**** Set up the mock Redux action ****/
    const start = moment()
    const end = moment().add(1, 'hour')
    const action = {
      type: 'MEETING_UPSERT_START',
      payload: {
        // Notice the lack of meeting id!
        title: 'Walk the chinchilla',
        start,
        end,
        room: 'bleep@bloop.com',
      },
    }


    /**** Definitions of arguments we expect to see in api call  ****/
    const token = undefined // Why is token undefined?
    const expectedMeetingArg = {
      id: undefined,
      title: 'Walk the chinchilla',
      start,
      end,
    }
    const expectedRoomArg = 'bleep@bloop.com'


    /**** Declare the expectations ****/
    const generator = upsertMeeting(action)
    expect(generator.next().value).toEqual(select(getUserToken))
    expect(generator.next().value).toEqual(
      call(api.createMeeting, token, expectedMeetingArg, expectedRoomArg))
    expect(generator.next().value).toEqual(put(abortUiAction()))
    expect(generator.next().value).toEqual(put(destroy('meeting-editor')))
    expect(generator.next().value).toEqual(put(meetingUpsertSucceeded()))
    expect(generator.next().value).toEqual(call(fetchMeetings))
    expect(generator.next().done).toBeTruthy()
  })

  it('edits meetings', () => {
    /**** Set up the mock Redux action ****/
    const start = moment()
    const end = moment().add(1, 'hour')
    const action = {
      type: 'MEETING_UPSERT_START',
      payload: {
        id: 'meeting-007',
        title: 'Simmer down',
        start,
        end,
        room: 'bleep@bloop.com',
      },
    }


    /**** Definitions of arguments we expect to see in api call  ****/
    const token = undefined // Why is token undefined?
    const expectedMeetingArg = {
      id: 'meeting-007',
      title: 'Simmer down',
      start,
      end,
    }
    const expectedRoomArg = 'bleep@bloop.com'


    /**** Declare the expectations ****/
    const generator = upsertMeeting(action)
    expect(generator.next().value).toEqual(select(getUserToken))
    expect(generator.next().value).toEqual(
      call(api.editMeeting, token, expectedMeetingArg, expectedRoomArg))
    expect(generator.next().value).toEqual(put(abortUiAction()))
    expect(generator.next().value).toEqual(put(destroy('meeting-editor')))
    expect(generator.next().value).toEqual(put(meetingUpsertSucceeded()))
    expect(generator.next().value).toEqual(call(fetchMeetings))
    expect(generator.next().done).toBeTruthy()
  })

  it('errors properly when creating a meeting fails', () => {
    const err = new Error({
      response: { body: { message: 'Foo' } },
    })

    /**** Set up the mock Redux action ****/
    const start = moment()
    const end = moment().add(1, 'hour')
    const action = {
      type: 'MEETING_UPSERT_START',
      payload: {
        id: undefined,
        title: 'Sleep on, sleepy',
        start,
        end,
        room: 'bleep@bloop.com',
      },
    }
    const generator = upsertMeeting(action)
    const correct = put(meetingUpsertFailed(
      err.toString()
    ))

    generator.next()
    expect(generator.throw(err).value).toEqual(correct)
    expect(generator.next().done).toBeTruthy()
  })
})
