import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import RoomLabel from '../src/components/01-atoms/RoomLabel';
import Meeting from '../src/components/01-atoms/Meeting';
import Timeline from '../src/components/02-molecules/Timeline';
import Room from '../src/components/02-molecules/Room';
import Welcome from './Welcome';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('RoomLabel', module)
  .add('plain', () => (
    <RoomLabel name='Blue'/>
  ))

storiesOf('Meeting', module)
  .add('is not owned by user', () => (
    <Meeting duration={1} />
  ))
  .add('is owned by user', () => (
    <Meeting duration={1} isOwnedByUser={true} />
  ))
  .add('an hour and a half', () => (
    <Meeting duration={1.5} isOwnedByUser={true} />
  ))

storiesOf('Timeline', module)
  .add('contains a meeting', () => (
    <Timeline/>
  ))
  .add('displays meetings according to when they begin', () => (
    <Timeline/>
  ))

storiesOf('Room', module)
  .add('displays the name and timeline', () => (
    <Room/>
  ))
