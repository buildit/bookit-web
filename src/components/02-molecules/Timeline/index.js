import React, { PropTypes } from 'react';
import styles from './styles.scss';
import Meeting from '../../01-atoms/Meeting';

// const startTime = 8;

// const meetings = [
//   {
//     duration: 2.5,
//     startTime: <10:30am in some time format>
//   },
//   {
//     duration: 0.5,
//     startTime: <8:30am in some time format>
//   }
// ]

// const Timeline = ({meetings}) => {
//   return <div className={styles.timeline}>
//     { meetings.map(meeting => {
//       const hoursFromBeginningOfTimeline =
//         //convernt startTime to hoursFromBeginningOfTimeline
//       return (
//         <Meeting
//         duration={meeting.duration}
//         hoursFromBeginningOfTimeline={hoursFromBeginningOfTimeline} />
//       )
//     })}
//   </div>
// }

const Timeline = ({ meetings = [] }) => {
  const timelineMeetings = meetings.map(meeting =>
    <Meeting
      isOwnedByUser={meeting.isOwnedByUser}
      duration={meeting.duration}
      hoursFromBeginningOfDay={meeting.startTime}
    />
  );

  return (<div className={styles.timeline}>
    {timelineMeetings}
  </div>);
};

Timeline.propTypes = {
  meetings: PropTypes.arrayOf(PropTypes.object),
};

export default Timeline;
