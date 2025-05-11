const express = require('express');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { studentContent } = require('../controllers/student-content.controller');

const router = express.Router();

router.get('/student-content',auth,role(['student']),studentContent);

module.exports = router;