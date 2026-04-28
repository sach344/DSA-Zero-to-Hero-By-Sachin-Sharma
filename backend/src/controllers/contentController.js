const Content = require('../models/Content');

exports.createContent = async (req, res) => {
  const files = (req.files || []).map((f) => ({ url: `/uploads/${f.filename}`, filename: f.originalname, mimeType: f.mimetype }));
  const doc = await Content.create({ ...req.body, files, user: req.user.id });
  res.status(201).json(doc);
};

exports.listContent = async (req, res) => {
  const { module, type, q } = req.query;
  const filter = { user: req.user.id };
  if (module) filter.module = module;
  if (type) filter.type = type;
  if (q) filter.$or = [{ title: { $regex: q, $options: 'i' } }, { body: { $regex: q, $options: 'i' } }, { tags: { $in: [new RegExp(q, 'i')] } }];
  const docs = await Content.find(filter).sort({ createdAt: -1 });
  res.json(docs);
};

exports.updateContent = async (req, res) => {
  const doc = await Content.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
};

exports.deleteContent = async (req, res) => {
  await Content.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: 'Deleted' });
};
