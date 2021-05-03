const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    SubjectName: {
    type: String,
    required: true
  },
  coefficient: {
    type: Number,
    required: true
  },
  IdTeacher:{
    type:Schema.Types.ObjectId,
    ref:"Teacher"  
  }
});



const Subject = mongoose.model('Subject', SubjectSchema);
module.exports = Subject;

