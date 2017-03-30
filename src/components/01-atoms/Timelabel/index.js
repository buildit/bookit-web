import React, { PropTypes } from 'react';
import styles from './styles.scss';

const Timelabel = ({ hour, postMeridian = false }) => {
  const meridian = postMeridian === false ? 'am' : 'pm';
  return (
    <div className={styles.timelabel}>{hour}:00{meridian}</div>
  );
};

Timelabel.propTypes = {
  hour: PropTypes.number.isRequired,
  postMeridian: PropTypes.boolean,
};

export default Timelabel;
