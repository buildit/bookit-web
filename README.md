
## Overview
Bookit is a web app designed to allow different types of users to book conference room space - this app
integrates with Exchange (meetings created in Bookit will display on users' Exchange calendars, and vice versa).
Bookit also allows users outside of Exchange to be granted access. These users can then view the meeting schedule
and create their own bookings.

## Existing functionality -Z

## Design assets
[Designs on Zeplin (must be granted access)](https://app.zeplin.io/project/58d4072283526a2ba8174a28)

[Mobile prototype with annotations](https://invis.io/R4B44OSUC)

[Desktop prototype with annotations](https://invis.io/G7B44PKKY)

[UI assets](https://www.dropbox.com/sh/xqfl0pses67us7s/AABqy11BWMXyKA9EYmwhQei3a?dl=0)

[Calendar module PDF](/docs/CalendarModule.pdf)

## Storybook -Z

## Outstanding questions
In order for this app to work as expected, we need the answers to some specific questions (in this case, these questions were directed to
Designit IT). These questions are currently outstanding:
1) Can we register Bookit with your Azure Active Directory?
2) We'd like Bookit to be granted these two specific permissions:
     Calendars.ReadWrite
     Directory.Read.All
Roughly speaking, this would allow our app to read and modify calendars for Designit users. It also allows the app to read the list of Designit users. It does not give the app any other information, such as email. You can read more these permissions here: https://developer.microsoft.com/en-us/graph/docs/authorization/permission_scopes
3) We'd like to create a key for the application. Of course, this is needed so that our app can authenticate against Designit's Exchange server.

## Feature backlog -N
As of the week of 4/17, this project has been put on hold. You can find an itemized list of the work remaining
(as we've identified it) below:
// Link to summary of tickets

## Technical debt -N
As of the week of 4/17, this project has been put on hold. You can find an itemized list of technical debt and cleanup
the team would like to do below:
// Link to TD

## Team members -N
Lawrence Lee - Designit
Mert Sondac - Designit
Chris Ashurst - Buildit (@frostiebot)
Zac Smith - Buildit (@billyzac)
Nicole Tibaldi - Buildit (@ntibaldi92)
Roman Safronov - Buildit (@electroma)

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
