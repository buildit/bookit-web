import moment from 'moment';
export const HOUR_WIDTH = 82;

export const calculateMeetingOffset = (startTime) => {
  if (!startTime.isValid || !startTime.isValid()) {
    console.log('oh noooooo!!!!!!!!!!!!', startTime);
    return 0;
  }
  try {
    const hour = startTime.hour();
    const minute = startTime.minutes() / 60;
    return (HOUR_WIDTH * (hour + minute));
  } catch (e) {
    console.log(e)
    return 100;
  }
};

