const path = require('path');
const express = require('express');
const multer = require('multer');
const Note = require('../models/Note');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const cleanName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${timestamp}-${cleanName}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      cb(new Error('Only PDF files are allowed'));
      return;
    }
    cb(null, true);
  },
});

router.get('/', async (_req, res) => {
  const items = await Note.find().sort({ uploadedAt: -1, createdAt: -1 });
  res.json(items);
});

router.post('/', upload.single('pdf'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'PDF file is required' });
  }

  const created = await Note.create({
    title: req.body.title || req.file.originalname,
    filename: req.file.filename,
    filePath: `/uploads/${req.file.filename}`,
  });

  return res.status(201).json(created);
});

module.exports = router;
