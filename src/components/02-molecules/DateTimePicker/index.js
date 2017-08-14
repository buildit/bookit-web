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

  return (
    <div className={styles.dateTimePicker} >
    <Kronos
      date={field.input.value}
      format="dddd, MMMM Do, YYYY"
      min={moment()}
      onChangeDateTime={result => field.input.onChange(result)}
      preventClickOnDateTimeOutsideRange={true}
      inputStyle={dateStyle}
      hideOutsideDateTimes={true}
      options={{
        font: 'HelveticaNeue, Roboto, Helvetica, sans-serif',
        corners: '0',
      }}
    />
    <Kronos
      name={name}
      time={field.input.value}
      format="h:mm a"
      onChangeDateTime={result => field.input.onChange(result)}
      preventClickOnDateTimeOutsideRange={true}
      inputStyle={timeStyle}
      timeStep={15}
      hideOutsideDateTimes={true}
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
