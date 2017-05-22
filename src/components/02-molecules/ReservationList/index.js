import React, { PropTypes } from 'react';

import styles from './styles.scss';

const ReservationList = ({ user, roomMeetings = [], handleEditClick }) => {
  const meetings = roomMeetings.reduce((result, roomMeeting) => {
    const userOwnedMeetings = roomMeeting.meetings.filter(
      meeting => meeting.owner.email === user.email
    );
    return result.concat(userOwnedMeetings);
  }, []);

  return (
    <div className={styles.reservationList}>
      <h2 className={styles.header}>{meetings.length > 0 ? 'My Reservations' : ''}</h2>
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
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  roomMeetings: PropTypes.arrayOf(PropTypes.shape()),
  handleEditClick: PropTypes.func.isRequired,
};

export default ReservationList;
