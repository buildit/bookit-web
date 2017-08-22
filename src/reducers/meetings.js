import { fromJS } from 'immutable'

import moment from 'moment'

import { SELECT_DATE, RECEIVE_MEETINGS } from '../actions'

// import normalizeData from '../schema'

const initialSelectedDateState = moment().format('YYYY-MM-DD')

// const meetingResponseFixture = JSON.parse('[{"room":{"id":"1749e834-2765-41a5-88a9-4baa49c6c99e","name":"Black","mail":"black-room@builditcontoso.onmicrosoft.com","email":"black-room@builditcontoso.onmicrosoft.com","domain":"builditcontoso.onmicrosoft.com"},"meetings":[{"id":"obscured03447673-1e0f-41fa-9c0e-70a6f25c9edd","perspective":0,"title":"Bruce Springsteen ","owner":{"id":"10520","mail":"bruce@builditcontoso.onmicrosoft.com","email":"bruce@builditcontoso.onmicrosoft.com","name":"Bruce Springsteen","domain":"builditcontoso.onmicrosoft.com"},"location":{"displayName":"Black"},"participants":[{"id":"10518","mail":"bruce@builditcontoso.onmicrosoft.com","email":"bruce@builditcontoso.onmicrosoft.com","name":"Bruce Springsteen","domain":"builditcontoso.onmicrosoft.com"},{"id":"10519","mail":"black-room@builditcontoso.onmicrosoft.com","email":"black-room@builditcontoso.onmicrosoft.com","name":"Black","domain":"builditcontoso.onmicrosoft.com"}],"start":"2017-08-18T15:30:00.000Z","end":"2017-08-18T17:30:00.000Z"},{"id":"obscureda3836c5c-09f5-4ef6-bb1f-0ed97dddf5b2","perspective":0,"title":"Bruce Springsteen ","owner":{"id":"10523","mail":"bruce@builditcontoso.onmicrosoft.com","email":"bruce@builditcontoso.onmicrosoft.com","name":"Bruce Springsteen","domain":"builditcontoso.onmicrosoft.com"},"location":{"displayName":"Black"},"participants":[{"id":"10521","mail":"bruce@builditcontoso.onmicrosoft.com","email":"bruce@builditcontoso.onmicrosoft.com","name":"Bruce Springsteen","domain":"builditcontoso.onmicrosoft.com"},{"id":"10522","mail":"black-room@builditcontoso.onmicrosoft.com","email":"black-room@builditcontoso.onmicrosoft.com","name":"Black","domain":"builditcontoso.onmicrosoft.com"}],"start":"2017-08-18T19:00:07.317Z","end":"2017-08-18T20:00:07.317Z"}]},{"room":{"id":"096a04c8-1e02-4fbe-8a4f-ce1ef8a91e97","name":"Blue","mail":"blue-room@builditcontoso.onmicrosoft.com","email":"blue-room@builditcontoso.onmicrosoft.com","domain":"builditcontoso.onmicrosoft.com"},"meetings":[{"id":"obscured4d5b6567-3aa6-4ed3-9707-0167d506c1b6","perspective":0,"title":"Bruce Springsteen ","owner":{"id":"10496","mail":"bruce@builditcontoso.onmicrosoft.com","email":"bruce@builditcontoso.onmicrosoft.com","name":"Bruce Springsteen","domain":"builditcontoso.onmicrosoft.com"},"location":{"displayName":"Blue"},"participants":[{"id":"10494","mail":"bruce@builditcontoso.onmicrosoft.com","email":"bruce@builditcontoso.onmicrosoft.com","name":"Bruce Springsteen","domain":"builditcontoso.onmicrosoft.com"},{"id":"10495","mail":"blue-room@builditcontoso.onmicrosoft.com","email":"blue-room@builditcontoso.onmicrosoft.com","name":"Blue","domain":"builditcontoso.onmicrosoft.com"}],"start":"2017-08-18T17:00:26.341Z","end":"2017-08-18T18:00:26.341Z"}]},{"room":{"id":"81f00a04-c940-47ec-94cd-40d76fa737ea","name":"Red","mail":"red-room@builditcontoso.onmicrosoft.com","email":"red-room@builditcontoso.onmicrosoft.com","domain":"builditcontoso.onmicrosoft.com"},"meetings":[]},{"room":{"id":"94a2c14d-b2a4-482c-9cdc-914ea22dc8a9","name":"White","mail":"white-room@builditcontoso.onmicrosoft.com","email":"white-room@builditcontoso.onmicrosoft.com","domain":"builditcontoso.onmicrosoft.com"},"meetings":[]},{"room":{"id":"067a35f5-f5e1-4646-b961-b906e6168c80","name":"Green","mail":"green-room@builditcontoso.onmicrosoft.com","email":"green-room@builditcontoso.onmicrosoft.com","domain":"builditcontoso.onmicrosoft.com"},"meetings":[]}]')

// const data = normalizeData(meetingResponseFixture).entities


// const initialEntityState = fromJS(data)
const initialEntityState = fromJS({
  entities: {
    meetings: {},
    rooms: {},
    participants: {},
  },
  meetingIds: [],
  roomIds: [],
})

const selectedDate = (state = initialSelectedDateState, action) => {
  switch(action.type) {
  case SELECT_DATE:
    return action.date
  default:
    return state
  }
}

const data = (state = initialEntityState, action) => {
  switch(action.type) {
  case RECEIVE_MEETINGS:
    console.log(action)
    return state.mergeDeep(action.data)
  }
  return state
}

// const meetings = (state = {
//   isFetching: false,
//   didInvalidate: false,
//   items: [],
// }, action) => {
//   switch(action.type) {
//   case INVALIDATE_DATE:
//     return {
//       ...state,
//       didInvalidate: true,
//     }
//   case REQUEST_MEETINGS:
//     return {
//       ...state,
//       isFetching: true,
//       didInvalidate: false,
//     }
//   case RECEIVE_MEETINGS:
//     return {
//       ...state,
//       isFetching: false,
//       didInvalidate: false,
//       items: action.meetings,
//     }
//   default:
//     return state
//   }
// }

// const meetingsByDate = (state = {}, action) => {
//   switch(action.type) {
//   case INVALIDATE_DATE:
//   case RECEIVE_MEETINGS:
//   case REQUEST_MEETINGS:
//     return {
//       ...state,
//       [action.date]: meetings(state[action.date], action),
//     }
//   default:
//     return state
//   }
// }

export default {
  data,
  selectedDate,
}
