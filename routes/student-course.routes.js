const express = require('express');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { studentCourse } = require('../controllers/student-course.controller');
const router = express.Router();

router.get('/student',auth,role(['student']),studentCourse);

module.exports= router;