import { normalize, schema } from 'normalizr'

export const user = new schema.Entity('users', {}, { idAttribute: 'email' })
export const room = new schema.Entity('rooms', {}, { idAttribute: 'email' })

export const meeting = new schema.Entity(
  'meetings',
  { room, owner: user, participants: [ user ] },
  {
    processStrategy: (value, parent) => {
      const { participants } = value
      return {
        ...value,
        participants: participants.filter(
          participant => participant.email !== parent.email
        ),
        room: parent.email,
      }
    },
  }
)

room.define({ meetings: [ meeting ] })

const dataNormalizer = (data) => {
  const reducedData = data.reduce(
    (out, { room, meetings }) => out.concat([{ ...room, meetings }]),
    []
  )
  // const normalized = normalize(reducedData, [ room ])
  // const denormalized = denormalize(['red-room@myews.onmicrosoft.com'], [room], normalized.entities)
  // const denormalized = denormalize(normalized.entities.meetings['guid-0.9954655667751835'], meeting, normalized.entities)
  return normalize(reducedData, [ room ])
}

export default dataNormalizer
