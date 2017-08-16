import React from 'react'

const RoomPicker = field => (
  <select
    onChange={value => field.input.onChange(value)}
    value={field.input.value}
  >
    {field.options.map(
      option => (
        <option
          key={option.id}
          value={option.id}
          >{option.name}</option>
      )
    )}
  </select>
)

export default RoomPicker
