# Filmix

Fullstack movie admin project built with **Vite + React** on the frontend and **Express + Prisma + MySQL** on the backend.

## What is included

- create movie with poster + video upload
- get all movies
- get movie by id
- update movie text fields
- update movie poster and video file
- delete movie and remove uploaded files from disk
- admin panel screens for create, list, edit

## Project structure

- `client` – Vite + React app
- `server` – Express API + Prisma
- `screenshots` – UI screenshots for README

## Frontend setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Backend setup

1. Create MySQL database.
2. Update your database connection string in `server/.env` or in config if needed.
3. Install dependencies and run Prisma.

```bash
cd server
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Backend runs on `http://localhost:3500`.

## Important notes

- Uploaded files are stored in `server/uploads`.
- Express serves uploaded files through `/uploads`.
- The frontend API base URL is configured in `client/src/pages/AdminPanel/services/movieService.js`.
- For deployment, move the API URL to `VITE_API_URL`.

## Screenshots

### Add movie page

![Add movie](./screenshots/add-movie.png)

### Edit movie page

![Edit movie](./screenshots/edit-movie.png)
