const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassNameSchema = new Schema({
    Name: {
    type: String,
    required: true
  }
});



const ClassName = mongoose.model('ClassName', ClassNameSchema);
module.exports = ClassName;

