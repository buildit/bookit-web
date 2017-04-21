# Bookit

Bookit is a web app aimed at providing a neat way to book meeting rooms in the Designit/Buildit office in Brooklyn.

## Quick start
```
npm install
npm run dev
```

## Useful scripts
Run all validations: unit tests and linting
```
npm test
```

Run tests and watch for changes
```
npm run test-watch
```

See a terrifying chart that reveals all the untested code 😱
```
npm run test-coverage

```

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

## Outstanding questions
In order for this app to work as expected, we need the answers to some specific questions (in this case, these questions were directed to
Designit IT). These questions are currently outstanding:
1) Can we register Bookit with your Azure Active Directory?
2) We'd like Bookit to be granted these two specific permissions: `Calendars.ReadWrite` and `Directory.Read.All`
Roughly speaking, this would allow our app to read and modify calendars for Designit users. It also allows the app to read the list of Designit users. It does not give the app any other information, such as email. You can read more these permissions here: https://developer.microsoft.com/en-us/graph/docs/authorization/permission_scopes
3) We'd like to create a key for the application. Of course, this is needed so that our app can authenticate against Designit's Exchange server.

## Feature backlog
As of the week of 4/17, this project has been put on hold.

This is an itemized list of the work remaining: [Bookit feature backlog](/docs/backlog.md)

## Technical debt
Here is an itemized list of technical debt and cleanup the team would like to do:
[Bookit tech debt](/docs/techdebt.md)

## Team members
Lawrence Lee - Designit

Mert Sondac - Designit

Chris Ashurst - Buildit (@frostiebot)

Zac Smith - Buildit (@billyzac)

Nicole Tibaldi - Buildit (@ntibaldi92)

Roman Safronov - Buildit (@electroma)

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

## CI & Deployment
We are using Travis to manage continuous integration.

- Travis runs validations and then creates a production build. Nothing too crazy there.

- On commits to `master`, Travis creates a new Docker image and pushes it to our repo on [Docker Hub](https://hub.docker.com/search/?isAutomated=0&isOfficial=0&page=1&pullCount=0&q=builditdigital&starCount=0).

- The Dockerfile makes use of the Single-Page-App-friendly nginx config in the `nginx` folder.

- To tell the front-end app where the server is running, set an environment variable called `API_BASE_URL`. For our dev deployment, this is being set in `deploy/dev/docker-compose.yml`. For more sophisticated deployments, this variable can, of course, be set in a more dynamic way.

- The Dockerfile "injects" the `API_BASE_URL` into the client side code. It is then available as `window.__CONFIG`. You can see this being used in `api/configParam`.

- See `.travis.yml`, `Dockerfile`, and `deploy` for details.

To build and run the Docker container locally.
```
npm run build && docker build . -t bookit-web:local && docker run --rm -ti -p 8080:80 -e API_BASE_URL=http://localhost:8888 bookit-web:local
```
Bookit will be running on http://localhost:8080/.


Travis might fly too close to the Sun and fall out of the sky. No worries. You can still perform a build and push:
```
npm run build && docker build . -t builditdigital/bookit-web:latest && docker push builditdigital/bookit-web:latest
```

## Bookit server
Check it out [here](https://github.com/buildit/bookit-server).
