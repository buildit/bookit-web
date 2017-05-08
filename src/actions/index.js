import * as meetingsFetch from './meetingsFetch';
import * as meetingCreate from './meetingCreate';
import * as ui from './ui';
import * as auth from './auth';

export const meetingsFetchStart = meetingsFetch.meetingsFetchStart;
export const meetingsFetchSucceeded = meetingsFetch.meetingsFetchSucceeded;
export const meetingsFetchFailed = meetingsFetch.meetingsFetchFailed;

export const meetingCreateStart = meetingCreate.meetingCreateStart;
export const meetingCreateSucceeded = meetingCreate.meetingCreateSucceeded;
export const meetingCreateFailed = meetingCreate.meetingCreateFailed;

export const resetMeetings = ui.resetMeetings;
export const populateMeetingEditForm = ui.populateMeetingEditForm;
export const cancelMeetingRequest = ui.cancelMeetingRequest;
export const closeMeetingDialog = ui.closeMeetingDialog;

export const loginRequest = auth.loginRequest;
export const loginSuccess = auth.loginSuccess;
export const loginFailure = auth.loginFailure;
export const logout = auth.logout;
export const setClient = auth.setClient;
export const resetUser = auth.resetUser;
