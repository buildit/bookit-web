import React from 'react'
import PropTypes from 'prop-types'

import { Field } from 'redux-form'
import { DatePicker, TimePicker } from 'redux-form-material-ui'
import injectTapEventPlugin from 'react-tap-event-plugin'
import styles from './styles.scss'

injectTapEventPlugin()

const DateTimePicker = ({ name, label, disabled, error }) => {
  const datePickerStyle = { display: 'inline-block' }
  const datePickerTextFieldStyle = { width: '150px', fontSize: '18px', fontWeight: '100' }
  const timePickerStyle = datePickerStyle
  const timePickerTextFieldStyle = { width: '68px', fontSize: '18px', fontWeight: '100' }

  return (
    <div className={styles.dateTimePicker} >
      <Field
        name={name}
        disabled={disabled}
        floatingLabelText={label}
        component={DatePicker}
        autoOk
        errorText={error}
        style={datePickerStyle}
        textFieldStyle={datePickerTextFieldStyle}
        formatDate={new Intl.DateTimeFormat('en-US', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }).format}
      />
      <Field
        name={name}
        disabled={disabled}
        autoOk
        component={TimePicker}
        floatingLabelText=" " /* Need this to keep lines aligned :/  */
        style={timePickerStyle}
        textFieldStyle={timePickerTextFieldStyle}
      />
    </div>
  )
}

DateTimePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
}

export default DateTimePicker
