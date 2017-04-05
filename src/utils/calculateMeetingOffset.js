import moment from 'moment';

const WIDTH = 82;

const calculateMeetingOffset = (startTime) => {
  if (startTime === undefined) return 0;
  try {
    const startTimeObj = moment(startTime);
    return (WIDTH * (startTimeObj.hour() + (startTimeObj.minutes() / 60)));
  } catch (e) {
    return false;
  }
};

export default calculateMeetingOffset;
