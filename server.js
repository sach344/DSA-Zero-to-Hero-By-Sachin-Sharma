const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const questionsRoutes = require('./routes/questions');
const notesRoutes = require('./routes/notes');

const app = express();
const port = Number(process.env.PORT) || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dsa_tracker';

fs.mkdirSync(path.join(__dirname, 'uploads'), { recursive: true });

app.use(express.json());
app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/questions', questionsRoutes);
app.use('/api/notes', notesRoutes);

app.get('/health', (_, res) => {
  res.json({ ok: true });
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log(`MongoDB connected: ${mongoUri}`);
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Mongo connection error:', error.message);
    process.exit(1);
  });
