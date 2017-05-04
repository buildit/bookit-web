# Bookit Sprint #4: Demo (tentative)
May 4, 2017

_This is a tentative demo plan. We will send a finalized demo plan towards the end of the sprint._

1) We intend to demonstrate one new user story this week: canceling a booking.
2) We will make changes to the booking form, edit/cancel form, and the agenda view so that they match the designs in Zeplin.
3) In addition, we have identified some technical debt that we intend to address during this sprint.

## Canceling a booking

### Base case
1) Open the Bookit web app. See the agenda view, set to today's date, showing meetings for all rooms.
2) Hover over a booking that was created by the current user.
3) See the tooltip showing the meeting details, and the "edit" button.
4) Click "edit."
5) See the edit/cancel form appear in the left panel.
6) Click "cancel" on the edit/cancel form.
6) The booking will be removed from Bookit and in the Outlook calendar.

## UI polish

### Agenda view
We will clean up the agenda view and its' behavior such that it matches Zeplin.
- The agenda view will start by default at 8am, allowing the user to scroll backward or forward to show other timeslots.
- Timeslots that do not fall within business hours will be "greyed out" as shown in the designs.
- When you hover over a meeting, it will be outlined in white, and the tooltip will display.

### Booking form
We will style the booking form such that it matches the designs seen on Zeplin.<br />
This includes color, font, and changes to the form display as the user interacts with it.<br />
_This will not include styling of the calendar or time picker widgets. This will be addressed in a future sprint._

### Edit/cancel form
We will add the edit/cancel form, and style it so that it is consistent with the look of the booking form.

## Technical debt
We have identified three pieces of technical debt which will be resolved during this sprint.
1) Bug: Meeting titles from Exchange are not working. We will extract the meeting titles and display them in the tooltip.
2) Consistently use the following action format: `VERB_NOUN_xxx`. This will help to make our code more clear and readable.
3) Refactor the client side state. The state is currently too deeply nested. This work will flatten the state tree, making current code much more readable, testable, and maintainable. It will also make future work much easier.
