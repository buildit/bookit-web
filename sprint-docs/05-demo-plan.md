# Bookit Sprint #5: Demo Plan

Demo date: Thursday May 25, 2017

1) Login/Logout (stubbed)
2) Finish Meeting Cancelation functionality on the UI
3) User can select a date to see Agenda for that date

=========

## Login/Logout
1) See login. Enter the correct credentials for Barbra. Click "Login"

2) See "Hello Babs" in the upper right of the screen.
- See "My Meetings" marked as such.
- See "My Reservations" in the left pane.

3) Click "Logout". See Login screen.

4) Login as another user, say, for instance, Bruce. 
- See Bruce's meetings marked as such.

## Canceling a booking

1) Open the Bookit web app. See the agenda view, set to today's date, showing meetings for all rooms.

2) Click "Edit". There are two ways to get there:
- Hover over a booking, see the tooltip, and click "Edit".
- See My Reservations. Click "Edit" on one of the reservations.

3) See the cancelation dialog appear in the left panel.

4) Click "Yes" to confirm.

5) See:
- The meeting disappear from the agenda.
- A message confirming that the cancelation succeeded.

Notes:
- My Reservations only show meetings I own.
- "Edit" appears on tooltip only for meetings I own.
- This functionality is not yet connected to MS Outlook.

## Select Date
1) Create a meeting for today and another for tomorrow.

2) Click on tomorrow in the calendar.

3) Only tomorrow's meeting should appear.

4) Click on today in the calendar.

5) Only today's meeting should appear.
