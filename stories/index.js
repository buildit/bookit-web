import React from 'react';

import { storiesOf, action, linkTo } from '@kadira/storybook';

import Meeting from '../src/components/01-atoms/Meeting';
import RoomTimeline from '../src/components/02-molecules/RoomTimeline';
import Agenda from '../src/components/03-organisms/Agenda';
import TimelineLabelList from '../src/components/01-atoms/TimelineLabelList';

storiesOf('Agenda', module)
  .add('displays multiple rooms', () => {
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
    return <Agenda rooms={exampleRooms} />;
  });

storiesOf('RoomTimeline', module)
  .add('displays the name and timeline', () => {
    const exampleRoom = {
      name: 'Blue',
      meetings: [
        {
          startTime: '2017-03-24T15:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
          duration: 1.5, // hours
          isOwnedByUser: true,
        },
      ],
    };
    return <RoomTimeline room={exampleRoom} />;
  })
  .add('with one meeting', () => {
    const exampleRoom = {
      name: 'Cyan',
      meetings: [
        {
          startTime: '2017-03-24T07:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
          duration: 1.0, // hours
          isOwnedByUser: true,
        },
      ],
    };
    return <RoomTimeline room={exampleRoom} />;
  })
  .add('with multiple meetings', () => {
    const exampleRoom = {
      name: 'Rainbow',
      meetings: [
        {
          startTime: '2017-03-24T07:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
          duration: 2.0, // hours
          isOwnedByUser: true,
        },
        {
          startTime: '2017-03-24T10:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
          duration: 4.0, // hours
          isOwnedByUser: false,
        },
      ],
    };
    return <RoomTimeline room={exampleRoom} />;
  });

storiesOf('Meeting', module)
  .add('is not owned by user', () => (
    <Meeting duration={1} />
  ))
  .add('is owned by user', () => (
    <Meeting isOwnedByUser duration={1} />
  ))
  .add('an hour and a half', () => (
    <Meeting isOwnedByUser duration={1.5} />
  ));

storiesOf('TimelineLabelList', module)
  .add('displays hour-blocked list of times', () => (
    <TimelineLabelList />
  ));
