import React, { PropTypes } from 'react';
import styles from './styles.scss';
import Timeline from '../../02-molecules/Timeline/index.js';

const Room = () => {
  return <div className={styles.room}>
    <div>Blue</div>
    <Timeline/>
  </div>
}

export default Room;
