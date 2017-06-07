import { call, put } from 'redux-saga/effects'
import moment from 'moment'

import {
  selectDateSucceeded,
} from '../actions'

import { fetchMeetings } from './meetings'
import selectDate from './selectDate'

describe('Select Date Sagas', () => {
  it('fetches meetings', () => {
    const dateString = '2017-05-25'
    const date = moment(dateString).startOf('day')
    const generator = selectDate({ payload: { date } })

    expect(generator.next().value).toEqual(call(fetchMeetings, { start: dateString }))
    expect(generator.next().value).toEqual(put(selectDateSucceeded(date)))

    expect(generator.next().done).toBeTruthy()
  })
})
