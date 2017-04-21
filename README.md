
## Overview -N

## Existing functionality

### Integration with Outlook
The app (or more specifically, the server-side code) can integrate with a Microsoft Exchange server. Events in a connected Outlook appear in Bookit's UI.

### Booking
The app can handle _very_ basic room booking.

A user can do this:
1) Open the app. See the agenda view, set to today's date, showing meetings for all rooms.
2) Click on an available space.
3) See the room booking form appear on the left, pre-populated with the correct time and date.
4) Add a meeting title.
5) Click "Bookit".
6) See the booking appear in Bookit and in the Outlook calendar.

Some common booking errors are handled. For example:
1) Open the Bookit web app.
2) Click on an available space.
3) See the room booking form appear on the left, pre-populated with the correct time and date.
4) Change to a time slot that is not available.
5) See a message that notifies the user that the time is not available.

There are two layers of validation at work. Basic form validation (e.g. is startDate before endDate) happens in the `validate` function within `containers/MeetingForm`. Validation related to business rules (e.g. overlapping meetings are disallowed) happens in `utils/getAvailableTimeSlot`.

### Login/Logout
The login functionality is faked out at the moment. The function `fakeLogin` in `api` simply returns ![The Boss](http://media-cache-ec0.pinimg.com/736x/1e/db/7c/1edb7c81dfd03ac2be75844afd8d17dc.jpg) with every login attempt. This means that users can login to the app using any username and password. (Or just click "Login"! We're not picky!)

`api.login` is a somewhat more realistic call to the server. It can be "turned on" whenever the server is actually listening for login requests.


## Design assets -N
// Zeplin, wireframes, etc

## Storybook -Z

## Outstanding questions -N

## Feature backlog -N
// Link to summary of tickets

## Technical debt -N
// Link to TD

## Team members -N

## Configuration -Z
// kyt

## CI & Deployment -Z
 TODO: Fix this (below)
 Travis build performs Docker image push only for `master` branch.
 We do not perform separate `npm i` and reuse build `node_modules` with `npm prune --production`.

 Local build and run example
 `npm run build && docker build . -t bookit-web:local && docker run --rm -ti -p 8080:80 -e API_BASE_URL=http://localhost:1234/ bookit-web:local`

 Build and push (just in case you do not trust Travis build)
 `npm run build && docker build . -t builditdigital/bookit-web:latest && docker push builditdigital/bookit-web:latest`

## Server-side architecture -Z
