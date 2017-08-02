
# Bookit Iteration #9: Demo Plan

Demo date: Wednesday July 26, 2017

1) Admin can list users (#3)
2) Admin can add an external user
3) External user can log in (#44)
4) Internal user can log in (#44)
4) Delete bookings (#41)
5) Edit bookings (#41)

------------------------------------------------------------------------------
## 1 - Admin can list users
1) Go to the admin page
2) The admin should be able to see a list of users in the BookIt UI.
3) You should see a list of DesignIt users that correspond to the primary Active Directory.
4) You can then click on "Wipro" to view external users. **

## 2 - Admin can add an external user
1) Navigate to the admin panel and click "+." (Must be logged in as an admin user.)
2) Enter an email address and click "add user."
  - Note: The form validates that you are submitting a well-formed email address.
3) Click the Wipro user list to see the newly added user.

## 3 - External user can log in
1) Admin logs out of BookIt.
2) Newly invited user logs into BookIt with AD credentials.
3) The user should see the agenda view.

## 4 - Internal user can log in
1) Admin logs in to the Azure portal.
2) Create a new user and take note of the password (make sure not to require a reset).
3) Navigate to BookIt and log in using the newly created credentials.

## 4 - Delete bookings
1) See the agenda view, set to today's date. See a meeting that I own.
2) Click "Edit."
3) Click "Delete."
4) Observe meeting being deleted.

## 5 - Edit bookings
1) See the agenda view, set to today's date. See a meeting that I own.
2) Click "Edit."
3) See the meeting form appear in the left panel.
4) Change the start and end times
5) Click "save."
6) See:
- The meeting details change in "My Reservations."
- The meeting details change on the timeline.



