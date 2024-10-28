const express = require('express');
const mongoose = require('mongoose');

const { upload, create, fetch, edit, remove } = require('../controllers/ar');

mongoose.connect('mongodb://localhost:27017/crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const router = express.Router();

router.get('/', fetch);
router.post('/add', upload.array('files', 5), create);
router.put('/edit/:id', edit);
router.delete('/remove/:id', remove);

module.exports = router;