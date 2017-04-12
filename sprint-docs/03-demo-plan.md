# Bookit Sprint #3: Demo (tentative)
April 18, 2017

_This is a tentative demo plan. We will send a finalized demo plan towards the end of the sprint._

There are three major goals for this sprint:
1) We will deploy Bookit.
2) Complete implementation of authentication for both internal and external users.
3) Implement the caching of Microsoft Exchange calendar data on our Bookit server.

## Deployment
We will demonstrate deployment simply by running this demo (and all subsequent demos) on a publically accessible url.

## Authentication

### As an internal user
Note: This is meant to mimic as closely as possible the experience of a Designit employee. Since we do not yet have access to Designit's Exchange server, this "internal" user is one that we've created on the MS Exchange server that is standing in for Designit's Exchange server.
1) Go to the Bookit web app and see a login screen.
2) Enter credentials for an "internal user".
3) Click "Log In".
4) See the agenda view.
  - My name is displayed the upper right corner.
  - Meetings I own are marked as such.
5) Click "Log out".
6) See the login screen. The user no longer has access to the Agenda view (or any other Bookit functionality).

### As an external user
This is meant to demonstrate the experience of an external user, e.g. a Buildit employee who has been granted access to Bookit.
1) Go to the Bookit web app and see a login screen.
2) Enter credentials. (This will be an account that does not exist on Designit's Exchange server.)
3) Click "Log In".
4) See the agenda view.
  - My name is displayed the upper right corner.
  - Meetings I own are marked as such.
5) Click "Log out".
6) See the login screen. The user no longer has access to the Agenda view (or any other Bookit functionality).

## Caching calendar data
Without this work, the app will be so slow as to be unusable. There isn't really anything to demonstrate here, but we included a note here just to be transparent about what we're working on this sprint. Two performance benefits of caching the MS Exchange data:
1) This will allow many users to use Bookit concurrently. The app would otherwise be unusable after ~5 users.
2) Meeting data will display in the app quickly. We would otherwise be subject to (very, very) slow loading while waiting for the Exchange server to respond.
