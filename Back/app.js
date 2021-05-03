const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
const passport = require('passport');
const cors = require('cors');

require('./config/config');
require('./initDB')();
require('../Back/Config/PassportConfig');




const app = express();
app.use(cors());
app.use(passport.initialize());


app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    next();
  
  });

const TeacherRoute = require('../Back/Routes/Teacher.routes');
const StudentRoute = require('../Back/Routes/Student.routes');


//Routes
app.use('/Teacher', TeacherRoute);
app.use('/Student', StudentRoute);

app.get('/', (req,res)=>{

    res.send('we are home');
})
app.get('/list', (req,res)=>{

    res.send('we are list');
})

app.listen(3000, () => {
    console.log('Server started on port 3000 ...');
  });