# DSA Tracker + PDF Notes Website

This project is now a full-stack website where you can:
- Track daily solved DSA questions.
- Store and read your PDF notes.
- Keep data in MongoDB.

## Tech Stack
- Frontend: HTML/CSS/Vanilla JS
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- File Upload: Multer

## Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure env:
   ```bash
   cp .env.example .env
   ```
3. Start MongoDB (local install you already downloaded).
4. Run server:
   ```bash
   npm start
   ```
5. Open `http://localhost:3000`

## API Endpoints
- `GET /api/questions`
- `POST /api/questions`
- `GET /api/questions/stats`
- `GET /api/notes`
- `POST /api/notes` (form-data with `title` and `pdf`)

## Make Website Visible on Internet
Use any one:
- Render (easy)
- Railway
- VPS + Nginx + PM2

For production, use MongoDB Atlas or a cloud MongoDB URI in `.env`.
