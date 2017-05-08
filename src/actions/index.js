import * as meetings from './meetings';
import * as auth from './auth';

export const meetingsFetchStart = meetings.meetingsFetchStart;
export const meetingsFetchSucceeded = meetings.meetingsFetchSucceeded;
export const meetingsFetchFailed = meetings.meetingsFetchFailed;

export const resetMeetings = meetings.resetMeetings;
export const createMeetingStart = meetings.createMeetingStart;
export const createMeetingFailure = meetings.createMeetingFailure;
export const populateMeetingEditForm = meetings.populateMeetingEditForm;
export const cancelMeetingRequest = meetings.cancelMeetingRequest;
export const closeMeetingDialog = meetings.closeMeetingDialog;

export const loginRequest = auth.loginRequest;
export const loginSuccess = auth.loginSuccess;
export const loginFailure = auth.loginFailure;
export const logout = auth.logout;
export const setClient = auth.setClient;
export const resetUser = auth.resetUser;
