# Bookit Sprint #5: Demo Plan

Demo date: Thursday May 25, 2017

1) Finish Meeting Cancelation functionality
  - UI matches designs
  - Cancelation is handled properly on server/MS Exchange
2) Login/Logout (stubbed)
3) User can select a date to see Agenda for that date
4) Do at least one session of design/dev pairing to refine the UI
5) Fun Alexa weirdness

=========

## Canceling a booking

1) Open the Bookit web app. See the agenda view, set to today's date, showing meetings for all rooms.

2) Click "Edit". There are two ways to get there:

a) Hover over a booking, see the tooltip, and click "Edit".

b) See My Reservations. Click "Edit" on one of the reservations.

3) See the cancellation dialog appear in the left panel.

4) Click "Yes" to confirm.

5) See a message confirming that the cancellation succeeded.

6) Refresh page and see that the meeting is no longer there.

* My Reservations only show meetings I own.
* "Edit" appears on tooltip only for meetings I own.

## Login/Logout
1) See login. Enter the correct credentials for Bruce. Click "Login"

2) See "Hello Bruce" in the upper right of the screen.

a) See "My Meetings" marked.

b) See "My Reservations" in the left pane.

3) Cannot edit a meeting I don't own

4) Click "Logout". See Login screen.

5) Login as Babs. See Babs' meetings marked.

## Select Date
1) Create a meeting for today and tomorrow.  Or have them existing already.

2) Click on tomorrow in the calendar.

3) Only tomorrow's meeting should appear.

4) Click on today in the calendar.

5) Only today's meeting should appear.
