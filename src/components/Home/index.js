import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import Agenda from '../03-organisms/Agenda';
import Calendar from '../03-organisms/Calendar';

const exampleRooms = [
  {
    name: 'Red',
    meetings: [
      {
        startTime: '2017-03-24T07:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
        duration: 1.0, // hours
        isOwnedByUser: true,
      },
      {
        startTime: '2017-03-24T10:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
        duration: 5.0, // hours
        isOwnedByUser: false,
      },
    ],
  },
  { name: 'Green', meetings: [] },
  {
    name: 'Blue',
    meetings: [
      {
        startTime: '2017-03-24T15:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
        duration: 1.5, // hours
        isOwnedByUser: true,
      },
    ],
  },
  { name: 'Black', meetings: [] },
  { name: 'Orange', meetings: [] },
  { name: 'Pink', meetings: [] },
  { name: 'White', meetings: [] },
  { name: 'Violet', meetings: [] },
  { name: 'Yellow', meetings: [] },
];

export const Home = () => (
  <div className={styles.home}>
    <Calendar />
    <Agenda
      rooms={exampleRooms}
    />
  </div>

);

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  undefined,
)(Home);
