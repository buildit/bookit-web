# Bookit Sprint #4: Demo
May 17, 2017

1) We intend to demonstrate one new user story this week: canceling a booking.
2) We will make changes to the booking form, edit/cancel form, and the agenda view so that they match the designs in Zeplin.
3) In addition, we have identified some technical debt that we intend to address during this sprint.

## Canceling a booking

1) Open the Bookit web app. See the agenda view, set to today's date, showing meetings for all rooms.
2) Hover over a booking, see the details, and click on the meeting.
3) See the cancellation dialog appear in the left panel.
4) Click "Yes" to confirm.
5) See a message confirming that the cancellation succeeded.
6) Refresh page and see that the meeting is no longer there.

## UI polish

### Global
- Use the brand typeface, Helvetica Neue

### Agenda view
We will clean up the agenda view and its behavior such that it matches Zeplin.
- The agenda view will start by default at 8am, allowing the user to scroll backward or forward to show other timeslots.
- Timeslots that do not fall within business hours will be "greyed out" as shown in the designs.
- When you hover over a meeting, it will be outlined, and the tooltip will display.

### Calendar
- We added a calendar widget that matches the design.

### Booking form
We will style the booking form such that it matches the designs seen on Zeplin.
- This includes color, font sizes and weights, and changes to the form display as the user interacts with it.
- This will not include styling of the date or time pickers widgets. This will be addressed in a future sprint.

### Cancellation dialog
- We added a dialog that appears when the user is cancelling a meeting.

## Technical debt
- Bug: Meeting titles from Exchange are not working. We will extract the meeting titles and display them in the tooltip.
- Major refactor of Redux action creation and usage.
- Bug: Tooltip anchor was escaping it bounds.
- Bug: Meeting names were escaping their bounds.
- Add support for Enzyme, which allow us to mock React components during testing.
- Add functional tests: Client --> Server
- Major refactor of server-side code
  - Rationalize configuration
  - Fix test harness
