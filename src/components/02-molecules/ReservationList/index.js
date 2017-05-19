import React, { PropTypes } from 'react';
import styles from './styles.scss';

const ReservationList = ({ roomMeetings = [], handleEditClick }) => {
  const meetings = roomMeetings.reduce((result, roomMeeting) => {
    // TODO: Filter by `isOwnedByUser` once the server serves up the goods.
    const userOwnedMeetings = roomMeeting.meetings.filter(() => true);
    return result.concat(userOwnedMeetings);
  }, []);

  return (
    <div className={styles.reservationList}>
      <h2 className={styles.header}>My Reservations</h2>
      {meetings.map(meeting => (
        <div className={styles.meeting} key={meeting.id}>
          <div className={styles.info}>
            <div className={styles.title}>{meeting.title}</div>
            <div className={styles.time}>{meeting.start.format('h:mma')} - {meeting.end.format('h:mma')}</div>
            <div className={styles.room}>{`${meeting.room.name} Room`}</div>
          </div>
          <div
            onClick={() => {
              handleEditClick(meeting);
            }}
            className={styles.button}
          >Edit</div>
        </div>
      ))}
    </div>
  );
};

ReservationList.propTypes = {
  roomMeetings: PropTypes.arrayOf(PropTypes.shape()),
  handleEditClick: PropTypes.func.isRequired,
};

export default ReservationList;
