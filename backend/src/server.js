const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));
app.get('/api/sections', (_req, res) => res.json(['GK', 'DSA', 'Hindi', 'Paper 1', 'Paper 2', 'System Design']));

connectDB(process.env.MONGODB_URI).then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));
});
