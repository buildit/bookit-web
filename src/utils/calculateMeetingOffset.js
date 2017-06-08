export const HOUR_WIDTH = 82

export const calculateMeetingOffset = (startTime) => {
  if (!startTime || !startTime.isValid || !startTime.isValid()) {
    return 0
  }
  const hour = startTime.hour()
  const minute = startTime.minutes() / 60
  return (HOUR_WIDTH * (hour + minute))
}

