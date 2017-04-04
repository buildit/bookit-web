import React, { PropTypes } from 'react';

import styles from './styles.scss';

const WIDTH = 82;
const TOOLTIP_WIDTH = 270;

const calculateWidth = (duration) => (WIDTH * duration) - 2;

const calculateOffset = (duration) => ((calculateWidth(duration) / 2) - (TOOLTIP_WIDTH / 2));

const Tooltip = ({ visible, duration }) => {
  const style = {
    display: visible ? 'block' : 'none',
    left: calculateOffset(duration),
  };

  return (<div className={styles.tooltip} style={style}>
    <div className={styles.anchor} />
    <div className={styles.content}>
      <p>
        <strong>Lunch and Learn with Batman</strong>
        3:00pm - 4:00pm
      </p>
      <p>
        <strong>Black Room</strong>
        by me
      </p>
    </div>
  </div>);
};

Tooltip.propTypes = {
  visible: PropTypes.bool,
  duration: PropTypes.number.isRequired,
};

export default Tooltip;
