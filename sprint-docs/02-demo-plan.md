# Bookit Sprint #2: Demo (tentative)
April 11, 2017

_This is a tentative demo plan. We will send a finalized demo plan towards the end of the sprint._


We intend to demonstrate two user stories this week: Booking a room and Logging in.

## Booking a room

### Base case
1) Open the Bookit web app. See the agenda view, set to today's date, showing meetings for all rooms.
2) Click on an available space.
3) See the room booking form appear on the left, pre-populated with the correct time and date.
4) Add a meeting title.
5) Click "Bookit".
6) See the booking appear in Bookit and in the Outlook calendar.

### Attempt to book unavailable time slot within pre-fetch range
1) Open the Bookit web app.
2) Click on an available space.
3) See the room booking form appear on the left, pre-populated with the correct time and date.
4) Change to a time slot that is not available.
5) See a message that notifies the user that the time is not available.
6) Change to a time slot that is available.
7) See the warning disappear.
8) Click "Bookit".
9) See the booking appear in Bookit and in the Outlook calendar.

### Attempt to book unavailable time slot beyond pre-fetch range
1) Open the Bookit web app.
2) Click on an available space.
3) See the room booking form appear on the left, pre-populated with the correct time and date.
4) Change to a time slot that is not available and that is outside of the range of pre-fetched data.
5) Click "Bookit".
6) See a message that notifies the user that the time is not available.

Notes:
- What is pre-fetched data? When the app loads, it fetches data for the current day, of course, but it also fetches data for other proximate dates. We call this a "pre-fetch". By pre-fetching data, we can speed up the user experience when the user navigates to other dates. For the purposes of the demo, we are pre-fetching only one day. In production, we will pre-fetch two or three weeks.


## Logging in
We will go through the login flow twice: once for internal users (Designit employees) and once for external users.

1) Go to the Bookit web app and see a login screen.
2) Enter credentials (email and password). Click "Login".
3) See the agenda view.
  - My name is displayed the upper right corner.
  - Meetings I own are marked as such.

Notes:
- The "internal user" is a user we've created our our demo Exchange environment. The "external user" is added to a white list, which is managed via the Exchange web UI (for now). We can show this admin activity as part of the demo.
