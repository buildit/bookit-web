import { createSelector } from 'reselect'

import Moment from 'moment'

export const getSelectedDate = state => state.selectedDate

export const getSelectedDateMoment = createSelector(
  [ getSelectedDate ],
  selectedDate => Moment(selectedDate)
)
