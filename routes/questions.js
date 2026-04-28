const express = require('express');
const Question = require('../models/Question');

const router = express.Router();

router.get('/', async (_req, res) => {
  const items = await Question.find().sort({ solvedAt: -1, createdAt: -1 });
  res.json(items);
});

router.get('/stats', async (_req, res) => {
  const all = await Question.find();
  const totals = { total: all.length, Easy: 0, Medium: 0, Hard: 0 };
  const byTopic = {};

  all.forEach((q) => {
    totals[q.difficulty] += 1;
    byTopic[q.topic] = (byTopic[q.topic] || 0) + 1;
  });

  res.json({ totals, byTopic });
});

router.post('/', async (req, res) => {
  const created = await Question.create(req.body);
  res.status(201).json(created);
});

module.exports = router;
