import React from 'react';
import styles from './styles.scss';
import Timeline from '../../02-molecules/Timeline';

const Room = () => (
  <div className={styles.room}>
    <div>Blue</div>
    <Timeline />
  </div>
);

export default Room;
