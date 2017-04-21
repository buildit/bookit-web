# Backlog

## Stories and tasks that have been broken into tickets
### 1. Authentication
#### Story:
As a user, I can login to Bookit. As a Designit user, I will use Exchange credentials. As an external user, I will use my email address and a password defined by an admin. Both types of users can log out.

##### Tasks
- Add "external" users service (Small)
- Token session support (Small)
- Populate state in Bookit (Small)
- Validate Designit users, validate "external" users (Medium)

### 2. Booking
#### Story:
As a user, I want to be able to cancel a booking so that someone else can use the room.

##### Tasks
- Add "Edit" to tooltip and show edit dialog (Medium)
- Handle "cancel," but no other edit functionality (Small)
- Server handles cancellation (Medium)
- Handle success and failure cases on UI (Small)

### 3. Cache Calendar Data
- Do POC for delta query
- Add an embedded DB for calendar data

## Stories that have not been broken into tickets

### 1. Registration
- User clicks emailed link and is brought to a login screen that says "use your Outlook credentials"
- As a new Bookit user, I want to register to bookit so that I can book rooms
- User clicks register link & auto logs in to bookit

### 2. Admin
- As a Bookit admin, I want to add users so that people can use bookit
- As a Bookit admin, I want to be able to delete a user so only approved employees can book rooms
- Room is locked and unbookable until an admin unlocks it

### 3. Booking
- As a user, I want to check my room bookings so that I can see them quickly
- As a user, I want to edit bookings so that it's just the way I like it
- Slackbot notifications
- Ability to make private bookings (Outlook and Bookit)
- Integrate calendar picker
- User receives an email in cases where the booking failed
- Add attendees from Exchange - names auto-suggest

### 4. Misc/Other
- Client-side caching & hydration
- Add push event notifications (sockets)
- Meeting list fetch on date change
- Send email to Designit IT about Deployment

These tasks are based on the board we were using. Photos of the board are included in the /docs/photos folder if any clarification is needed.
