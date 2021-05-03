 const passport = require('passport');
 const localStrategy = require('passport-local').Strategy;
 const mongoose = require('mongoose');


 const Teacher = require('../Models/Teacher.model');
 const Students = require('../Models/Students.model');

 
 passport.use('Teacher',
     new localStrategy({usernameField:'email'},
     (username,password,done)=> {
        Teacher.findOne({email:username},
            (err,teacher)=>{
                if(err)
                    return done(err);
                else if(!teacher)
                    return done(null ,false,{message:'Email is not Registred '});
                else if(!teacher.verifyPassword(password))
                    return done(null ,false,{message:'Wrong Password '});
                else
                    return done(null,teacher);
            });
     })
 );

 passport.use('Student',
 new localStrategy({usernameField:'email'},
 (username,password,done)=> {
    Students.findOne({email:username},
        (err,student)=>{
            if(err)
                return done(err);
            else if(!student)
                return done(null ,false,{message:'Email is not Registred '});
            else if(!student.verifyPassword(password))
                return done(null ,false,{message:'Wrong Password '});
            else
                return done(null,student);
        });
 })
);

