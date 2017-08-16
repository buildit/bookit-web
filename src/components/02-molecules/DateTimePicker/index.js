import React from 'react'
import Kronos from 'react-kronos'
import moment from 'moment'

// NOTE: See `src/index.ejs` for additional styles that are applied to this component, specifically the datepicker calendar and timepicker dropdown.
// Global styles are bad -- we know! -- but this seemed to be the only way to override the styles defined by the React-Kronos library.
// The author of React-Kronos seems to acknowledge this liability: https://github.com/dubert/react-kronos/blob/master/README.md#roadmap

const DateTimePickerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
}

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
}

const dropdownStyle = {
  backgroundColor: '#2b3947',
  padding: '0',
}

const DateTimePicker = field => (
  <div style={DateTimePickerStyle} >
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
        corners: 0,
        locale: { lang: 'en-us' },
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
      calendarStyle={dropdownStyle}
      options={{
        format: { hour: 'h:mm a' },
        font: 'HelveticaNeue, Roboto, Helvetica, sans-serif',
        corners: 0,
      }}
    />
  </div>
)

export default DateTimePicker
