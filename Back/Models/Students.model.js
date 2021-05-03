const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const StudentsSchema = new Schema({
    firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  sexe: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  saltSecret : String
});
// Events
StudentsSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


StudentsSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Custom validation for email
StudentsSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


StudentsSchema.methods.generateJwtUser = function () {
    return jwt.sign({
        _id: this._id,
        userType:"student"
    }, process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
}


const Students = mongoose.model('Students', StudentsSchema);
module.exports = Students;

