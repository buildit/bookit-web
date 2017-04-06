import moment from 'moment';

export const HOUR_WIDTH = 82;

export const calculateMeetingOffset = (startTime) => {
  if (startTime === undefined) return 0;
  try {
    const startTimeObj = moment(startTime);
    const hour = startTimeObj.hour();
    const minute = startTimeObj.minutes() / 60;
    return (HOUR_WIDTH * (hour + minute));
  } catch (e) {
    return false;
  }
};

