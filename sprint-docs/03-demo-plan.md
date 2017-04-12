# Bookit Sprint #3: Demo (tentative)
April 18, 2017

_This is a tentative demo plan. We will send a finalized demo plan towards the end of the sprint._

There are four major goals for this sprint:
1) We will deploy Bookit.
2) One user story: logging in (both as an internal and external user)
3) We will improve upon the booking story by adding meeting validations
  - (Cannot book meetings shorter than 15 mins, more than a year in advance, etc)
4) We will implement pre-fetching.

## Logging in

### As an internal user
1) Go to the Bookit web app and see a login screen.
2) Enter credentials (email and password).
  - For now, this "internal" account will be one linked to our demo exchange server.
3) Click "Log In"
4) See the agenda view.
  - My name is displayed the upper right corner.
  - Meetings I own are marked as such.

### As an external user
1) Go to the Bookit web app and see a login screen.
2) Enter credentials (email and password).
  - This will be a non-Exchange account.
3) Click "Log In"
4) See the agenda view.

## Pre-fetching data from Exchange

### Performance improvements
1) This will allow many users to use Bookit concurrently.
  - The app would otherwise be unusable after ~5 users.
2) Meeting data will display in the app quickly.
  - We would otherwise be subject to slow loading while waiting for Exchange.
