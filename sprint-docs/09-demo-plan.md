
# Bookit Iteration #9: Demo Plan

Demo date: Wednesday July 26, 2017

1) Cross-browser support (#5)
2) Edit bookings (#6)
3) User notification when booking fails (#7)

Additional work completed:

4) Prevent users from attempting to make bookings in the past (#8)
5) Current time indicator (yellow line) appears only when viewing today's agenda (#9)
6) Adding/inviting users to Bookit (#10)

------------------------------------------------------------------------------
## 1 - Cross-browser support
1) View Bookit in supported browsers. (Chrome, Safari, Firefox  - last 2 versions)
  - Note: we are also supporting IE > 11 and Edge

## 2 - Editing a booking
1) See the agenda view, set to today's date. See a meeting that I own.
2) In Bookit, click "Edit."
3) See the meeting form appear in the left panel.
  - 3a) View a meeting tooltip on the agenda view. Note that the "edit" button does not appear, even on bookings that the user owns.
  - 3b) The user must close the edit dialog or save their changes before attempting to edit another booking.
4) Change the meeting title.
5) Click "save."
6) See:
- The meeting details change in "My Reservations."
- The meeting details change on the timeline.

## 3 - Failed bookings
1) See the agenda view, set to today's date.
2) Click on the timeline in an available slot and enter a title for the booking.
3) Disable the network in the browser.
4) See messaging indicating that the booking failed.

## 4 - Booking in the past
#### Clicking on the timeline
1) See the agenda view, set to today's date.
2) Click on the timeline to the left of the yellow time indicator.
3) See that the meeting form does not appear.

#### Changing the time in the form
1) See the agenda view, set to today's date.
2) Click on the timeline to the right of the yellow time indicator.
3) See the meeting form in the left pane.
4) Change the start/end time to a time or date in the past.
5) See a message in the left pane indicating that the booking must be in the future.

## 5 - Current time indicator
#### Indicator only appears for today's agenda
1) See the agenda view, set to today's date.
2) See the yellow line, indicating the current time.
3) Click on a past or future date in the calendar.
4) See the agenda view, displaying all meetings, with no yellow line to indicate the current time.

#### Indicator advances as time passes
1) See the agenda view. See the yellow line, indicating the current time.
2) Allow time to pass.
3) See the agenda view. See that the yellow line has advanced to represent the passage of time.

## 6 - Adding/inviting users (Backend changes only)
1) Navigate to the admin panel and click "+." (Must be logged in as an admin user.)
2) Enter an email address and click "add user."
  - Note: The form validates that you are submitting a well-formed email address.
3) See a message indicating that the invitation was successful.
4) Click to view the "Wipro" directory and see that user was added.
5) Log in as the invited user. See an invitation email.
6) Log in as the admin user for builditcontoso. See that the email address has been added to the contact list. (This will not be user-facing.)




