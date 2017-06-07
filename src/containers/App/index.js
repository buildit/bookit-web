import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

const App = props => (
  <div className={styles.app}>
    {props.children}
  </div>
)

App.propTypes = {
  children: PropTypes.node,
}

export default App
