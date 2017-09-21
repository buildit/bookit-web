import { call, put, select, take } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'

import * as constants from '../constants'
import * as actions from '../actionCreators'
import * as selectors from '../selectors'

import { normalizeRooms, normalizeMeetings } from '../schema'

import { getAuthorizationToken } from './authSaga'

import Api from '../api'

import {
  getRooms,
  getRoomsIfNeeded,
  getMeetings,
  awaitFetchMeetings,
} from './fetchSaga'

import * as jwtMock from '../../__mocks__/jwtMock'

describe('fetchSaga', () => {

  describe('#getRooms()', () => {
    it('calls `Api.fetchRooms` and dispatches the resulting JSON to the redux store', () => {
      const json = { room: { name: 'roomy', email: 'roomy@rooms.com' } }
      const normalized = { room: { name: 'normal', email: 'normal-room@normalrooms.com' } }

      const generator = getRooms()

      expect(generator.next().value).toEqual(call(Api.fetchRooms))
      expect(generator.next(json).value).toEqual(call(normalizeRooms, json))
      expect(generator.next(normalized).value).toEqual(put(actions.receiveRooms(normalized)))
      expect(generator.next().done).toBeTruthy()
    })

    it('logs an error if the call to `Api.fetchRooms` throws an error', () => {
      const error = {}

      const generator = getRooms()

      generator.next()

      expect(generator.throw(error).value).toEqual(call(console.log, 'GETROOMS ERROR', error))
      expect(generator.next().done).toBeTruthy()
    })
  })

  describe('#getRoomsIfNeeded()', () => {
    it('calls `fetchRooms` only if the redux store does not already have them', () => {
      const roomIds = [ 1, 2, 3, 4 ]

      const generator = cloneableGenerator(getRoomsIfNeeded)()

      expect(generator.next().value).toEqual(select(selectors.getRoomIds))

      const generatorNoRoomIds = generator.clone()

      expect(generator.next(roomIds).done).toBeTruthy()

      expect(generatorNoRoomIds.next([]).value).toEqual(call(getRooms))
      expect(generatorNoRoomIds.next().done).toBeTruthy()
    })
  })

  describe('#getMeetings(date)', () => {
    const date = '2017-09-14'
    const token = jwtMock.makeValidToken()
    const json = [{
      id: '12345',
      title: 'a meeting',
      start: Date.now(),
      end: Date.now() + 60,
      owner: 'owner@owner.com',
      room: 'puce-room@rooms.com',
      participants: [ 'puce-room@rooms.com', 'someguy@someguy.com' ],
    }]
    const normalized = [{ ...json, id: 12345, title: 'a normal meeting' }]

    it('does a thing', () => {
      const generator = getMeetings(date)

      expect(generator.next().value).toEqual(call(getRoomsIfNeeded))
      expect(generator.next().value).toEqual(call(getAuthorizationToken))
      expect(generator.next(token).value).toEqual(call(Api.fetchMeetings, token, date))
      expect(generator.next(json).value).toEqual(call(normalizeMeetings, json))
      expect(generator.next(normalized).value).toEqual(put(actions.receiveMeetings(normalized)))
    })

    it('logs an error if the call to `Api.fetchMeetings` throws an error', () => {
      const error = {}

      const generator = getMeetings(date)

      generator.next()
      generator.next()
      generator.next()

      expect(generator.throw(error).value).toEqual(call(console.log, 'GETMEETINGS ERROR', error))
      expect(generator.next().done).toBeTruthy()
    })
  })

  describe('#awaitFetchMeetings()', () => {
    it('does a thing', () => {
      const payload = '2017-09-14'

      const generator = awaitFetchMeetings()

      expect(generator.next().value).toEqual(take(constants.FETCH_MEETINGS))
      expect(generator.next({ payload }).value).toEqual(call(getMeetings, payload))
    })
  })

})
