# Eventry

Prompt: Build a sufficiently complex client-server software system.

(insert background + elevator pitch)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ac2466330e8e42d2be7976ac9cfda042)](https://www.codacy.com/app/nancyjiang10/eventry_2?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jnancy/eventry&amp;utm_campaign=Badge_Grade)


## Core Features

### Signup/Login
The user can choose to signup for Eventry, login with an Eventry account, or authenticate with an existing Google account.

### View Hosted Events
A host has the option of viewing all events that they have hosted, are currently hosting, or will host in the future. This is just a list view of all the events that they are hosting, retrieved from the events table in the database.

### Search
A user can search for events using keywords or the event name which will be sent as a request to the server. The server will process the words and find the events that are the closest matches to the user’s search based on natural language processing of the user’s request as well as consideration of the user’s geographic location and previously viewed/searched events. The results will be displayed as a list of events and will include concise details of each event including for certain the event name, and time and possibly attendees, location, and pictures.

### View User Profile
A user can view their user profile. Their display name and display picture will be shown on the profile. In addition, their favorite events and attending events are also visible.

### View Favorited Events
The user’s favorite events will be displayed as a list of events and will include concise details of each event including for certain the event name, and time and possibly attendees, location, and pictures. These information is retrieved from the server (event database) one the user chooses to view their favourite list. If the user clicks on any of the events in the list, they will be taken to the event details page.

### View Attending Events

All events that the user has attended, are currently attending, or will attend in the future will be
displayed as a list of events and will include concise details of each event including for certain
the event name, and time and possibly attendees, location, and pictures. These information is retrieved from the server (event database) one the user chooses to view their event list. If the user clicks on any of the events in the list, they will be taken to the event details page.

### View Event Details
The user can view event details including name, location, date, time and pictures, which will all be retrieved from their local cache or the server. The last 10 events that the user viewed will be cached locally. The user can also check in, attend, and favourite the event and enable notifications for the event.

### Check In
The user can check in at an event if they actually end up attending it and are already on the attending list. The server will receive a request containing the user’s geographic location and verify that the user is on the attending list for the particular event and that their location matched that of the event.

### Add to Attending Events
For free events, the user can attend by simply clicking the attend button or checkbox, as long as the event hasn’t reached maximum capacity. This will send a request to the server which will verify that the maximum capacity hasn’t been reached and update the event table. If the event requires payment, external verification may be needed, and payment integration (e.g. with Stripe) will be a stretch goal for this project. If the event requires a ticket (e.g. it has limited spots or requires payment), the user can generate a unique QR code for their ticket once they confirm that they will be attending the event.

### Generate/Verify QR Code
The user will receive a unique QR code, generated using an external API, and the information embedded in the QR code will be sent to the server and added to the valid tickets entry in the events table under the particular event. The host can scan a user’s QR code and process it using an external library. This will send a request to the server to check that the user’s ticket is valid, and if so, to mark the ticket as used and return a success message to the host.

### Add to Favourites
The user can add an event to their favorites list by simply clicking on the heart icon. This will
send a request to the server which will update the user table (add the event ID to the favourites
list of the particular user).


### Enable Notifications for Event
Once the user add an event to their attending list, we will use Azure’s Notification Hubs to send a push notification, to remind the user of the event 24, 8, and one hour before the event, or in case any details has changed (e.g. date, time, location).

### View Attending Users
All users attending a particular event will be displayed as a list including concise details of each user including their name and picture. This list can be obtained with a request to the server which will then select information from the event table in the database. If the user clicks on any of the users in the list, they will be taken to that user’s profile. The user profile can be fetched with a request to the server which will then select the appropriate user’s information from the user table in the database.


### Event Chatrooms
Both the host of an event and users who have checked-in to an event can message other users who are checked-in to the event.


## Main Dependencies
- Pusher for chat engine


## Set-up Guide

Prerequisites: Node, Expo, Android/iOS device or emulator

`npm install`

`npm start` or `expo start`

## Demos

#### Event Creation

(insert demo gifs here)

iOS vs Android

#### Nearby Events

(sorted by distance)

(insert demo gifs here)

#### Event-Specific Chatroom

(insert demo gifs here)

#### QR Code Ticket Generation

(insert demo gifs here)

#### QR Code Scanning

(insert demo gifs here)

## Diagrams

### High Level Architecture

![Architecture](pics/Architecture.png)

### Architecture Graphic
![Architecture](pics/ArchitectureGraphic.png)

### Class Diagram

![Diagram](pics/Class-Diagram.jpg)
