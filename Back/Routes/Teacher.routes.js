const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');

const TeacherController = require('../Controllers/Teacher.controller');

//Create a new Admin
router.post('/register', TeacherController.createNewTeacher);

//Auth an Admin
router.post('/authenticate', TeacherController.authenticate);

//Create a new Student
router.post('/addStudent', TeacherController.createNewStudent);

//Update a StudentupdateScore
router.put('/updateStudent/:id', TeacherController.updateStudent);

//Update a Student score 
router.put('/updateScore/:id', TeacherController.updateScore);

//Update a Class
router.put('/updateClassname/:id', TeacherController.updateClass);

//Delete a Student
router.delete('/deleteStudent/:id', TeacherController.deleteStudent);

//Delete a Classname
router.delete('/deleteClassname/:id', TeacherController.deleteClassname);

//Create a new Subject 
router.post('/addSubject', TeacherController.createNewSubject);

//Create a new Subject 
router.post('/addClassname', TeacherController.createNewClassname);

//Create a new Subject 
router.post('/addStudentScore', TeacherController.addStudentScore);

//Create a new Subject 
router.post('/addNotification', TeacherController.addNotification);

//Get All Subject 
router.get('/getAllSubjectByTeacherID/:id', TeacherController.getAllSubjectByTeacherID);

//Get All Subject 
router.get('/getAllSubject', TeacherController.getAllSubject);

//Get All getAllStudentGradeBySubjectAndClass 
router.get('/getAllStudentGradeBySubjectAndClass/:subjectid/:studentid/:classid', TeacherController.getAllStudentGradeBySubjectAndClass);

//Get All Teachers 
router.get('/getAllTeachers', TeacherController.getAllTeachers);

//Get All Classes 
router.get('/getAllClassname', TeacherController.getAllClassName);

//Get All student by classid 
router.get('/getAllStudentByClassIdAndYear/:id', TeacherController.getAllStudentByClassIdAndYear);

//Update a Subject
router.put('/updateSubject/:id', TeacherController.updateSubject);

//Delete a Subject
router.delete('/deleteSubject/:id', TeacherController.deleteSubject);

module.exports = router;