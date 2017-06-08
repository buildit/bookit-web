import moment from 'moment'

const isWithinBounds = (testedMoment, earlyBoundary, lateBoundary) => (
  testedMoment.isBefore(lateBoundary) && testedMoment.isAfter(earlyBoundary)
)

const isMeetingOnDate = (meeting, selectedDateMoment) => {
  const startMoment = moment.utc(meeting.start)
  const endMoment = moment.utc(meeting.end)
  const startBoundaryMoment = selectedDateMoment.startOf('day')
  const endBoundaryMoment = selectedDateMoment.clone().endOf('day')

  const startsToday = isWithinBounds(startMoment, startBoundaryMoment, endBoundaryMoment)
  const endsToday = isWithinBounds(endMoment, startBoundaryMoment, endBoundaryMoment)

  return startsToday || endsToday
}

export default isMeetingOnDate
