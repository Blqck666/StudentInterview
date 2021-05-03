
const createError = require('http-errors');
const mongoose = require('mongoose');
const passport = require('passport');

const _ = require('lodash');

const Students = require('../Models/Students.model');
const Subjects = require('../Models/Subject.model');
const Teacher = require('../Models/Teacher.model');
const ClassName = require('../Models/ClassName.model');
const StudentClass = require('../Models/StudentClass.model');
const Score = require('../Models/Score.model');
const Notifications = require('../Models/Notifications.model');


module.exports = {
  getAllTeachers: async (req, res, next) => {
    try {
      const results = await Teacher.find({});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getAllSubjectByTeacherID: async (req, res, next) => {
    const id = req.params.id;
    console.log("TeacherID ",id);
    try {
      const results = await Subjects.find({"IdTeacher":id});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getAllSubject: async (req, res, next) => {
    try {
      const results = await Subjects.find({}).populate({ path: 'IdTeacher', model: 'Teacher', select: 'name' });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getAllStudentGradeBySubjectAndClass: async (req, res, next) => {
    const subjectid = req.params.subjectid;
    const studentid = req.params.studentid;
    const classid = req.params.classid;
    console.log(classid);
    try {
      const results = await Score.findOne({"IdClass":classid,"IdSubject":subjectid,"IdStudent":studentid});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getAllClassName: async (req, res, next) => {
    try {
      const results = await ClassName.find({});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getAllStudentByClassIdAndYear: async (req, res, next) => {
    const id = req.params.id;
    const currentYear = new Date().getFullYear()
    try {
      const ListStudentByClass = await StudentClass.find({"IdClass": id ,'ScolarYear':currentYear}).populate({ path: 'IdStudent', model: 'Students', select: 'firstname lastname' });
      if (!ListStudentByClass) {
        throw createError(404, 'Class does not exist.');
      }
      res.send(ListStudentByClass);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Class id'));
        return;
      }
      next(error);
    }
  },
  createNewTeacher: async (req, res, next) => {
    console.log(req.params);

  try {
    const teacher = new Teacher(req.body);
    const result = await teacher.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error.name === 'ValidationError') {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
},
  createNewStudent: async (req, res, next) => {
    console.log(req.body);

  try 
    {
      const Student = new Students(req.body);
      const result = await Student.save();
      const Studentclass = new StudentClass();
      res.send(result);
      Studentclass.IdClass = req.body.IdClass;
      Studentclass.ScolarYear = req.body.ScolarYear;
      Studentclass.IdStudent = result._id;
      const resultSC = await Studentclass.save();
      
      //res.send(resultSC);
    } 
    catch (error) 
    {
      console.log(error.message);
      if (error.name === 'ValidationError') 
      {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
},
updateStudent: async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };
    console.log(req.params);
    console.log(req.body);

    const result = await Students.findByIdAndUpdate(id, updates, options);
    if (!result) {
      throw createError(404, 'Student does not exist');
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, 'Invalid Student Id'));
    }

    next(error);
  }
},
updateScore: async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };
    console.log(req.params);
    console.log(req.body);

    const result = await Score.findByIdAndUpdate(id, updates, options);
    if (!result) {
      throw createError(404, 'Student does not exist');
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, 'Invalid Student Id'));
    }

    next(error);
  }
},
updateClass: async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };
    console.log(req.params);
    console.log(req.body);

    const result = await ClassName.findByIdAndUpdate(id, updates, options);
    if (!result) {
      throw createError(404, 'Class does not exist');
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, 'Invalid Class Id'));
    }

    next(error);
  }
},
deleteStudent: async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Students.findByIdAndDelete(id);
    // console.log(result);
    if (!result) {
      throw createError(404, 'Student does not exist.');
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Student id'));
      return;
    }
    next(error);
  }
},
deleteClassname: async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await ClassName.findByIdAndDelete(id);
    // console.log(result);
    if (!result) {
      throw createError(404, 'class does not exist.');
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid class id'));
      return;
    }
    next(error);
  }
},
createNewSubject: async (req, res, next) => {
  console.log(req.params);

try 
  {
    const Subject = new Subjects(req.body);
    const result = await Subject.save().then(doc => doc.populate('IdTeacher').execPopulate());
    console.log(result);
    res.send(result);
  } 
  catch (error) 
  {
    console.log(error.message);
    if (error.name === 'ValidationError') 
    {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
},
createNewClassname: async (req, res, next) => {
  console.log("Class Name");
  console.log(req.params);

try 
  {
    const className = new ClassName(req.body);
    const result = await className.save();
    
    res.send(result);
  } 
  catch (error) 
  {
    console.log(error.message);
    if (error.name === 'ValidationError') 
    {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
},
addNotification: async (req, res, next) => {

try 
  {
    const notification = new Notifications(req.body);
    const result = await notification.save();
    res.send(result);
  } 
  catch (error) 
  {
    console.log(error.message);
    if (error.name === 'ValidationError') 
    {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
},
addStudentScore: async (req, res, next) => {
  console.log(req.params);

try 
  {
    const score = new Score(req.body);
    const result = await score.save();
    res.send(result);
  } 
  catch (error) 
  {
    console.log(error.message);
    if (error.name === 'ValidationError') 
    {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
},
updateSubject: async (req, res, next) => {
try {
  const id = req.params.id;
  const updates = req.body;
  const options = { new: true };
  console.log(req.params);
  console.log(req.body);

  const result = await Subjects.findByIdAndUpdate(id, updates, options).then(doc => doc.populate('IdTeacher').execPopulate());
  console.log(result);
  if (!result) {
    throw createError(404, 'Subject does not exist');
  }
  res.send(result);
} catch (error) {
  console.log(error.message);
  if (error instanceof mongoose.CastError) {
    return next(createError(400, 'Invalid Subject Id'));
  }

  next(error);
}
},
deleteSubject: async (req, res, next) => {
const id = req.params.id;
try {
  const result = await Subjects.findByIdAndDelete(id);
  // console.log(result);
  if (!result) {
    throw createError(404, 'Subject does not exist.');
  }
  res.send(result);
} catch (error) {
  console.log(error.message);
  if (error instanceof mongoose.CastError) {
    next(createError(400, 'Invalid Subject id'));
    return;
  }
  next(error);
}
}

}

module.exports.authenticate = (req, res, next) => {
  // call for passport authentication
  passport.authenticate('Teacher','local', (err, user, info) => {    
       
      // error from passport middleware
      if (err) return res.status(400).json(err);
      // registered user
      else if (user) return res.status(200).json({ "token": user.generateJwt(),"teacherId": user._id });
      // unknown user or wrong password
      else return res.status(404).json(info);
  })(req, res,next);
}
