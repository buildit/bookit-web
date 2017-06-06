# Bookit Iteration #6: Demo Plan

Demo date: Wednesday June 7, 2017

1) Cancelation functionality: UI and server-side
2) Admin user management: UI only

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

As a Bookit admin, I want to see all users that have access to Bookit.
1) Log in as Rasmus, who is a user with administrative privileges.
2) See an "Admin" link in the upper right. Click it.
3) See an Admin view, which opens to a list of current users organized by team. Click on "Buildit" and see Buildit users. Click on "Designit" and see Designit users.
4) Search for a user by name and see the list reduce to show only that user.
5) See a list of recently added users in the left panel.

As a Bookit admin, I want to invite new users so that people can use bookit.
1) On the Admin view, click the plus button.
2) See an Invite User form.
3) Fill out the form. Click "Send Invite".
4) See a confirmation that the invitation was sent.
5) See the user appear in the list, marked as not having accepted the invitation yet.

As a Bookit admin, I want to be able to delete a user so only approved employees can book rooms
1) On the Admin view, see the list of users. Hover over a user and see a "Remove" button. Click "Remove". 
2) See a confirmation dialog. Click "Yes".
3) See a message confirming that the user was removed.
4) The user no longer appears in the list.
