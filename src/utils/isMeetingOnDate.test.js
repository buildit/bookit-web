import moment from 'moment';
import isMeetingOnDate from './isMeetingOnDate';

describe('isMeetingOnDate util', () => {
  let selectedDateMoment;

  beforeEach(() => {
    selectedDateMoment = moment.utc('2017-05-20T12:00:00.000+00:00');
  });

  it('identifies a meeting that starts on the specified date', () => {
    const meeting = {
      start: '2017-05-20T23:00:00.000+00:00',
      end: '2017-05-21T01:00:00.000+00:00',
    };
    expect(isMeetingOnDate(meeting, selectedDateMoment)).toBeTruthy();
  });

  it('identifies a meeting that ends on the specified date', () => {
    const meeting = {
      start: '2017-05-19T23:00:00.000+00:00',
      end: '2017-05-20T01:00:00.000+00:00',
    };
    expect(isMeetingOnDate(meeting, selectedDateMoment)).toBeTruthy();
  });

  it('identifies a meeting that happens before the specified date', () => {
    const meeting = {
      start: '2017-05-19T22:00:00.000+00:00',
      end: '2017-05-19T23:00:00.000+00:00',
    };
    expect(isMeetingOnDate(meeting, selectedDateMoment)).toBeFalsy();
  });

  it('identifies a meeting that happens after the specified date', () => {
    const meeting = {
      start: '2017-05-21T01:00:00.000+00:00',
      end: '2017-05-21T02:00:00.000+00:00',
    };
    expect(isMeetingOnDate(meeting, selectedDateMoment)).toBeFalsy();
  });
});
