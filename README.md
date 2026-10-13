# CRED

A website revamp for [CRED](https://cred-sd.vercel.app), a San Diego organization that helps people coming out of incarceration find their way to self-sufficiency. The new site declutters the original and adds features that let it grow with the organization: an intake form for clients and an admin portal for staff.

Built by a student team at Triton Software Engineering (UC San Diego).

**Live:** [cred-sd.vercel.app](https://cred-sd.vercel.app)

## What's in it

- **Public site:** home, about, donate, and contact pages.
- **Apply:** a client intake form. Submissions are validated on the server and stored in MongoDB.
- **Admin portal:** staff sign in with Firebase Authentication and review applicants in a paginated dashboard, with status tracking.
- **Contact:** messages from the contact form are emailed to staff through Nodemailer.

## Stack

| Part | Tech |
| --- | --- |
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS |
| Backend | Express 5, TypeScript, Mongoose, express-validator |
| Auth | Firebase Authentication (client), Firebase Admin token checks (server) |
| Hosting | Vercel: the Next.js app and the Express API (served under `/api`) deploy together, see `vercel.json` |

Sensitive applicant fields are defined in strict Mongoose schemas with matching TypeScript types (`backend/src/models/applicant.ts`), and every write goes through a validator (`backend/src/validators/`).

```
frontend/src/app/     pages: /, about, apply, contact, donate, login, dashboard
backend/src/
  routes/             /api/applicant, /api/contact
  controllers/        request handlers
  models/             Mongoose schemas
  validators/         express-validator chains
  util/               auth middleware, mailer
```

## Setup

### Tools
Before starting development, make sure you have these tools installed:

- [Node.js](https://nodejs.org/en) - this is our JS runtime
- [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - this is our package manager
- [Postman](https://www.postman.com/downloads/) - helpful for testing API routes
- [MongoDB Community](https://www.mongodb.com/docs/manual/administration/install-community/) - necessary if you want to run database locally

### Environment
To define and manage environment variables, make sure to maintain `.env` files in both the `frontend` and `backend` directories. Ensure that `.env` is specified in your root `.gitignore` file to prevent pushing secrets. This should already be the case, but the secret scanner hook will check for this if something gets changed

Team members: add the `.env.frontend` and `.env.backend` from the project Google Drive to their respective directories. Everyone else: copy `frontend/.env.example` to `frontend/.env` and fill in your own Firebase project values. The frontend build needs the `NEXT_PUBLIC_*` Firebase values to prerender the dashboard.

### Backend

1. `cd backend`
2. Run `npm install` to install all dependencies
3. If running the database locally, make sure to [start mongod](https://www.mongodb.com/docs/manual/tutorial/manage-mongodb-processes/#start-mongod-processes)
4. `npm run start` to start the backend

If this works properly you should see a message in the terminal saying `> Listening on port 4000`

### Frontend

1. `cd frontend`
2. Run `npm install` to install all dependencies
3. Run `npm run dev` to start development server
4. Server is started on port 3000. Follow this [url](http://localhost:3000) and you should see the development page.

## Linting
Run these commands in the `backend` or `frontend` directories for linting and formating. Be sure to run these commands before pushing to github.

- `npm run lint-fix` - fixes all auto-fixable lint errors and reformats code
- `npm run lint-check` - check all lint errors or code style issues without modifying any files
