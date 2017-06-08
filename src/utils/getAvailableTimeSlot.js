import moment from 'moment'


const sortByStart = (m1, m2) => (m1.start.isAfter(m2.start) ? 1 : -1)


const getAvailableTimeSlot = (desiredStart, meetings, desiredDuration = moment.duration(1, 'hour')) => {
  let desiredEnd = desiredStart.clone().add(desiredDuration)

  meetings
    // cut only overlapping meetings
    .filter(m => !(m.start.isAfter(desiredEnd) || m.end.isBefore(desiredStart)))
    .sort(sortByStart)
    .forEach((m) => {
      if (m.start.isAfter(desiredStart)) {
        if (desiredEnd.isAfter(m.start)) {
          desiredEnd = m.start
        }
      } else if (m.end.isAfter(desiredStart) && desiredStart.isBefore(m.end)) {
        desiredStart = m.end
      }
    })

  return {
    start: desiredStart,
    end: desiredEnd,
  }
}

export default getAvailableTimeSlot
