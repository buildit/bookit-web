import moment from 'moment'

import { isQuickBooking } from '../../selectors'

export const mapInitialValues = (state) => {
  if (isQuickBooking(state)) {
    return {
      start: moment(),
      end: moment().add(1, 'hour'),
    }
  }

  const values = { ...state.app.requestedMeeting }

  return {
    id: values.id,
    title: values.title,
    start: values.start,
    end: values.end,
    room: values.room.email,
  }
}
