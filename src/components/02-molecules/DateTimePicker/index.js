import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'
import Kronos from 'react-kronos'
import moment from 'moment'

const DateTimePicker = ({ name, meeting }) => {
  const dateStyle = {
    width: '245px',
    border: 'none',
    backgroundColor: '#141516',
    borderBottom: '1px solid #fbfe34',
    fontFamily: 'HelveticaNeue, Roboto, Helvetica, sans-serif',
    borderRadius: '0',
    padding: '0',
    marginBottom: '20px',
    marginLeft: '0',
  }
  const timeStyle = {
    width: '75px',
    border: 'none',
    backgroundColor: '#141516',
    borderBottom: '1px solid #fbfe34',
    fontFamily: 'HelveticaNeue, Roboto, Helvetica, sans-serif',
    borderRadius: '0',
    padding: '0',
    marginBottom: '20px',
  }

  return (
    <div className={styles.dateTimePicker} >
    <Kronos
      name={name}
      date={name === "start" ? moment(meeting.start) : moment(meeting.end) }
      format="dddd, MMMM Do, YYYY"
      min={moment()}
      onChange={this.onChange}
      preventClickOnDateTimeOutsideRange={true}
      inputStyle={dateStyle}
      hideOutsideDateTimes={true}
    />
    <Kronos
      name={name}
      time={name === "start" ? moment(meeting.start) : moment(meeting.end) }
      format="h:mm a"
      minTime={moment()}
      onChange={this.onChange}
      preventClickOnDateTimeOutsideRange={true}
      inputStyle={timeStyle}
      timeStep={15}
      hideOutsideDateTimes={true}
      options={{
        format: {hour: 'h:mm a'},
      }}
    />
    </div>
  )
}

DateTimePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  meeting: PropTypes.shape({}),
}

export default DateTimePicker
