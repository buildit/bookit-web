import React, { PropTypes } from 'react';

const TooltipContent =
  ({ title, start, end, roomName, owner, isOwnedByUser, styles, onEditClick }) => (
    <div className={styles.content}>
      <div>
        <strong className={styles.title}>{ title }</strong>
        <p>{ start.format('h:mma') } - { end.format('h:mma') }</p>
      </div>
      <div className={styles.ownerInfo}>
        <div>
          <strong className={styles.roomTitle}>{ roomName } Room</strong>
          <p>by { isOwnedByUser ? 'me' : owner.name }</p>
        </div>
        {isOwnedByUser ? <div onClick={() => onEditClick()} className={styles.edit}>Edit</div> : '' }
      </div>
    </div>
);

TooltipContent.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.shape({}).isRequired,
  end: PropTypes.shape({}).isRequired,
  roomName: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  isOwnedByUser: PropTypes.bool.isRequired,
  styles: PropTypes.shape({}),
  onEditClick: PropTypes.func.isRequired,
};

export default TooltipContent;
