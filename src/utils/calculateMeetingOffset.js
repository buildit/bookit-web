import moment from 'moment';

const WIDTH = 82;

const calculateMeetingOffset = (startTime) => {
  if (startTime === undefined) return 0;
  try {
    const startTimeObj = moment(startTime);
    const hour = startTimeObj.hour();
    const minute = startTimeObj.minutes() / 60;
    return (WIDTH * (hour + minute));
  } catch (e) {
    return false;
  }
};

export default calculateMeetingOffset;
