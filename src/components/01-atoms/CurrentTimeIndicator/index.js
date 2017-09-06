import React from 'react'
import { connect } from 'react-redux'
import momentPropTypes from 'react-moment-proptypes'

import { getSelectedDate } from '../../../selectors'

import moment from 'moment'

import styles from './styles.scss'

const WIDTH = 82

export class CurrentTimeIndicator extends React.Component {
  constructor(props) {
    super(props)
    this.updateCalculatedStyle = this.updateCalculatedStyle.bind(this)

    this.state = { calculatedStyle: this.calculatedStyle() }
  }

  calculateOffset() {
    const now = moment()
    const hour = now.hour()
    const minutes = now.minutes()
    return WIDTH * (hour + (minutes / 60))
  }
  calculatedStyle() {
    return { left: this.calculateOffset() }
  }
  updateCalculatedStyle() {
    this.setState({ calculatedStyle: this.calculatedStyle() })
  }

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.updateCalculatedStyle()
    }, 60000)
    this.setState({ intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  render() {
    let rendered = null
    const calculatedStyle = this.state.calculatedStyle
    if (this.props.selectedDate.isSame(moment(), 'day')) {
      rendered = <div
        className={styles.currentTimeIndicator}
        style={calculatedStyle}
      />
    }
    return rendered
  }
}

CurrentTimeIndicator.propTypes = {
  selectedDate: momentPropTypes.momentObj.isRequired,
}

const mapStateToProps = state => ({
  selectedDate: getSelectedDate(state),
})


const connected = connect(mapStateToProps, null)(CurrentTimeIndicator)

export default connected
