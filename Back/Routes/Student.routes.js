const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');

const StudentController = require('../Controllers/Student.Controller');

//Auth a Student
router.post('/authenticate', StudentController.authenticate);

//Fetch all notifications
router.get('/getAllNotificationByStudentId/:id', StudentController.getAllNotificationByStudentId);

//Create a new User
router.get('/getAllGradeByStudentIdAndYear/:id', StudentController.getAllGradeByStudentId);

module.exports = router;