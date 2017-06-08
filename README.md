# Bookit

[![Build Status](https://travis-ci.org/buildit/bookit-web.svg?branch=master)](https://travis-ci.org/buildit/bookit-web)

Bookit is a web app aimed at providing a neat way to book meeting rooms in the Designit/Buildit office in Brooklyn.

## Quick start
```
yarn install
yarn start
```

## Useful scripts
Run all validations: unit tests and linting
```
npm test
```

Run tests and watch for changes
```
npm run test:unit:watch
```

See a terrifying chart that reveals all the untested code 😱
```
npm run test:unit:coverage

```

Run in-browser tests against Chrome. You need to have the app running locally so these tests have something to test against, so make sure you've `npm start`ed it first.
```
npm run test:functional
```

## Existing functionality

### Integration with Outlook
The app (or more specifically, the server-side code) can integrate with a Microsoft Exchange server.

### Booking
The app can handle _very_ basic room booking.

A user can do this:
1) Open the app. See the agenda view, set to today's date, showing meetings for all rooms.
2) Click on an available space.
3) See the room booking form appear on the left, pre-populated with the correct time and date.
4) Add a meeting title.
5) Click "Bookit".
6) See the booking appear in Bookit.

Some common booking errors are handled. For example:
1) Open the Bookit web app.
2) Click on an available space.
3) See the room booking form appear on the left, pre-populated with the correct time and date.
4) Change to a time slot that is not available.
5) See a message that notifies the user that the time is not available.

There are two layers of validation at work. Basic form validation (e.g. is startDate before endDate) happens in the `validate` function within `containers/MeetingForm`. Validation related to business rules (e.g. overlapping meetings are disallowed) happens in `utils/getAvailableTimeSlot`.

### Login/Logout
You can log in with this example user:
email: 'bruce@myews.onmicrosoft.com'
password: 'who da boss?'

These credentials are [hardcoded into the server, along with a few other sample users](https://github.com/buildit/bookit-server/blob/master/src/service/stub/StubPasswordStore.ts).

## Design assets
[Designs on Zeplin (must be granted access)](https://app.zeplin.io/project/58d4072283526a2ba8174a28)

[Mobile prototype with annotations](https://invis.io/R4B44OSUC)

[Desktop prototype with annotations](https://invis.io/G7B44PKKY)

[UI assets](https://www.dropbox.com/sh/xqfl0pses67us7s/AABqy11BWMXyKA9EYmwhQei3a?dl=0)

[Calendar module PDF](/docs/CalendarModule.pdf)

## Outstanding questions
In order for this app to work as expected, we need the answers to some specific questions (in this case, these questions were directed to
Designit IT). These questions are currently outstanding:
1) Can we register Bookit with your Azure Active Directory?
2) We'd like Bookit to be granted these two specific permissions: `Calendars.ReadWrite` and `Directory.Read.All`
Roughly speaking, this would allow our app to read and modify calendars for Designit users. It also allows the app to read the list of Designit users. It does not give the app any other information, such as email. You can read more these permissions here: https://developer.microsoft.com/en-us/graph/docs/authorization/permission_scopes
3) We'd like to create a key for the application. Of course, this is needed so that our app can authenticate against Designit's Exchange server.

## Team members
Lawrence Lee - Designit

Mert Sondac - Designit

Chris Ashurst - Buildit (@frostiebot)

Zac Smith - Buildit (@billyzac)

Nicole Tibaldi - Buildit (@ntibaldi92)

Roman Safronov - Buildit (@electroma)

Andrew Tuliszewki - Buildit (@defpearlpilot)

Peter Monks - Buildit (@monksp-buildit)

Tiani Jones - Buildit (@tianioriginal)

## Configuration
Bookit was bootstrapped from [React Skellington](https://github.com/buildit/react-skellington).

Configuration can be tweaked via changes to `webpack.config.babel.js`.

Deeper changes can be made via the modules under `webpack/parts`

The following files give control over the project:
```
.eslintrc.json
.stylelintrc.json
.browserlistrc
webpack.config.babel.js
```

Changes to `.babelrc` are NOT recommended (except for the addition/removal of plugins). Babel configuration should be modified through `webpack/parts/javascript.js`

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

To run both the client and server locally.
```
docker-compose up
```

Travis might fly too close to the Sun and fall out of the sky. No worries. You can still perform a build and push:
```
npm run build && docker build . -t builditdigital/bookit-web:latest && docker push builditdigital/bookit-web:latest
```

The dev deployment lives at http://bookit.riglet.io/. No guarantees that you'll see anything there! Or that you'll like what you see! As a dev deployment, it has not necessarily been checked by human eyes, and may change at any time.

## Bookit server
Check it out [here](https://github.com/buildit/bookit-server).

## Release Plan
The [plan](https://github.com/buildit/bookit-web/wiki) as it stands.
