<p align="center">
<img src="pics/logo.png" alt="logo" width="550"/>
</p>

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ac2466330e8e42d2be7976ac9cfda042)](https://www.codacy.com/app/nancyjiang10/eventry_2?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jnancy/eventry&amp;utm_campaign=Badge_Grade)

Ever wished you had an app dedicated to keeping track of your events and tickets? Something like Pinterest but for events? Facebook events but without a clogged newsfeed and ads?

Eventry makes creating, sharing, and attending events easier than ever with its comprehensive suite of functionalities. Event-specific chatrooms promote social interactions among participants, QR code generation/verification renders paper tickets obsolete, and nearby events engages user with their community.

## Core Features

#### Signup/Login
The user can choose to signup for Eventry, login with an existing account, or authenticate with their Google account.
#### Nearby Events
The main page of the app shows events sorted by distance from the user.
#### Search
The user can search for events using keywords which will be sent as a request to the server. The server will process the words and find the events that are the closest matches to the user’s search based on natural language processing of the user’s request as well as consideration of the user’s geographic location and previously viewed/searched events.
#### Event Details
The user can view event details including name, location, date, time and pictures, which will all be retrieved from their local cache or the server. The last 10 events that the user viewed will be cached locally. The user can also check in, view attending users, favourite the event, and enable notifications for the event.
#### Join Event Chatroom
Both the host of an event and users who have checked-in to an event can message other users who are checked-in to the event in a unique event chatroom.  
#### Generate/Verify QR Code
The user will receive a unique QR code for their ticket, generated using an external AP. The host can scan a user’s ticket and process it using an external library.


## Set-up Guide

Prerequisites: Node, Expo, Android/iOS device or emulator

`npm install`

`npm start` or `expo start`

Please note that many features won't be functional while our server is down. We have decided to discontinue our AWS usage as we are poor university students.

<p align="center">
<img src="pics/aws.gif" alt="gif" width="500"/>
</p>

## Demos

#### Event Creation
(insert demo gifs here)


#### Nearby Events
(insert demo gifs here)

#### Chatrooms
(insert demo gifs here)

#### QR Code
(insert demo gifs here)


## Diagrams

### High Level Architecture
<p align="center">
<img src="pics/Architecture.png" alt="architecture" width="600"/>
</p>

### Architecture Graphic
<p align="center">
<img src="pics/ArchitectureGraphic.png" alt="architecture" width="850"/>
</p>

### Class Diagram
<p align="center">
<img src="pics/Class-Diagram.jpg" alt="diagram" width="1000"/>
</p>

## Future Considerations
- Payment integration for paid events using third-party services such as Stripe
- Private chats between users
- User inboxes
- Recommended events
- Ad revenue
