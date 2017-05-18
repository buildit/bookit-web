import * as meetingsFetch from './meetingsFetch';
import * as meetingCreate from './meetingCreate';
import * as meetingCancel from './meetingCancel';

import * as ui from './ui';
import * as auth from './auth';

export const meetingsFetchStart = meetingsFetch.meetingsFetchStart;
export const meetingsFetchSucceeded = meetingsFetch.meetingsFetchSucceeded;
export const meetingsFetchFailed = meetingsFetch.meetingsFetchFailed;

export const meetingCreateStart = meetingCreate.meetingCreateStart;
export const meetingCreateSucceeded = meetingCreate.meetingCreateSucceeded;
export const meetingCreateFailed = meetingCreate.meetingCreateFailed;

export const cancelMeetingStart = meetingCancel.cancelMeetingStart;
export const cancelMeetingSucceeded = meetingCancel.cancelMeetingSucceeded;
export const cancelMeetingFailed = meetingCancel.cancelMeetingFailed;

export const cancelMeetingRequest = ui.cancelMeetingRequest;

export const resetMeetings = ui.resetMeetings;
export const populateMeetingForm = ui.populateMeetingForm;
export const closeMeetingDialog = ui.closeMeetingDialog;
export const selectDate = ui.selectDate;
export const openCancellationDialog = ui.openCancellationDialog;
export const closeCancellationDialog = ui.closeCancellationDialog;

export const loginRequest = auth.loginRequest;
export const loginSuccess = auth.loginSuccess;
export const loginFailure = auth.loginFailure;
export const logout = auth.logout;
export const setClient = auth.setClient;
export const resetUser = auth.resetUser;
