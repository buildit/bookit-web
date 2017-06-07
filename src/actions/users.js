import { createAction } from 'redux-actions';
import { REMOVE_USER } from './actionTypes';

/* eslint-disable import/prefer-default-export */
export const removeUser = createAction(REMOVE_USER);
