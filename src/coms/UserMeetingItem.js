import { connect } from 'react-redux'

import { makeMeetingStateToProps } from '../selectors'

import MeetingItem from './MeetingItem'

const mapStateToProps = makeMeetingStateToProps()

// TODO - I AM AN EXACT COPY OF RoomMeetingItem.js! STOP THAT NONSENSE

export default connect(mapStateToProps)(MeetingItem)
