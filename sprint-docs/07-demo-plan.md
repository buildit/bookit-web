
# Bookit Iteration #7: Demo Plan

Demo date: Wednesday June 14, 2017

1) Cancelation functionality: UI, server-side, and Outlook
2) Admin user management: UI only
3) Autho functionality: UI, server-side, and Azure AD

## Canceling a booking

### Cancel in Bookit
1) See the agenda view, set to today's date. See a meeting that I own.
2) See that same meeting in my Outlook calendar.
3) In Bookit, click "Edit".
4) See the cancelation dialog appear in the left panel.
5) Click "Yes" to confirm.
6) See:
- A message confirming that the cancelation succeeded.
- The meeting has disappeared from the agenda in Bookit.
- The meeting has disappeared from my Outlook calendar.

### Cancel in Outlook
1) See the agenda view, set to today's date. See a meeting that I own.
2) See that same meeting in my Outlook calendar.
3) Cancel the meeting in Outlook.
4) See:
- The meeting has disappeared from my Outlook calendar.
- The meeting has disappeared from the agenda in Bookit.


## Admin functionality

We intend to demonstrate three parts of the user management functionality. (Note that these features are only built out in the UI and are not yet connected to Bookit server or a real Microsoft service.)

As a Bookit admin, I want to invite new users so that people can use bookit.
1) On the Admin view, click the plus button.
2) See an Invite User form.
3) Fill out the form. Click "Send Invite".
4) See a confirmation that the invitation was sent.
5) See the user appear in the list, marked as not having accepted the invitation yet.

## Auth functionality

We intend to demonstrate that we can log into BookIt using Azure AD credentials.  The reason for logging into Azure is to demonstrate that when we reset the password, that it is the same password we use to log into BookIt.

1) Log into Azure AD (portal.azure.com) using an administrator account
2) Navigate to Azure AD user panel and select "Demo Oregano."  Select the reset password option.
3) Log into Office online (portal.office.com) and reset the password.  Capture the new password.
4) Log into BookIt using the demo account and the password that was captured.
5) Greatly enjoy booking meetings and killing other people's productivity.
