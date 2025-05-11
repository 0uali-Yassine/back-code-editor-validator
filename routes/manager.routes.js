const express = require('express');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { getAllStudentCodes} = require('../controllers/manager.controller');
const router = express.Router();

router.get('/student',auth,role(['manager']),getAllStudentCodes);

module.exports = router;