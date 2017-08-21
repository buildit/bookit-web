import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { getRooms } from '../../../selectors'

const RoomSelectField = ({ input: { value }, rooms }) => (
  <SelectField
    floatingLabelText="Meeting Room"
    value={value}>
    { rooms.map(room => <MenuItem key={room.id} value={room.id} primaryText={room.name} />) }
  </SelectField>
)

RoomSelectField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
  }),
  rooms: PropTypes.array,
}

const mapStateToProps = state => ({
  rooms: getRooms(state),
})

export default connect(mapStateToProps)(RoomSelectField)
