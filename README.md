
## Overview
Bookit is a web app designed to allow different types of users to book conference room space - this app
integrates with Exchange (meetings created in Bookit will display on users' Exchange calendars, and vice versa).
Bookit also allows users outside of Exchange to be granted access. These users can then view the meeting schedule
and create their own bookings.

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
The login functionality is faked out at the moment. The function `fakeLogin` in `api` simply returns a The Boss with every login attempt.

![The Boss](https://24.media.tumblr.com/tumblr_m3jp5eT0bs1r0ckzpo3_250.gif)

This means that users can login to the app using any username and password. (Or just click "Login"! We're not picky!)

`api.login` is a somewhat more realistic call to the server. It can be "turned on" whenever the server is actually listening for login requests.


## Design assets
[Designs on Zeplin (must be granted access)](https://app.zeplin.io/project/58d4072283526a2ba8174a28)

[Mobile prototype with annotations](https://invis.io/R4B44OSUC)

[Desktop prototype with annotations](https://invis.io/G7B44PKKY)

[UI assets](https://www.dropbox.com/sh/xqfl0pses67us7s/AABqy11BWMXyKA9EYmwhQei3a?dl=0)

[Calendar module PDF](/docs/CalendarModule.pdf)

## React Storybook
We used [Storybook](https://storybooks.js.org/) at the beginning of this project to quickly build out UI components before we had wired up the application state. Some of the stories need to be updated to match the new component apis. (See [Technical debt](##technical-debt).)

To run Storybook:

```
npm run Storybook
```

Note! Storybook runs on Webpack 1. Our app uses Webpack 2. We have tried to make the two webpack configs as similar as possible, but you might encounter friction between the two. Storybook's webpack modifications can be found in `.storybook/webpack.config.js`.

## Outstanding questions -N

## Feature backlog -N
// Link to summary of tickets

## Technical debt
// Link to TD

## Team members -N

## Configuration
We are using [Kyt](https://open.blogs.nytimes.com/2016/09/13/introducing-kyt-our-web-app-configuration-toolkit/?_r=0) to manage the configuration of our React app. This means that rather than explicitly defining our config here, we allow Kyt abstract away things like the configuration for Webpack, linters, and test runners.

The app was bootstrapped with Kyt's `kyt-static-starter`. To reproduce, do this:

```
npm install -g kyt-cli
kyt-cli setup
```

The Kyt CLI will ask you some questions. We went with the static app:

```
? Choose a starter-kyt: static
```

This gave us a starting point, but we needed to make some modifications to Kyt's base configuration. See the following for our changes:
```
kyt.config.js
.eslintrc.json
.stylelintrc.json
.bablerc
```

It can be really useful to see Kyt's original webpack config. One easy way to do that is to look at the source code for [kyt-core](https://github.com/NYTimes/kyt/tree/master/packages/kyt-core), particularly the [config folder](https://github.com/NYTimes/kyt/tree/master/packages/kyt-core/config). You can see the webpacks for dev and prod here. The [actions folder](https://github.com/NYTimes/kyt/tree/master/packages/kyt-core/cli/actions), which contains the scripts that run tests, lints your code, and [performs other interesting tricks](https://github.com/NYTimes/kyt/blob/master/docs/commands.md), is also helpful.

## CI & Deployment -Z
 TODO: Fix this (below)
 Travis build performs Docker image push only for `master` branch.
 We do not perform separate `npm i` and reuse build `node_modules` with `npm prune --production`.

 Local build and run example
 `npm run build && docker build . -t bookit-web:local && docker run --rm -ti -p 8080:80 -e API_BASE_URL=http://localhost:1234/ bookit-web:local`

 Build and push (just in case you do not trust Travis build)
 `npm run build && docker build . -t builditdigital/bookit-web:latest && docker push builditdigital/bookit-web:latest`

## Server-side architecture -Z
