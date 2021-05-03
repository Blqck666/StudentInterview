
const createError = require('http-errors');
const mongoose = require('mongoose');
const passport = require('passport');

const _ = require('lodash');

const Subjects = require('../Models/Subject.model');
const Notifications = require('../Models/Notifications.model');
const Score = require('../Models/Score.model');
const Students = require('../Models/Students.model');

module.exports = {
  getAllNotificationByStudentId: async (req, res, next) => {
    const id = req.params.id;
    
    try {
      const ListNotifByStudentID = await Notifications.find({"StudentID": id }).populate("SubjectID");
      if (!ListNotifByStudentID) {
        throw createError(404, 'Student does not exist.');
      }
      console.log(ListNotifByStudentID);
      res.send(ListNotifByStudentID);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Student id'));
        return;
      }
      next(error);
    }
    },
    getAllSubjects: async (req, res, next) => {
        try {
          const results = await Subjects.find({});
          res.send(results);
        } catch (error) {
          console.log(error.message);
        }
      },
      getAllGradeByStudentId: async (req, res, next) => {
        console.log("Grad");
        const id = req.params.id;
    try {
      const ListGradByStudentID = await Score.find({"IdStudent": id }).populate("IdSubject IdClass");
      if (!ListGradByStudentID) {
        throw createError(404, 'Student does not exist.');
      }
      res.send(ListGradByStudentID);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Student id'));
        return;
      }
      next(error);
    }
      }
}

module.exports.authenticate = (req, res, next) => {
  // call for passport authentication
  passport.authenticate('Student','local', (err, user, info) => {       
      // error from passport middleware
      if (err) return res.status(400).json(err);
      // registered user
      else if (user) {

        return res.status(200).json({ "token": user.generateJwtUser(),"studentId": user._id });
    }
      // unknown user or wrong password
      else return res.status(404).json(info);
  })(req, res,next);
}
