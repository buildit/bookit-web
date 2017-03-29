import React from 'react';
import styles from './styles.scss';
import Room from '../../02-molecules/Room';

const Agenda = () => (
  <div className={styles.agenda}>
    <Room />
    <Room />
    <Room />
  </div>
);

export default Agenda;
