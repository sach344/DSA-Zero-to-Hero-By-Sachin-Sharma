# Study Management Platform (Full Stack)

## Folder Structure
- `backend/` Express + MongoDB API (JWT auth, OTP flow, content CRUD, uploads)
- `frontend/` React + Tailwind app (auth, dashboard, module management, rich text editor)

## Core Implemented
- Register/login with password hashing + JWT.
- OTP verification flow (demo OTP response; plug SMS/email providers later).
- Modules: GK, DSA, Hindi, Paper1, Paper2, System Design.
- Unified content model for notes/questions/files with tags/bookmark support.
- Rich text editing using React Quill.
- Upload files (pdf/images) to local storage.
- Search/filter via API query params.

## Run Locally
### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Backend: `http://localhost:5000`
Frontend: `http://localhost:5173`

## Sample API
- `POST /api/auth/register`
- `POST /api/auth/verify-otp`
- `POST /api/auth/login`
- `GET /api/content?module=GK&type=note&q=history`
- `POST /api/content` (multipart)

## Deployment
- Backend: Render/Railway
- Frontend: Vercel
- DB: MongoDB Atlas
- Move file uploads to Cloudinary/S3 in production.
