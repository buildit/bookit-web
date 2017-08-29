import { validate } from './validate'
import moment from 'moment'

describe('Meeting form validator', () => {
  const expectedTitleErrorMessage = 'Event Name is required'
  const expectedTimeErrorMessage = 'Start date must be before end date'

  it('Should return the proper error if there is no title', () => {
    const formValues = {
      title: undefined,
      start: moment(),
      end: moment().add(1, 'hour'),
    }
    expect(validate(formValues)).toMatchObject({ title: expectedTitleErrorMessage })
  })

  it('Should return the proper error if the start time is after the end time', () => {
    const formValues = {
      title: 'lol not undefined',
      start: moment().add(1, 'hour'),
      end: moment(),
    }
    expect(validate(formValues)).toMatchObject({ time: expectedTimeErrorMessage })
  })

  it('Should return the proper error if the start time is the same as the end time', () => {
    const now = moment()
    const formValues = {
      title: 'Pink Easter Egg',
      start: now,
      end: now,
    }
    expect(validate(formValues)).toMatchObject({ time: expectedTimeErrorMessage })
  })

  it('Should return multiple errors if necessary', () => {
    const formValues = {
      title: undefined,
      start: moment().add(1, 'hour'),
      end: moment(),
    }
    expect(validate(formValues)).toMatchObject({
      title: expectedTitleErrorMessage,
      time: expectedTimeErrorMessage,
    })
  })

  it('Should return no errors if the meeting is properly formed', () => {
    const formValues = {
      room: 'room@room.com',
      title: 'Presentation about firing joe',
      start: moment().add(1, 'hour'),
      end: moment().add(3, 'hours'),
    }
    expect(validate(formValues)).toEqual({})
  })
})
