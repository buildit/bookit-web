import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './Layout.scss'

class Loader extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div className={styles.layout}>
        <div>
          <div className={styles.layoutItem}>
            <h1>BookIt</h1>
          </div>
          <div className={styles.layoutItem}>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}

export default Loader
