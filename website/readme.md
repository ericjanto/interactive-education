# Website

- Backend: API routing
  - see nextjs documentation
- Frontend: reviewing / overview platform

## Roadmap

- [x] Make connection to DB
- [x] Create API endpoint
  - [x] Fetch dummy row and show contents
  - [x] Create flexible api endpoint accepting any string for ID
- [x] Front/back functionality
  - [x] SWR for client-side data fetching
  - [x] Flash card component
  - [x] Extend flash card component UI (radix tabs for now)
- [x] Credentials from ENV file
- [ ] Admin / User functionality (for now all actions are performed by an admin)
  - [x] Research pocketbase authentication
  - [x] Research nextjs authentication
  - [x] Provide frontend for registration & login
  - [ ] Create API endpoints for registering a user with the database
  - [ ] Create API endpoints for login to the database with user data
  - [ ] Create user-specific table/rows
  - [ ] Detect from web-component (i.e. iframe) whether user logged in
  - [ ] Registration / login from component
- [ ] Refactor
  - [ ] Improve JSON fetching: https://github.com/vercel/next.js/blob/canary/examples/with-iron-session/lib/fetchJson.ts

## Setup
* node version
* nextjs version
* .env.local setup

## Authentication

- Utilise server-side rendering as user-data may be updated from other tabs in the meantime
- Passport.js -> cookie-based authentication
- with-iron-session
  - 

