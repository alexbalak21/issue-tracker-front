
# issue-tracker-front

React Frontend for Issue Tracker App

## Features
- Role-based dashboards and navigation (USER, AGENT, ADMIN, VISITOR)
- Dynamic navbar links based on user role
- Modern React (Vite, TypeScript, Context API)
- API integration with backend

## Folder Structure
See `structure.txt` for a detailed breakdown.

## Environment Variables
- `.env` (development):
	- `VITE_API_URL="http://localhost:8100"`
- `.env.production` (build/production):
	- `VITE_API_URL=""` (empty string)
	- Vite will automatically use `.env.production` for `npm run build`.

## Role-based Navbar Example
Navbar links change based on the user's role:

| Role     | Links Shown                                 |
|----------|---------------------------------------------|
| VISITOR  | Home, About, Login, Register                |
| USER     | Home, API Demo, Editor, My Profile, Dashboard|
| AGENT    | Home, API Demo, Editor, Tickets, Agent Dashboard |
| ADMIN    | Home, API Demo, Editor, Manage Users, Admin Settings |

## How to Run

### Development
```sh
npm install
npm run dev
```

### Production Build
```sh
npm run build
npm run preview
```

## Debugging
- Console logs are present in role/user context and navbar for troubleshooting role-based UI.

## Backend API
- Expects `/api/user` and `/api/auth/login` endpoints as described in `api_doc.md`.

---
For more details, see code comments and structure.txt.
