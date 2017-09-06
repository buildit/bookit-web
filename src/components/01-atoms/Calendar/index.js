import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { getSelectedDate } from '../../../selectors'

import momentPropTypes from 'react-moment-proptypes'
import Week from './Week'
import DateDisplay from './DateDisplay'
import DayNames from './DayNames'
import calendar from '../../../utils/calendar'
import { selectDate } from '../../../actions'
import { calendar as config } from './config'

const style = {
  minWidth: `${config.minWidth}px`,
}

const forwardDate = selectedDate => selectedDate.clone().add(1, 'month').startOf('month')
const backDate = selectedDate => selectedDate.clone().subtract(1, 'month').startOf('month')

export const Calendar = ({ selectedDate, handleForwardClick, handleBackClick }) => (
  <div
    style={style}
  >
    <DateDisplay
      date={selectedDate}
      handleForwardClick={handleForwardClick}
      handleBackClick={handleBackClick}
    />
    <DayNames />
    {calendar(selectedDate)
        .map((week, index) => <Week key={index} week={week} />)}
  </div>
)

Calendar.propTypes = {
  selectedDate: momentPropTypes.momentObj,
  handleBackClick: PropTypes.func.isRequired,
  handleForwardClick: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  selectedDate: getSelectedDate(state),
})

const mapDispatchToProps = dispatch => ({
  handleForwardClick: date => () => dispatch(selectDate(forwardDate(date))),
  handleBackClick: date => () => dispatch(selectDate(backDate(date))),
})

const connected = connect(mapStateToProps, mapDispatchToProps)(Calendar)

export default connected
