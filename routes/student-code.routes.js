const express = require('express');
const auth = require('../middleware/auth');
const { studentCode } = require('../controllers/student-code.controller');
const router = express.Router();

router.get('/student/code',auth,studentCode);

module.exports = router;