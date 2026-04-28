const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../middlewares/auth');
const c = require('../controllers/contentController');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g,'-')}`),
});
const upload = multer({ storage });

const router = express.Router();
router.use(auth);
router.get('/', c.listContent);
router.post('/', upload.array('files', 5), c.createContent);
router.put('/:id', c.updateContent);
router.delete('/:id', c.deleteContent);
module.exports = router;
