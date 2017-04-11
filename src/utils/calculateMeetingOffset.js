import moment from 'moment';

export const HOUR_WIDTH = 82;

export const calculateMeetingOffset = (startTime) => {
  if (startTime === undefined) return 0;
  try {
    const startTimeObj = moment(startTime);
    const hourPortion = startTimeObj.hour();
    const minutePortion = startTimeObj.minutes() / 60;
    const hoursFromBeginningOfTimeline = hourPortion + minutePortion;
    return (HOUR_WIDTH * hoursFromBeginningOfTimeline);
  } catch (e) {
    return false;
  }
};

