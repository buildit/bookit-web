import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Kronos from 'react-kronos'

import moment from 'moment'

// NOTE: See `src/index.ejs` for additional styles that are applied to this component, specifically the datepicker calendar and timepicker dropdown.
// Global styles are bad -- we know! -- but this seemed to be the only way to override the styles defined by the React-Kronos library.
// The author of React-Kronos seems to acknowledge this liability: https://github.com/dubert/react-kronos/blob/master/README.md#roadmap

const DateTimePickerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
}

const labelStyle = {
  color: 'rgba(255, 255, 255, 0.3)',
  display: 'inline-block',
  textTransform: 'capitalize',
  fontSize: '0.7em',
  margin: '12px 0',
}

const dateStyle = {
  width: '235px',
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

class DateTimePicker extends Component {
  constructor(props) {
    super(props)

    this.onChangeControlled = this.onChangeControlled.bind(this)
    this.setVisibility = this.setVisibility.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onSelect = this.onSelect.bind(this)

    this.state = {
      visible: false,
    }
  }

  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.date,
      onChange: PropTypes.func,
      onFocus: PropTypes.func,
      onBlur: PropTypes.func,
    }),
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
      warning: PropTypes.string,
    }),
  }

  setVisibility(visible) {
    this.setState({ visible })
  }

  onChangeControlled(datetime) {
    this.props.input.onChange(datetime)
  }

  onClick() {
    if (!this.state.visible) this.setState({ visible: true })
  }

  onFocus() {
    this.props.input.onFocus(event)
    if (!this.state.visible) this.setState({ visible: true })
  }

  onBlur() {
    this.props.input.onBlur(this.props.input.value)
    if (this.state.visible) this.setState({ visible: false })
  }

  onSelect(datetime, visible, shouldClose) {
    if (shouldClose) this.setState({ visible: false })
  }

  render() {
    const { input: { name, value }, meta: { touched, error, warning } } = this.props

    const minDate = moment().startOf('day')
    const minTime = moment().startOf('minute')

    return (
      <div>
        <label style={labelStyle}>{ name }</label>
        <div style={DateTimePickerStyle}>
          <Kronos
            date={value}
            min={minDate}
            format="dddd, MMMM Do, YYYY"
            controlVisibility
            visible={this.state.visible}
            onChangeDateTime={this.onChangeControlled}
            onClick={this.onClick}
            onBlur={this.onBlur}
            setVisibility={this.setVisibility}
            preventClickOnDateTimeOutsideRange
            hideOutsideDateTimes
            inputStyle={dateStyle}
            calendarStyle={calendarStyle}
            options={{
              font: 'HelveticaNeue, Roboto, Helvetica, sans-serif',
              corners: 0,
              locale: { lang: 'en-us' },
            }}
          />
          <Kronos
            time={value}
            timeStep={15}
            min={minTime}
            format="h:mm a"
            controlVisibility
            visible={this.state.visible}
            onChangeDateTime={this.onChangeControlled}
            onClick={this.onClick}
            onBlur={this.onBlur}
            preventClickOnDateTimeOutsideRange
            hideOutsideDateTimes
            inputStyle={timeStyle}
            calendarStyle={dropdownStyle}
            options={{
              format: { hour: 'h:mm a' },
              font: 'HelveticaNeue, Roboto, Helvetica, sans-serif',
              corners: 0,
            }}
          />
        </div>
        {touched && ((error && <div>{error}</div>) || (warning && <div>{warning}</div>))}
      </div>
    )
  }
}

export default DateTimePicker
