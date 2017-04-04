# Bookit Sprint #1: Demo
April 4, 2017

This sprint focused on giving a user visibility into room availability. We plan on demonstrating the following:

1) Open the Bookit web app. See the agenda view, set to today's date, showing meetings for all rooms.
2) Go to Outlook and show that the same meetings show up on the Outlook calendar.
3) Create an event in Outlook. See it appear in Bookit.
4) Delete the event in Outlook. See it disappear in Bookit.

Notes:
- For the Agenda View, we aimed to achieve 95% pixel perfect reproduction of the provided design. (Of course, we will get to 100% by launch date.)
- The Outlook calendar is real data, connected to a real MicroSoft Exchange server we have set up for demonstration purposes. The server is configured to match the expected configuration of Designit's Exchange server.
- There is an issue with fetching the meeting titles from the Exchange server, so that bit of data is faked. (All the other data is real.) We will address this next sprint.
