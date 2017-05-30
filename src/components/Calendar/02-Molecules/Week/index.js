import React, { PropTypes } from 'react';
import Day from '../01-Atoms/Day';

const Week = ({ week }) => (
  <div>
    {week.map((day, index) => <Day key={index} day={day} />)}
  </div>
);

Week.propTypes = {
  week: PropTypes.arrayOf(PropTypes.object),
};

export default Week;
