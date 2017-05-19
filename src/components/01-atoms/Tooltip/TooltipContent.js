import React, { PropTypes } from 'react';

const TooltipContent = ({ title, start, end, room, owner, isOwnedByUser, styles }) => (
  <div className={styles.content}>
    <p>
      <strong>{ title }</strong>
      { start.format('h:mma') } - { end.format('h:mma') }
    </p>
    <p>
      <strong>{ room.name } Room</strong>
      by { isOwnedByUser ? 'me' : owner.name }
    </p>
  </div>
);

TooltipContent.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.shape({}).isRequired,
  end: PropTypes.shape({}).isRequired,
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  isOwnedByUser: PropTypes.bool.isRequired,
  styles: PropTypes.shape({}),
};

export default TooltipContent;
