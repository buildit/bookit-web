import React from 'react';

import { storiesOf, action, linkTo } from '@kadira/storybook';

import Meeting from '../src/components/01-atoms/Meeting';
import Timeblock from '../src/components/01-atoms/Timeblock';
import Timelabel from '../src/components/01-atoms/Timelabel';
import Timeline from '../src/components/02-molecules/Timeline';
import Room from '../src/components/02-molecules/Room';
import Agenda from '../src/components/02-molecules/Agenda';

storiesOf('Agenda', module)
  .add('displays multiple rooms', () => {
    const exampleRooms = [
      {
        name: 'Blue',
        meetings: [
          {
            startTime: '2017-03-24T15:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
            duration: '1.5', // hours
            isOwnedByUser: true,
          },
        ],
      },
      {
        name: 'Red',
        meetings: [
          {
            startTime: '2017-03-24T07:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
            duration: '1.0', // hours
            isOwnedByUser: true,
          },
          {
            startTime: '2017-03-24T10:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
            duration: '5.0', // hours
            isOwnedByUser: false,
          },
        ],
      },
    ];
    return <Agenda rooms={exampleRooms} />;
  });

storiesOf('Room', module)
  .add('displays the name and timeline', () => {
    const exampleRoom = {
      name: 'Blue',
      meetings: [
        {
          startTime: '2017-03-24T15:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
          duration: '1.5', // hours
          isOwnedByUser: true,
        },
      ],
    };
    return <Room room={exampleRoom} />;
  });

storiesOf('Timeline', module)
  .add('with one meeting', () => {
    const exampleMeetings = [
      {
        startTime: '2017-03-24T07:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
        duration: '1.0', // hours
        isOwnedByUser: true,
      },
    ];
    return <Timeline meetings={exampleMeetings} />;
  });

storiesOf('Timeline', module)
  .add('with multiple meetings', () => {
    const exampleMeetings = [
      {
        startTime: '2017-03-24T07:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
        duration: '2.0', // hours
        isOwnedByUser: true,
      },
      {
        startTime: '2017-03-24T10:00:00-04:00', // ISO8601 format YYYY-MM-DDTHH:mm:ssZ
        duration: '4.0', // hours
        isOwnedByUser: false,
      },
    ];
    return <Timeline meetings={exampleMeetings} />;
  });

storiesOf('Timeblock', module)
  .add('displays a representation of an hour of time', () => (
    <Timeblock />
  ))
  .add('displays two timeblocks side by side', () => (
    <div><Timeblock /><Timeblock /></div>
  ));

storiesOf('Meeting', module)
  .add('is not owned by user', () => (
    <Meeting duration={1} />
  ))
  .add('is owned by user', () => (
    <Meeting duration={1} isOwnedByUser />
  ))
  .add('an hour and a half', () => (
    <Meeting duration={1.5} isOwnedByUser />
  ));

storiesOf('Timelabel', module)
  .add('displays 8:00am', () => (
    <Timelabel hour="8" />
  ))
  .add('displays 7:00pm', () => (
    <Timelabel hour="7" postMeridian="true" />
  ));
