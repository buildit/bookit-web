import React from 'react'

import styles from './styles.scss'

const RoomTimelineNames = rooms => rooms.map((room, index) => (
  <p key={index} className={styles.roomName}>{ room.name }</p>
))

export default RoomTimelineNames
