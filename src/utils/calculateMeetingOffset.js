import moment from 'moment';

const WIDTH = 82;

const calculateMeetingOffset = (startTime) => {
  if (startTime === undefined) return 0;
  try {
    const startTimeObj = moment(startTime);
    const hourPortion = startTimeObj.hour();
    const minutePortion = startTimeObj.minutes() / 60;
    const hoursFromBeginningOfTimeline = hourPortion + minutePortion;
    return (WIDTH * hoursFromBeginningOfTimeline);
  } catch (e) {
    return false;
  }
};

export default calculateMeetingOffset;
