import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { isBooking } from '../../../selectors'

import moment from 'moment'

export const TooltipContent =
  ({ title, start, end, roomName, owner, isUserAdmin, isOwnedByUser, styles, onEditClick, isBooking }) => {
    const now = moment()
    const isEditable = (isOwnedByUser || isUserAdmin) && !isBooking && end.isAfter(now) 

    return (
      <div className={styles.content}>
        <div>
          <strong className={styles.title}>{ title }</strong>
          <p>{ start.format('h:mma') } - { end.format('h:mma') }</p>
        </div>
        <div className={styles.ownerInfo}>
          <div>
            <strong className={styles.roomTitle}>{ roomName } Room</strong>
            <p className="owner-name">by { isOwnedByUser ? 'me' : owner.name }</p>
          </div>
          { isEditable && <div onClick={onEditClick} className={styles.edit}>Edit</div> }
        </div>
      </div>
    )}

TooltipContent.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.shape({}).isRequired,
  end: PropTypes.shape({}).isRequired,
  roomName: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  isUserAdmin: PropTypes.bool.isRequired,
  isOwnedByUser: PropTypes.bool.isRequired,
  styles: PropTypes.shape({}),
  onEditClick: PropTypes.func.isRequired,
  isBooking: PropTypes.bool,
}



export default connect(state => ({
  isBooking: isBooking(state),
}))(TooltipContent)
