
import React, { PropTypes } from 'react';
import styles from './styles.scss';

const RoomLabel = ({ name = '' }) => (
  <div className={styles.roomLabel}>
    <span className={styles.foo}>{ name }</span>
  </div>
);

RoomLabel.propTypes = {
};

export default RoomLabel;
