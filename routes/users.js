const express = require('express');
const { fetch, create, edit, remove } = require('../controllers/users');

const router = express.Router();

router.get("/", fetch);
router.post ("/add", create);
router.put("/edit/:id", edit);
router.delete("/remove/:id", remove); 

module.exports = router;