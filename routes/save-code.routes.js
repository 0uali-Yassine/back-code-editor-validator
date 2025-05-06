const express = require('express');
const auth = require('../middleware/auth');
const { saveCode } = require('../controllers/save-code.controller');
const router = express.Router();

router.post('/save-code',auth,saveCode);

module.exports = router;