import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'
import Kronos from 'react-kronos'
import moment from 'moment'

const DateTimePicker = (field) => {
  const dateStyle = {
    width: '245px',
    border: 'none',
    backgroundColor: '#141516',
    color: 'white',
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
    color: 'white',
    borderBottom: '1px solid #fbfe34',
    fontFamily: 'HelveticaNeue, Roboto, Helvetica, sans-serif',
    borderRadius: '0',
    padding: '0',
    marginBottom: '20px',
  }

  const calendarStyle = {
    backgroundColor: '#2b3947',
    color: 'white',
  }



  return (
    <div className={styles.dateTimePicker} >
    <Kronos
      date={field.input.value}
      format="dddd, MMMM Do, YYYY"
      min={moment().startOf('day')}
      onChangeDateTime={result => field.input.onChange(result)}
      preventClickOnDateTimeOutsideRange
      inputStyle={dateStyle}
      hideOutsideDateTimes
      calendarStyle={calendarStyle}
      options={{
        font: 'HelveticaNeue, Roboto, Helvetica, sans-serif',
        corners: '0',
      }}
    />
    <Kronos
      time={field.input.value}
      format="h:mm a"
      min={moment().startOf('minute')}
      onChangeDateTime={result => field.input.onChange(result)}
      preventClickOnDateTimeOutsideRange
      inputStyle={timeStyle}
      timeStep={15}
      hideOutsideDateTimes
      options={{
        format: {hour: 'h:mm a'},
        font: 'HelveticaNeue, Roboto, Helvetica, sans-serif',
        corners: '0',
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
