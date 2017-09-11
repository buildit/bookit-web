# Bookit

[![Build Status](https://travis-ci.org/buildit/bookit-web.svg?branch=master)](https://travis-ci.org/buildit/bookit-web) [![Coverage Status](https://coveralls.io/repos/github/buildit/bookit-web/badge.svg?branch=master)](https://coveralls.io/github/buildit/bookit-web?branch=master)

Bookit is a web app aimed at providing a neat way to book meeting rooms in the Designit/Buildit office in Brooklyn.

## Quick start
```
yarn install
yarn start
```

## Requirements

To support various scripts locally, you should have `aws-cli` installed and configured with your secret and access key.
```
pip install awscli
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

## Functional Tests
There are a couple of ways to run the functional/integration test suites - all of them involve the use of testcafe.

Fundamentally, all functional tests rely on the presence of the following environment variables: `BOOKITURI`, `BOOKITUSER` and `BOOKITPASSWD`

To run functional tests 100% locally, you will need to have bookit-web and bookit-server already running locally. Additionally you will
require a set of credentials that will work for your local copy of bookit.

For example:
```
$ BOOKITURI=http://localhost:3001 BOOKITUSER=bruce@domain.com BOOKITPASSWD=brucepw npm run test:functional
- or -
$ BOOKITURI=http://localhost:3001 BOOKITUSER=bruce@domain.com BOOKITPASSWD=brucepw yarn test:functional
```

The second option for running functional tests is to use `scripts/run-dockerized-functional-tests.sh`.

Local invocation of the script (from the bookit-web root directory) is as follows:

```
$ ./scripts/run-dockerized-functional-tests.sh
```

With the above script, you do not need to pass the `BOOKITURI`, `BOOKITUSER` or `BOOKITPASSWD` variables, as the script will fetch valid values automatically from AWS before running. You also do not need to specify which URL to test against, as the dockerized bookit-web is network-aliased inside the container as bookit.riglet.io (which is the staging URL that's registered for the app on portal.azure.com).

As a general rule: If you are developing locally, it makes more sense to run functional tests via the npm/yarn script, and use of `run-dockerized-functional-tests.sh` is intended for CI environments or if you want to possibly debug why a CI build is choking on the script.

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
You can retrieve user credentials using the `aws` commandline (or alternatively, logging into the aws dashboard, navigating to the **EC2** Dashboard and selecting **Parameter Store** from the left-hand side menu).

The user parameters are stored under the keys `BUILDIT_REGULAR_USER_NAME` and `BUILDIT_REGULAR_USER_PASSWORD`.

Example using `aws-cli`:

```
$ aws ssm get-parameters --names BUILDIT_REGULAR_USER_NAME BUILDIT_REGULAR_USER_PASSWORD --with-decryption
```

(Output removed for obvious reasons)

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

Eunice Chung - Designit

Chris Ashurst - Buildit (@frostiebot)

Zac Smith - Buildit (@billyzac)

Nicole Tibaldi - Buildit (@ntibaldi92)

Krishna Shukla - Buildit (@krishna1027)

Andrew Tuliszewki - Buildit (@defpearlpilot)

Peter Monks - Buildit (@monksp-buildit)

Tiani Jones - Buildit (@tianioriginal)

Mat Rosa - Buildit (@matsays)

## Former contributors:
-Mert Sondac - Designit

-Roman Safronov - Buildit (@electroma)

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
We are using Travis to manage continuous integration and continuous deployment to staging.

- Travis runs validations and then creates a production build. Nothing too crazy there.

- On commits to `master`, if all unit tests pass, Travis creates a new Docker image and pushes it to an AWS ECR repo. After a successful push to ECR, the app is deployed to the integration environment. Then Integration tests are run. Only if the integration tests run successfully, does Travis then deploy the app to the staging environment.

- The Dockerfile consumes the production code from the `build` directory, and adds the `config.js.template` file from the `nginx` directory into the image. Since bookit-web is 100% browser code, the resulting javascript from the build directory is free of any dependencies, thus making the resulting docker image essentially just static files.

## Bookit integration
Integration deployments are [here](https://int-bookit-web.buildit.tools).

## Bookit staging
Staging deployments are [here](https://stg-bookit-web.buildit.tools).

## Bookit server
Check it out [here](https://github.com/buildit/bookit-server).

## Release Plan
The [plan](https://github.com/buildit/bookit-web/wiki) as it stands.
