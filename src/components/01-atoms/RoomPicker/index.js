
import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import styles from './styles.scss'

import { getRooms } from '../../../selectors'

const radioButtonGenerator = ({ input, rooms, meta: { touched, error } }) => (
  <div>
    <label className={styles.radioFieldLabel}>Available Rooms</label>
    <div className={styles.radioGrid}>
      { rooms.map(room =>
          <div key={`field-${room.id}`} className={styles.radioContainer}>
            <label key={room.id} className={styles.radio}>
              <input
                className={styles.radioDot}
                type="radio"
                {...input}
                value={room.id}
                checked={room.id === input.value}
              />
              <span className={styles.radioLabel}>
                {room.name}
              </span>
            </label>
          </div>
        )
      }
    </div>
    { touched && error && <div className={styles.radioError}>{ error }</div> }
  </div>
)

radioButtonGenerator.propTypes = {
  input: PropTypes.shape(),
  rooms: PropTypes.array,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
}

const mapStateToProps = state => ({
  rooms: getRooms(state),
})

export default connect(mapStateToProps)(radioButtonGenerator)
