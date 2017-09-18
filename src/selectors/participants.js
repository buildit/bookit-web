import { createGetSelector } from 'reselect-immutable-helpers'

export const getParticipants = state => state.participants

export const getParticipantIds = state => getParticipants(state).get('result').toArray()

export const getParticipantEntities = state => getParticipants(state).get('entities')

export const getParticipantEntity = (state, props) => getParticipantEntities(state).get(props.id)

export const getParticipantName = createGetSelector(getParticipantEntity, 'name', null)
export const getParticipantEmail = createGetSelector(getParticipantEntity, 'email', null)
