const express = require('express');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { saveAndCheckCode } = require('../controllers/save-check-code.controller');
require('dotenv').config();

const router = express.Router();

router.post('/student/check-code',auth,role(['student']),saveAndCheckCode);

module.exports = router;
