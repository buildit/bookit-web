import moment from 'moment'
import getAvailableTimeSlot from './getAvailableTimeSlot'


describe('Time slot finder', () => {
  const start = moment('2017-01-01T08:00')
  const desiredDuration = moment.duration(1, 'hour')

  const minutes = (n = 0) => start.clone().add(n, 'minutes')

  const testCases = [
    {
      title: 'no meetings',
      meetings: [],
      slot: { start, end: minutes().add(desiredDuration) },
    },
    {
      title: 'another meeting in 25 minutes',
      meetings: [{ start: minutes(25), end: minutes(65) }],
      slot: { start, end: minutes(25) },
    },
    {
      title: 'one meeting in 25 minutes and another meeting in 20 minutes',
      meetings: [
        { start: minutes(20), end: minutes(25) },
        { start: minutes(25), end: minutes(65) },
      ],
      slot: { start, end: minutes(20) },
    },
    {
      title: 'another meeting ending 5 minutes after desired start time',
      meetings: [{ start: minutes(-10), end: minutes(5) }],
      slot: { start: minutes(5), end: minutes(60) },
    },
  ]

  testCases.forEach((testCase) => {
    it(testCase.title, () => {
      const timeSlot = getAvailableTimeSlot(start, testCase.meetings, desiredDuration)
      expect(timeSlot).toEqual(testCase.slot)
    })
  })
})
