import {
  MEETING_UPSERT_START,
  MEETING_UPSERT_FAILED,
  MEETING_UPSERT_SUCCEEDED,
} from '../actions/actionTypes'

import ajax from './ajax'

const initialState = false

describe('ajax reducer', () => {
  it('defaults to false when nothing gets sent in', () => {
    const newState = ajax()
    expect(newState).toBeFalsy()
  })

  it('returns the default state when something irrelevant is used', () => {
    const newState = ajax(initialState, { type: 'foo' })
    expect(newState).toBeFalsy()
  })

  it('sets true when starting a meeting creation', () => {
    const newState = ajax(initialState, { type: MEETING_UPSERT_START })
    expect(newState).toBeTruthy()
  })

  it('sets false when successfully creating a meeting', () => {
    const newState = ajax(initialState, { type: MEETING_UPSERT_SUCCEEDED })
    expect(newState).toBeFalsy()
  })

  it('sets false when not successfully creating a meeting', () => {
    const newState = ajax(initialState, { type: MEETING_UPSERT_FAILED })
    expect(newState).toBeFalsy()
  })
})
